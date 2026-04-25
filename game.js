let score1 = 0;
let score2 = 0;
let currentTeam = 1;
let selectedGrade = null;
let currentSubject = null;

// O'yin boshlanganda UI ni yangilash
window.onload = function() {
    console.log("O'yin yuklandi!");
    updateUI();
};

// Sinf tanlash funktsiyasi
function selectGrade(grade) {
    selectedGrade = grade;
    console.log(grade + "-sinf tanlandi");
    
    const content = document.getElementById('main-content');
    content.innerHTML = `
        <h3 style="color:white;">${grade}-sinf uchun fan tanlang:</h3>
        <div class="grid">
            <button class="card" onclick="startQuiz('Matematika')">Matematika</button>
            <button class="card" onclick="startQuiz('Ingliz tili')">Ingliz tili</button>
        </div>
    `;
}

// Savolni chiqarish funktsiyasi
function startQuiz(subject) {
    currentSubject = subject;
    console.log(subject + " boshlandi");

    // Savollar bazasi borligini tekshirish
    if (!questionsData || !questionsData[selectedGrade] || !questionsData[selectedGrade][subject]) {
        alert("Bu fan yoki sinf uchun savollar hali qo'shilmagan!");
        return;
    }

    const questions = questionsData[selectedGrade][subject];
    const randomQ = questions[Math.floor(Math.random() * questions.length)];
    
    const content = document.getElementById('main-content');
    content.innerHTML = `
        <div class="question-box" style="text-align:center;">
            <div class="badge" style="background:#ffcc00; color:black; padding:10px; border-radius:10px; margin-bottom:10px; display:inline-block;">
                ${randomQ.difficulty} ballik savol
            </div>
            <h2 style="color:white; margin:20px;">${randomQ.q}</h2>
            <div class="grid">
                ${randomQ.options.map(opt => `
                    <button class="card" onclick="checkAnswer('${opt}', '${randomQ.a}', ${randomQ.difficulty})">
                        ${opt}
                    </button>
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
        const penalty = Math.floor(points / 2);
        alert("Xato! To'g'ri javob: " + correctAns + ". Jarima: -" + penalty);
        if (currentTeam === 1) score1 -= penalty; else score2 -= penalty;
    }
    
    updateUI();
    currentTeam = currentTeam === 1 ? 2 : 1;
    document.getElementById('turn-display').innerText = `Jamoa ${currentTeam} ning navbati`;
    
    // Savol javobdan keyin o'sha fan ichida qoladi
    startQuiz(currentSubject);
}

function updateUI() {
    document.getElementById('score1').innerText = score1;
    document.getElementById('score2').innerText = score2;
}

// Funktsiyalarni global qilish (HTML ko'rishi uchun)
window.selectGrade = selectGrade;
window.startQuiz = startQuiz;
window.checkAnswer = checkAnswer;
