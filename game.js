let score1 = 0;
let score2 = 0;
let currentTeam = 1;
let selectedGrade = null;

// Sinfni tanlash funksiyasi
function selectGrade(grade) {
    selectedGrade = grade;
    console.log(grade + "-sinf tanlandi.");
    showCategories();
}

// Fanlarni ko'rsatish
function showCategories() {
    const content = document.getElementById('main-content');
    content.innerHTML = `
        <h3>Fan tanlang (${selectedGrade}-sinf):</h3>
        <div class="grid">
            <button class="card" onclick="startQuiz('Matematika')">Matematika</button>
            <button class="card" onclick="startQuiz('Ingliz tili')">Ingliz tili</button>
            <button class="card" onclick="startQuiz('Tarix')">Tarix</button>
        </div>
    `;
}

// Savol berish jarayoni
function startQuiz(subject) {
    // 50% imkoniyat bilan qiyin yoki oson savol tanlash
    const isHard = Math.random() > 0.5;
    const points = isHard ? 50 : 15;
    
    const content = document.getElementById('main-content');
    content.innerHTML = `
        <div class="question-box">
            <span class="badge">${isHard ? 'Qiyin' : 'Oson'} - ${points} ball</span>
            <h3>${subject} bo'yicha ${selectedGrade}-sinf savoli shu yerda chiqadi?</h3>
            <div class="options">
                <button class="card" onclick="checkAnswer(true, ${points})">To'g'ri (Test uchun)</button>
                <button class="card" onclick="checkAnswer(false, ${points})">Noto'g'ri (Test uchun)</button>
            </div>
        </div>
    `;
}

// Javobni tekshirish va ball berish
function checkAnswer(isCorrect, points) {
    if (isCorrect) {
        if (currentTeam === 1) score1 += points;
        else score2 += points;
        alert("Barakalla! +" + points + " ball");
    } else {
        // Jarima: Ballning yarmini yo'qotish
        const penalty = Math.floor(points / 2);
        if (currentTeam === 1) score1 -= penalty;
        else score2 -= penalty;
        alert("Afsus! Jarima: -" + penalty + " ball");
    }

    updateUI();
    nextTurn();
}

function updateUI() {
    document.getElementById('score1').innerText = score1;
    document.getElementById('score2').innerText = score2;
}

function nextTurn() {
    currentTeam = currentTeam === 1 ? 2 : 1;
    document.getElementById('turn-display').innerText = `Jamoa ${currentTeam} ning navbati`;
    
    // Fan ichida qolish (siz aytgandek chiqib ketmaydi)
    alert("Navbat " + currentTeam + "-jamoaga o'tdi. Fan ichida davom etamiz!");
}
