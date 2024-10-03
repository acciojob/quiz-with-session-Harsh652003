// Do not change code below this line
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// Display the quiz questions and choices
const questionsDiv = document.getElementById("questions");
const submitButton = document.getElementById("submit");
const scoreDiv = document.getElementById("score");

let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || [];

// Render the quiz questions and choices
function renderQuestions() {
  questionsDiv.innerHTML = ""; // Clear previous questions

  questions.forEach((questionObj, index) => {
    const questionElement = document.createElement("div");
    const questionText = document.createElement("p");
    questionText.textContent = `${index + 1}. ${questionObj.question}`; // Show question number
    questionElement.appendChild(questionText);

    questionObj.choices.forEach((choice) => {
      const choiceLabel = document.createElement("label");
      const choiceInput = document.createElement("input");

      choiceInput.setAttribute("type", "radio");
      choiceInput.setAttribute("name", `question-${index}`);
      choiceInput.setAttribute("value", choice);

        console.log(`Restoring answer for question ${index}:`, userAnswers[index]);

       if (userAnswers[index] === choice) {
        choiceInput.checked = true;
      }

      choiceInput.addEventListener("change", () => {
        userAnswers[index] = choice; // Save the user's answer
        sessionStorage.setItem("progress", JSON.stringify(userAnswers)); // Save progress in session storage
      });

      choiceLabel.appendChild(choiceInput);
      choiceLabel.appendChild(document.createTextNode(choice));
      questionElement.appendChild(choiceLabel);
      questionElement.appendChild(document.createElement("br"));
    });

    questionsDiv.appendChild(questionElement); // Add the question element to the questionsDiv
  });
}

function calculateScore() {
  let score = 0;

  questions.forEach((questionObj, index) => {
    if (userAnswers[index] === questionObj.answer) {
      score++;
    }
  });

  localStorage.setItem("score", score); // Save score in local storage
  scoreDiv.textContent = `Your score is ${score} out of ${questions.length}`; // Display score
}

function restoreScore() {
  const savedScore = localStorage.getItem("score");
  if (savedScore !== null) {
    scoreDiv.textContent = `Your previous score was ${savedScore} out of ${questions.length}`;
  }
}

submitButton.addEventListener("click", calculateScore);

window.onload = function () {
  setTimeout(() => {
    renderQuestions();
    restoreScore(); 
  }, 100);
};