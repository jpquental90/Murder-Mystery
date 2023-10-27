
// HTML 1

document.addEventListener("DOMContentLoaded", function() {
const popupTryAgain = document.getElementById("popupBox");
const openPopupTryAgain = document.getElementById("openPopupButton");
const closePopupTryAgain = document.getElementById("closePopupButton");

function openPopup() {
    popupTryAgain.style.display = "flex";
}

function closePopup() {
    popupTryAgain.style.display = "none";
}

openPopupTryAgain.addEventListener("click", openPopup);
closePopupTryAgain.addEventListener("click", closePopup);
})


// HTML 2


document.addEventListener("DOMContentLoaded", function() {
    let btnMenu = document.querySelector("#btn-menu");
    let sidebar = document.querySelector(".sidebar");
    
    btnMenu.onclick = function() {
        sidebar.classList.toggle("active");
    }
    
    });

document.addEventListener("DOMContentLoaded", function() {
    const menuLinks = document.querySelectorAll("nav ul li a");
    const contentSections = document.querySelectorAll(".content");
    
    menuLinks.forEach(function(link, index) {
        link.addEventListener("click", function(event) {
            event.preventDefault();
    
            contentSections.forEach(function(section) {
                section.style.display = "none";
            });
    
            contentSections[index].style.display = "block";
        });
    });
});

const themeBtns = document.querySelectorAll(".theme");

const handleThemeChange = (e) => {
    const theme = e.currentTarget.dataset.theme;
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("myCustomTheme", theme);
}

themeBtns.forEach(t => t.addEventListener("click", handleThemeChange))

window.addEventListener("DOMContentLoaded", () => {
    const theme = localStorage.getItem("myCustomTheme");
    theme && document.documentElement.setAttribute ("data-theme", theme);
})


// HTML 3

const questions = [
    {
        question: "Who did it?",
        answers: [
            { text: "Lady Violet", correct: true},
            { text: "Vice President Mauve", correct: false},
            { text: "Duchess of Vermillion", correct: false},
        ]
    },
    {
        question: "Where?",
        answers: [
            { text: "The central fire", correct: false},
            { text: "The ancient ruins", correct: false},
            { text: "The thick forest", correct: true},
        ]
    },
    {
        question: "With what?",
        answers: [
            { text: "A cauldron", correct: false},
            { text: "A log", correct: false},
            { text: "A broom", correct: true},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn-answer");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    const totalQuestions = questions.length;

    if (score === totalQuestions) {
        questionElement.innerHTML = `Congratulations! If this was you first attempt, Deductive Logico will be in touch!`;
    } else {
        questionElement.innerHTML = `You scored ${score} out of ${totalQuestions}. Well done for trying!`;
    }

    nextButton.innerHTML = "Try Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();

