import { startConfetti, stopConfetti, removeConfetti } from "./confetti.js";


const playerElements = {};

const computerElements = {};

const playerChoiceEl = document.getElementById("playerChoice");

const computerChoiceEl = document.getElementById("computerChoice");

const playerScoreEl = document.getElementById("playerScore");

const computerScoreEl = document.getElementById("computerScore");

const resultTextEl = document.getElementById("resultText");

const verdictEl = document.getElementById("verdict");

const resetIconEl = document.getElementById("resetIcon");

const choiceList = ["Rock", "Paper", "Scissors", "Lizard", "Spock"];

const choices = {
  rock: { name: "Rock", defeats: ["scissors", "lizard"] },
  paper: { name: "Paper", defeats: ["rock", "spock"] },
  scissors: { name: "Scissors", defeats: ["paper", "lizard"] },
  lizard: { name: "Lizard", defeats: ["paper", "spock"] },
  spock: { name: "Spock", defeats: ["scissors", "rock"] },
};

const explanationList = {
  lizardpaper: "Lizard eats Paper",
  lizardrock: "Rock crushes Lizard",
  lizardscissors: "Scissors decapitates Lizard",
  lizardspock: "Lizard poisons Spock",
  paperrock: "Paper covers Rock",
  paperscissors: "Scissors cuts Paper",
  paperspock: "Paper disproves Spock",
  rockscissors: "Rock crushes Scissors",
  rockspock: "Spock vaporizes Rock",
  scissorsspock: "Spock smashes Scissors",
};

function computerSelects() {
  const choiceIndex = Math.floor(Math.random() * 5);
  const computerChoice = choiceList[choiceIndex];
  computerChoiceEl.textContent = ` --- ${computerChoice}`;
  updateSelectionStyle(computerElements, computerChoice);
  return computerChoice.toLocaleLowerCase();
}

function playerSelects(e) {
  const playerChoice = e.target.title;
  playerChoiceEl.textContent = ` --- ${playerChoice}`;
  updateSelectionStyle(playerElements, playerChoice);
  const playerHand = playerChoice.toLocaleLowerCase();
  const computerHand = computerSelects();
  showResults(playerHand, computerHand);
}

function updateSelectionStyle(elements, choice) {
  if (elements === playerElements) {
    stopConfetti();
    removeConfetti();
  }
  choiceList.forEach((hand) => {
    elements[hand].classList.toggle("selected", hand === choice);
  });
}

function updateScore(victory, defeat) {
  if (victory) {
    playerScoreEl.textContent = Number(playerScoreEl.textContent) + 1;
    startConfetti();
  } else if (defeat) {
    computerScoreEl.textContent = Number(computerScoreEl.textContent) + 1;
  }
}

function updateResultTextColor(victory, defeat) {
  verdictEl.classList.toggle("victory", victory);
  resultTextEl.classList.toggle("victory", victory);
  verdictEl.classList.toggle("defeat", defeat);
  resultTextEl.classList.toggle("defeat", defeat);
}

function showResults(playerHand, computerHand) {
  const victory = choices[playerHand].defeats.includes(computerHand);
  const tie = playerHand === computerHand;
  const defeat = !(victory || tie);
  const result = victory ? "You Won!" : tie ? "It's a tie." : "You Lost!";
  const explanationKey = [playerHand, computerHand].sort().join("");
  verdictEl.textContent = explanationList[explanationKey];
  resultTextEl.textContent = result;
  updateScore(victory, defeat);
  updateResultTextColor(victory, defeat);
}

function resetAll() {
  updateSelectionStyle(playerElements, "none");
  updateSelectionStyle(computerElements, "none");
  playerScoreEl.textContent = 0;
  computerScoreEl.textContent = 0;
  playerChoiceEl.textContent = "";
  computerChoiceEl.textContent = "";
  resultTextEl.textContent = "";
  verdictEl.textContent = "";
}

choiceList.forEach((hand) => {
  playerElements[hand] = document.getElementById(`player${hand}`);
  computerElements[hand] = document.getElementById(`computer${hand}`);
  playerElements[hand].addEventListener("click", playerSelects);
});

resetIconEl.addEventListener("click", resetAll);
