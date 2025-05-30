const track = document.getElementById("img-track");
window.onmousedown = e => {
    track.dataset.mouseDownAt = e.clientX;
}
window.onmouseup = () => {
    track.dataset.mouseDownAt = "0";
    track.dataset.prevPercentage = track.dataset.percentage;
}
window.onmousemove = e => {
    if (track.dataset.mouseDownAt === "0") return;
    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth / 2;

    const percentage = (mouseDelta / maxDelta) * -100,
        nextPercentage = parseFloat(track.dataset.prevPercentage) + percentage;

    track.dataset.percentage = nextPercentage;

    track.animate({
        transform: `translate(${nextPercentage}%, -50%)`
    }, { duration: 1200, fill: "forwards" })

    for (const image of track.getElementsByClassName("parallax-img")) {
        image.animate({
            objectPosition: `${100 + nextPercentage}% center`
        }, { duration: 1200, fill: "forwards" });

    }
}

const questions = [
    {
        question: "How many percent of the world has access to safe drinking water?",
        answers: [
            { text: "Around 95%", correct: false },
            { text: "Around 21%", correct: false },
            { text: "Around 73%", correct: true },
            { text: "Answer 52%", correct: false },
        ]
    },
    {
        question: "How many percentage of fresh water on earth is accessible to us?",
        answers: [
            { text: "0.5%", correct: true },
            { text: "90%", correct: false },
            { text: "6%", correct: false },
            { text: "15%", correct: false },
        ]
    },
    {
        question: "How many gallons of water does it take to produce one hamburger?",
        answers: [
            { text: "50 gallons", correct: false },
            { text: "150 gallons", correct: false },
            { text: "1200 gallons", correct: false },
            { text: "450 gallons", correct: true },
        ]
    },
    {
        question: "Why is it better to run a full dishwasher instead of washing dishes by hand?",
        answers: [
            { text: "Dishwashers always use less electricity", correct: false },
            { text: "It saves more water than hand washing", correct: true },
            { text: "It makes dishes cleaner", correct: false },
            { text: "Hand washing takes too long", correct: false },
        ]
    },
    {
        question: "How can fixing a leaky faucet help conserve water?",
        answers: [
            { text: "It reduces your electricity bill", correct: false },
            { text: "It saves thousands of gallons of water per year", correct: true },
            { text: "It stops annoying noises", correct: false },
            { text: "It improves water taste", correct: false },
        ]
    },
    {
        question: "Which of the following appliances uses the most water in a typical household?",
        answers: [
            { text: "Dishwasher", correct: false },
            { text: "Washing machine", correct: false },
            { text: "Shower", correct: false },
            { text: "Toilet", correct: true },
        ]
    },
    {
        question: "What practice helps conserve water in agriculture?",
        answers: [
            { text: "Flood irrigation", correct: false },
            { text: "Overhead sprinkling", correct: false },
            { text: "Daily watering", correct: false },
            { text: "Drip irrigation", correct: true },
        ]
    },
    {
        question: "Over the past several years, Myanmar's dry season has been getting longer. Which regions in Myanmar are in the Dry Zone?",
        answers: [
            { text: "Mandalay, Magway, Sagaing regions", correct: true },
            { text: "Yangon, Ayeyarwady", correct: false },
            { text: "Mon state, Kachin state", correct: false },
            { text: "Kayah, Kayin, Rakhine", correct: false },
        ]
    },
    {
        question: "What is the primary cause of water scarcity in central Myanmar?",
        answers: [
            { text: "Heavy industrial use", correct: false },
            { text: "Seasonal flooding", correct: false },
            { text: "High population density", correct: false },
            { text: "Droughts and poor water management", correct: true },
        ]
    },
    {
        question: "What does water scarcity do to Myanmar?",
        answers: [
            { text: "It makes people shower less", correct: false },
            { text: "Water scarcity leads to reduced power supply, lack of basic needs, food scarcity, minimal water supply, ecosystem failures, inflations, etc", correct: true },
            { text: "People migrate to another country", correct: false },
            { text: "It increases global warming", correct: false },
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const progress = document.getElementById("progress");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}
function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;
    progress.innerHTML = questionNo + "/10";

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("quiz-answers");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer);
    })
}


function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play again";
    nextButton.style.display = "Block";

}
function handleNextbutton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextbutton();
    } else {
        startQuiz();
    }
});

startQuiz();