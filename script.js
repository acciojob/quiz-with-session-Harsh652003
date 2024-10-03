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

// Function to render questions and choices
function renderQuestions() {
  questionsDiv.innerHTML = ""; 

  questions.forEach((questionObj, index) => {
    const questionElement = document.createElement("div");
    const questionText = document.createElement("p");
    questionText.textContent = questionObj.question; // Display question without number
    questionElement.appendChild(questionText);

    questionObj.choices.forEach((choice) => {
      const choiceLabel = document.createElement("label");
      const choiceInput = document.createElement("input");

      choiceInput.setAttribute("type", "radio");
      choiceInput.setAttribute("name", `question-${index}`);
      choiceInput.setAttribute("value", choice);

      // Restore checked state
      if (userAnswers[index] === choice) {
        choiceInput.checked = true; // Set radio button as checked
      }

      // Add event listener to save progress when an option is selected
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

// Function to calculate the score
function calculateScore() {
  let score = 0;

  questions.forEach((questionObj, index) => {
    if (userAnswers[index] === questionObj.answer) {
      score++;
    }
  });

  sessionStorage.setItem("score", score); // Save score in session storage
  scoreDiv.textContent = `Your score is ${score} out of ${questions.length}`; // Display score
}

// Function to restore previous score
function restoreScore() {
  const savedScore = sessionStorage.getItem("score");
  if (savedScore !== null) {
    scoreDiv.textContent = `Your previous score was ${savedScore} out of ${questions.length}`;
  }
}

// Event listener for the submit button
submitButton.addEventListener("click", calculateScore);

// On window load, render questions and restore the score
window.onload = function () {
  setTimeout(() => {
    renderQuestions(); // Render questions
    restoreScore(); // Restore previous score
  }, 100);
};
