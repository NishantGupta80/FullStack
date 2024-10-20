import { GoogleGenerativeAI } from "@google/generative-ai";
const questionLabel = document.getElementById("question-label");
const answerBox = document.getElementById("answer-box");
const submitBtn = document.getElementById("submit-btn");
const nextBtn = document.getElementById("next-btn");
const previousBtn = document.getElementById("previous-btn");
const responseText = document.getElementById("response-text");

const GEMINI_API_KEY = "AIzaSyBT7EsgKI5igL7eXcH_Z0bVKwOzMkPW7XY";

const QUESTIONS = [
  "what is functions in js?",
  "what is the diffrence between arrow functions and normal functions in js?",
  "what is the diffrence between arrow functions and normal functions in js?",
  "what is the diffrence between arrow functions and normal functions in js?",
  "what is the diffrence between arrow functions and normal functions in js?",
];
let currentQuestion = -1;
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

goToNextQuestion();


function checkBtnsVisibility(){
  if(currentQuestion==0){
    previousBtn.style.display = "none";
  }
  if(currentQuestion==1){
    previousBtn.style.display = "inline-block";
  }
  if(currentQuestion==QUESTIONS.length-1){
    nextBtn.style.display = "none";
  }
  if(currentQuestion==QUESTIONS.length-2){
    nextBtn.style.display = "inline-block";
  }
}

function goToNextQuestion() {
   currentQuestion++;
  questionLabel.innerText = `Question ${currentQuestion + 1}: ${
    QUESTIONS[currentQuestion]
    }`;
    checkBtnsVisibility();
}

function goToPreviousQuestion() {
  currentQuestion--;
  questionLabel.innerText = `Question ${currentQuestion + 1}: ${
    QUESTIONS[currentQuestion]
    }`;
    checkBtnsVisibility();
}


nextBtn.addEventListener("click", () => {
  goToNextQuestion();
});

previousBtn.addEventListener("click", () => {
  goToPreviousQuestion();
});

submitBtn.addEventListener("click", async () => {
  let prompt = `Question:${QUESTIONS[currentQuestion]}\nAnswer:${answerBox.value} Evaluate the question and answer and give me the response in 2 lines`;
  const result = await model.generateContent(prompt);
  responseText.innerText = result.response.text();
});
