// --- DATA SOURCE ---
const QUESTIONS = {
    student: [
        { q: "What is the capital city of Malaysia?", options: ["Penang", "Kuala Lumpur", "Johor Bahru", "Kuching"], a: 1 },
        { q: "Which programming language is used for web structure?", options: ["Python", "HTML", "Java", "C++"], a: 1 },
        { q: "What is 15% of 200?", options: ["20", "25", "30", "35"], a: 2 },
        { q: "Who discovered gravity?", options: ["Einstein", "Newton", "Tesla", "Edison"], a: 1 },
        { q: "Which planet is known as the Red Planet?", options: ["Venus", "Jupiter", "Mars", "Saturn"], a: 2 }
    ],
    teacher: [
        { q: "What is the primary goal of formative assessment?", options: ["Grade students", "Monitor learning", "Rank schools", "Finalize marks"], a: 1 },
        { q: "Which is an example of student-centered learning?", options: ["Lecture", "Group Project", "Silent Reading", "Dictation"], a: 1 },
        { q: "In Bloom's Taxonomy, which is the highest order?", options: ["Create", "Remember", "Understand", "Apply"], a: 0 },
        { q: "Scaffolding is associated with which theorist?", options: ["Piaget", "Vygotsky", "Skinner", "Freud"], a: 1 },
        { q: "What does 'differentiation' mean in a classroom?", options: ["Treating everyone same", "Adapting instruction", "Separate classes", "Harder exams"], a: 1 }
    ]
};

// --- AUDIO ENGINE ---
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playSound(type) {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    const now = audioCtx.currentTime;
    
    if (type === 'correct') {
        // Ding sound (Sine wave, high pitch)
        osc.type = 'sine';
        osc.frequency.setValueAtTime(500, now);
        osc.frequency.exponentialRampToValueAtTime(1000, now + 0.1);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
    } else {
        // Buzz sound (Sawtooth, low pitch)
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.linearRampToValueAtTime(100, now + 0.2);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.3);
    }
    
    osc.start(now);
    osc.stop(now + 0.5);
}

// --- APP CONTROLLER ---
const app = {
    data: [],
    state: {
        index: 0,
        score: 0,
        answers: {}, // Stores user choices: { 0: 1, 1: 3 } (QuestionIndex: OptionIndex)
        timeLeft: 120, // 2 minutes global timer
        timerRef: null
    },
    
    // UI Elements
    ui: {
        views: document.querySelectorAll('.view'),
        headerStatus: document.getElementById('header-status'),
        qText: document.getElementById('q-text'),
        options: document.getElementById('options-container'),
        qIndex: document.getElementById('q-index'),
        score: document.getElementById('current-score'),
        timer: document.getElementById('global-timer'),
        btnPrev: document.getElementById('btn-prev'),
        btnNext: document.getElementById('btn-next'),
        dots: document.getElementById('progress-dots')
    },

    init(role) {
        this.data = QUESTIONS[role];
        this.resetState();
        this.switchView('view-quiz');
        this.ui.headerStatus.classList.remove('hidden');
        this.startTimer();
        this.renderQuestion();
        this.updateDots();
    },

    resetState() {
        this.state.index = 0;
        this.state.score = 0;
        this.state.answers = {};
        this.state.timeLeft = 120;
        this.ui.score.innerText = '0';
    },

    startTimer() {
        this.state.timerRef = setInterval(() => {
            this.state.timeLeft--;
            const m = Math.floor(this.state.timeLeft / 60).toString().padStart(2, '0');
            const s = (this.state.timeLeft % 60).toString().padStart(2, '0');
            this.ui.timer.innerText = `${m}:${s}`;

            if(this.state.timeLeft <= 0) this.finish();
        }, 1000);
    },

    renderQuestion() {
        const qData = this.data[this.state.index];
        this.ui.qText.innerText = qData.q;
        this.ui.qIndex.innerText = this.state.index + 1;
        this.ui.options.innerHTML = '';

        // Check if already answered
        const savedAnswer = this.state.answers[this.state.index];

        qData.options.forEach((opt, i) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.innerText = opt;
            
            // Logic: If already answered, lock it. If not, allow click.
            if (savedAnswer !== undefined) {
                btn.disabled = true;
                if (i === qData.a) btn.classList.add('correct');
                else if (i === savedAnswer) btn.classList.add('wrong');
            } else {
                btn.onclick = () => this.handleAnswer(i, btn);
            }
            
            this.ui.options.appendChild(btn);
        });

        // Navigation State
        this.ui.btnPrev.disabled = this.state.index === 0;
        
        // Change "Next" to "Finish" on last question
        if (this.state.index === this.data.length - 1) {
            this.ui.btnNext.innerHTML = 'Finish 🏁';
            this.ui.btnNext.onclick = () => this.finish();
        } else {
            this.ui.btnNext.innerHTML = 'Next →';
            this.ui.btnNext.onclick = () => this.next();
        }

        this.updateDots();
    },

    handleAnswer(selectedIndex, btn) {
        // 1. Save Answer
        this.state.answers[this.state.index] = selectedIndex;
        const correctIndex = this.data[this.state.index].a;

        // 2. Play Sound & Update Score
        if (selectedIndex === correctIndex) {
            playSound('correct');
            this.state.score += 100;
        } else {
            playSound('wrong');
        }

        // 3. UI Updates (Show colors immediately)
        this.ui.score.innerText = this.state.score;
        this.renderQuestion(); // Re-render to lock buttons
    },

    next() {
        if (this.state.index < this.data.length - 1) {
            this.state.index++;
            this.renderQuestion();
        }
    },

    prev() {
        if (this.state.index > 0) {
            this.state.index--;
            this.renderQuestion();
        }
    },

    updateDots() {
        this.ui.dots.innerHTML = '';
        this.data.forEach((_, i) => {
            const dot = document.createElement('div');
            dot.className = 'dot';
            if (i === this.state.index) dot.classList.add('active');
            if (this.state.answers[i] !== undefined) dot.classList.add('done');
            this.ui.dots.appendChild(dot);
        });
    },

    finish() {
        clearInterval(this.state.timerRef);
        this.switchView('view-result');
        document.getElementById('final-score').innerText = this.state.score;
        document.getElementById('final-time').innerText = `${this.state.timeLeft}s`;
        this.ui.headerStatus.classList.add('hidden');
    },

    switchView(id) {
        this.ui.views.forEach(v => v.classList.remove('active'));
        document.getElementById(id).classList.add('active');
    }
};