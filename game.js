let score1 = 0;
let score2 = 0;
let currentTeam = 1;
let selectedGrade = null;
let currentSubject = null;

// Sinf tanlash
function selectGrade(grade) {
    selectedGrade = grade;
    const content = document.getElementById('main-content');
    content.innerHTML = `
        <h3>${grade}-sinf uchun fan tanlang:</h3>
        <div class="grid">
            <button class="card" onclick="startQuiz('Matematika')">Matematika</button>
            <button class="card" onclick="startQuiz('Ingliz tili')">Ingliz tili</button>
        </div>
    `;
}

// Fan tanlanganda savol chiqarish
function startQuiz(subject) {
    currentSubject = subject;
    const questions = questionsData[selectedGrade][subject];
    
    // Tasodifiy bitta savol tanlash
    const randomQ = questions[Math.floor(Math.random() * questions.length)];
    
    const content = document.getElementById('main-content');
    content.innerHTML = `
        <div class="question-box" style="text-align:center; padding: 20px;">
            <div class="badge" style="background:orange; padding:5px; border-radius:5px;">
                ${randomQ.difficulty} ballik savol
            </div>
            <h2 style="margin: 20px 0;">${randomQ.q}</h2>
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

// Javobni tekshirish
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
    
    // Navbatni almashtirish va fanda qolish
    currentTeam = currentTeam === 1 ? 2 : 1;
    document.getElementById('turn-display').innerText = `Jamoa ${currentTeam} ning navbati`;
    
    // Keyingi savolga o'tish (avtomatik o'sha fan ichida qoladi)
    startQuiz(currentSubject);
}

function updateUI() {
    document.getElementById('score1').innerText = score1;
    document.getElementById('score2').innerText = score2;
}
