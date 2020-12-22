const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoretext = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = 0;
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let avaibleQuestions = [];

let questions = [
    {
        question: "Orange is ...?",
        choice1: 'Juice',
        choice2: 'Fruit',
        choice3: 'Color',
        choice4: "Orange",
        answer: 4,
    },
    {
        question: "Тахиа өндөг 2 ийн аль нь анхдагч вэ?",
        choice1: 'Тахиа',
        choice2: 'Өндөг',
        choice3: 'Мэдэхгүй',
        choice4: "Аль нь ч биш",
        answer: 3,
    },
    {
        question: "Гурав дөрөв 2-н аль нь бага вэ?",
        choice1: 'Гурав',
        choice2: 'Дөрөв',
        choice3: 'Хоёр',
        choice4: "Мэдэхгүй",
        answer: 3,
    },
    {
        question: "Бишү гэх нэртэй хүн монгол улсад хэд байдаг вэ?",
        choice1: 'Байхгүй',
        choice2: 'Нэг',
        choice3: 'Хоёр',
        choice4: "Хорин нэг",
        answer: 1,
    }
]

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 4;

startGame = () => {
    questionCounter = 0;
    score = 0;
    avaibleQuestions = [...questions];
    getNewQuestion();
}

getNewQuestion = () => {
    if(avaibleQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);

        return window.location.assign('/end.html')
    }

    questionCounter++;
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionIndex = Math.floor(Math.random() * avaibleQuestions.length);
    currentQuestion = avaibleQuestions[questionIndex];
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    avaibleQuestions.splice(questionIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return 

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApplay = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApplay === 'correct') {
            incrementScores(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApplay)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApplay)
            getNewQuestion()

        }, 800)
    })
})

incrementScores = num => {
    score+=num 
    scoretext.innerText = score
}

startGame()