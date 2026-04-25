// O'yinni boshqarish
function selectGrade(grade) {
    selectedGrade = grade;
    const content = document.getElementById('main-content');
    content.innerHTML = `<h3>${grade}-sinf uchun fan tanlang:</h3>
    <div class="grid">
        <button class="card" onclick="startQuiz('Matematika')">Matematika</button>
        <button class="card" onclick="startQuiz('Ingliz tili')">Ingliz tili</button>
    </div>`;
}

function startQuiz(subject) {
    const questions = questionsData[selectedGrade][subject];
    const randomQ = questions[Math.floor(Math.random() * questions.length)];
    
    const content = document.getElementById('main-content');
    content.innerHTML = `
        <div class="question-box">
            <h2>${randomQ.q}</h2>
            <div class="grid">
                ${randomQ.options.map(opt => `
                    <button class="card" onclick="checkAnswer('${opt}', '${randomQ.a}', ${randomQ.difficulty})">${opt}</button>
                `).join('')}
            </div>
        </div>
    `;
}

function checkAnswer(userAns, correctAns, points) {
    if (userAns === correctAns) {
        alert("To'g'ri! +" + points + " ball");
        if (currentTeam === 1) score1 += points; else score2 += points;
    } else {
        alert("Xato! -" + (points/2) + " ball");
        if (currentTeam === 1) score1 -= points/2; else score2 -= points/2;
    }
    updateUI();
    // Navbatni almashtirish va fanda qolish...
}
