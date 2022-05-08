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

let playerSelectedBeforeEl = document.getElementById("playerRock");

let computerSelectedBeforeEl = document.getElementById("computerRock");

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
  choiceIndex = Math.floor(Math.random() * 5);
  computerChoiceEl.textContent = ` --- ${choiceList[choiceIndex]}`;
  const computerSelect = choiceList[choiceIndex].toLocaleLowerCase();
  computerSelectedBeforeEl.classList.remove("selected");
  computerElements[computerSelect].classList.add("selected");
  computerSelectedBeforeEl = computerElements[computerSelect];
  return computerSelect;
}

function playerSelects(e) {
  playerChoiceEl.textContent = ` --- ${e.target.title}`;
  playerSelectedBeforeEl.classList.remove("selected");
  e.target.classList.add("selected");
  playerSelectedBeforeEl = e.target;
  const playerHand = e.target.title.toLocaleLowerCase();
  const computerHand = computerSelects();
  showResults(playerHand, computerHand);
}

function updateScore(victory, defeat) {
  if (victory) {
    playerScoreEl.textContent = Number(playerScoreEl.textContent) + 1;
  } else if (defeat) {
    computerScoreEl.textContent = Number(computerScoreEl.textContent) + 1;
  }
}

function updateTextColor(victory, defeat) {
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
  updateTextColor(victory, defeat);
}

function resetAll() {
  playerSelectedBeforeEl.classList.remove("selected");
  computerSelectedBeforeEl.classList.remove("selected");
  playerScoreEl.textContent = 0;
  computerScoreEl.textContent = 0;
  playerChoiceEl.replaceChildren();
  computerChoiceEl.replaceChildren();
  resultTextEl.replaceChildren();
  verdictEl.replaceChildren();
}

Object.keys(choices).forEach((element) => {
  const hand = choices[element].name;
  const playerHand = `player${hand}`;
  const computerHand = `computer${hand}`;
  playerElements[element] = document.getElementById(playerHand);
  computerElements[element] = document.getElementById(computerHand);
  playerElements[element].addEventListener("click", playerSelects);
});

resetIconEl.addEventListener("click", resetAll);