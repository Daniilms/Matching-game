/* document.addEventListener("DOMContentLoaded", gameStart()); */

const gameField = document.querySelector(".game__container");
const array = [];
const resetButton = document.querySelector(".container__reset__button");

function fillArray() {
  while (array.length > 0) {
    array.pop();
  }

  for (let i = 1; i <= 8; i++) {
    array.push(i, i);
  }
}
fillArray();
function shuffle() {
  array.sort(() => Math.random() - 0.5);
}
shuffle();
function createGameCards() {
  for (let i = 0; i < 16; i++) {
    let creatingCards = document.createElement("p");
    creatingCards.setAttribute("data-value", array[i]);
    creatingCards.textContent = creatingCards.dataset.value;
    creatingCards.id = "game_card";
    creatingCards.classList.add("game__container__card");
    gameField.appendChild(creatingCards);
  }
}
createGameCards();

const gameCards = document.querySelectorAll("#game_card");

function createGameField() {
  gameCards.forEach((card) => {
    card.addEventListener("click", flipCard);
  });
}
createGameField();

let isFlipped = false;
let firstCard;
let secondCard;
let lock = false;

function flipCard(evt) {
  if (lock) return;
  if (evt.target === firstCard) return;

  evt.target.classList.add("open");

  if (!isFlipped) {
    isFlipped = true;
    firstCard = evt.target;
    return;
  }

  secondCard = evt.target;

  checkForMatch();
}

function checkForMatch() {
  if (firstCard.dataset.value === secondCard.dataset.value) {
    firstCard.classList.add("successfull");
    secondCard.classList.add("successfull");
    disableCards();
    return;
  }
  unflipCards();
}
function resetBoard() {
  [isFlipped, lock] = [false, false];
  [firstCard, secondCard] = [null, null];
}
function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  resetBoard();
}

function unflipCards() {
  lock = true;
  setTimeout(() => {
    firstCard.classList.remove("open");
    secondCard.classList.remove("open");
    resetBoard();
  }, 1500);
}

function unflipAllCards() {
  const gameCards = document.querySelectorAll("#game_card");
  gameCards.forEach((card) => {
    card.classList.remove("open");
  });
}

let isDone = false;
{
  const gameCards = document.querySelectorAll("#game_card");
  gameCards.forEach((card) => {
    const timerControls = document.querySelector(".container__timer__controls");
    card.addEventListener("click", () => {
      if (isDone === false) {
        getTimer();
        resetButton.disabled = true;
        timerControls.classList.add("isOpened");
        isDone = true;
      }
    });
  });
}

let interval;

const timer = document.querySelector(".container__timer");
let timeLeft = 60;

function getTimer() {
  interval = setInterval(() => {
    timeLeft--;
    timer.innerHTML = timeLeft;

    if (timeLeft === 0) {
      clearInterval(interval);
      unflipAllCards();
      lockingAllCards();
    }
  }, 1000);
}

function lockingAllCards() {
  const gameCards = document.querySelectorAll("#game_card");
  gameCards.forEach((card) => {
    resetButton.disabled = false;
    card.removeEventListener("click", flipCard);
    card.classList.remove("successfull");
  });
}

resetButton.addEventListener("click", () => {
  clearInterval(interval);
  resetButton.disabled = true;
  timeLeft = 60;
  fillArray();
  createGameField();
  unflipAllCards();
  getTimer();
});
