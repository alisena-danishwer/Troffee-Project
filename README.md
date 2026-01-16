# 🏆 Troffee Education | Smart Assessment

> **A Gamified Educational Assessment Portal developed for Troffee Education.**

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Status](https://img.shields.io/badge/status-Internship%20Project-success.svg)
![Tech](https://img.shields.io/badge/tech-HTML5%20%7C%20CSS3%20%7C%20ES6-yellow.svg)

## 📖 Project Overview
**Smart Assessment** is a responsive, single-page web application (SPA) designed to gamify the assessment process for students and teachers. Unlike standard quiz forms, this application features a custom state management engine, real-time feedback loops, and a "Glassmorphism" UI design to align with modern EdTech standards.

This project was engineered to demonstrate core competencies in **DOM manipulation**, **State Persistence**, and **User Experience (UX) design**.

---

## ✨ Key Features

### 🎮 Gamification Engine
* **Real-time Feedback:** Instant visual (color-coded) and auditory cues (Web Audio API) for correct/incorrect answers.
* **Global Timer:** A countdown timer creates urgency, simulating real exam conditions.
* **Dynamic Scoring:** Points are awarded based on accuracy, with immediate score updates.

### 🧩 Advanced Logic
* **Role-Based Content:** The app dynamically loads different question banks (JSON structure) based on the user selection (**Student** vs. **Teacher**).
* **Navigation System:** Users can traverse questions (`Previous` / `Next`), review their answers, and skip questions to return to them later.
* **State Management:** The app remembers the user's selected answer for every question during the session, preventing data loss during navigation.

### 💾 Data Persistence
* **High Score Tracking:** Utilizes browser `localStorage` to persist the user's best performance across sessions.
* **Session History:** Calculates final scores and time remaining to provide a detailed summary.

### 🎨 Modern UI/UX
* **Responsive Design:** Fully fluid layout that adapts from Desktop monitors to Mobile screens using CSS Flexbox and Media Queries.
* **Glassmorphism:** Modern aesthetic using backdrop filters, translucent layers, and vibrant gradients.
* **Interactive Animations:** Smooth transitions between views and button states.

---

## 🛠️ Technical Stack

* **Frontend:** HTML5, CSS3 (CSS Variables, Flexbox, Grid)
* **Logic:** Vanilla JavaScript (ES6+)
* **Audio:** Native `AudioContext` API (No external assets required)
* **Icons:** Unicode & CSS Shapes
* **Fonts:** Plus Jakarta Sans (Google Fonts)

---

## 🚀 How to Run

1.  **Clone or Download** this repository.
2.  Ensure the following file structure exists:
    ```text
    /Smart-Assesment
    ├── index.html
    ├── style.css
    ├── script.js
    └── README.md
    ```
3.  **Open `index.html`** in any modern web browser (Chrome, Edge, Firefox, Safari).
4.  *Optional:* To view the mobile layout, open Developer Tools (`F12`) and toggle the Device Toolbar (`Ctrl+Shift+M`).

---

## 👨‍💻 Developer Guide (Code Structure)

### `script.js` Architecture
The application logic is encapsulated within a single `app` object to prevent global namespace pollution.

* **`QUESTIONS` Object:** Acts as the database, storing separate arrays for 'student' and 'teacher' content.
* **`state` Object:** Tracks the current index, score, timer, and a map of user answers (`{ questionIndex: selectedOption }`).
* **`audioCtx`:** Generates sound waves mathematically, removing the need for loading external MP3 files.

### `style.css` Architecture
* **CSS Variables (`:root`)** are used for color themes, allowing for easy re-branding.
* **Animation Keyframes** handles the "Fade In" and "Bounce" effects.

---

## 🔮 Future Improvements
*(Planned features for v2.0)*
* [ ] **Review Mode:** Detailed breakdown of wrong answers at the end screen.
* [ ] **API Integration:** Fetching questions from a live server/database.
* [ ] **Dark Mode:** A toggle for low-light environments.

---

## ✍️ Developer

**Ali Sena Danishwer**
*Software Engineer | Internship Applicant*

> Developed with passion for Trofee Education.
