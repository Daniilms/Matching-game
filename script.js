/* document.addEventListener("DOMContentLoaded", gameStart()); */
const controlsButton = document.querySelectorAll(".gamepad__d__pad__arrow");
const gameField = document.querySelector(".console__screen-main");
const consoleScreen = document.querySelector(".console__screen");
const consoleTime = document.querySelector(".console__time__time");
const consoleTimeLock = document.querySelector(".lock__time");
const forSeconds = consoleTimeLock.querySelector(".lock__time__seconds");
const forTime = consoleTimeLock.querySelector(".lock__time__hours");
const consolePlusButton = document.querySelector(
  ".console__controls__button-plus"
);
const consoleMinusButton = document.querySelector(
  ".console__controls__button-minus"
);
const consoleBatteryIndicator = document.querySelector(
  ".console__battery__battery__indicator "
);
let isOpen = false;
let isStarted = false;
let isFlipped = false;
let firstCard;
let secondCard;
let lock = false;
const array = [];
let twoCardsArray = [];

function fillArray() {
  while (array.length > 0) {
    array.pop();
  }

  for (let i = 1; i <= 8; i++) {
    array.push(i, i);
  }
}
fillArray();
const arrOfImgNames = [
  "Mario",
  "Mario",
  "Bowser",
  "Bowser",
  "Zelda-logo",
  "Zelda-logo",
  "Zelda-sword",
  "Zelda-sword",
  "Zelda",
  "Zelda",
  "Luigi",
  "Luigi",
  "Pikachu",
  "Pikachu",
  "Golden-mushroom",
  "Golden-mushroom",
];
function shuffle() {
  arrOfImgNames.sort(() => Math.random() - 0.5);
  /* array.sort(() => Math.random() - 0.5); */
}
shuffle();

function createGameCards() {
  for (let i = 0; i < 16; i++) {
    let createdCards = document.createElement("p");
    createdCards.setAttribute("data-value", array[i]);
    createdCards.id = "game_card";
    createdCards.style.backgroundImage = `url(./images/${arrOfImgNames[i]}.jpg)`;
    createdCards.classList.add("game__container__card");

    gameField.appendChild(createdCards);
  }
}
createGameCards();

let fullBattery = 100;

function changeBatteryFill() {
  fullBattery--;
  consoleBatteryIndicator.style.height = fullBattery - 1 + "%";
}

function getTime() {
  const forHours = consoleTime.querySelector(".console__time__time__hours");
  const forMinutes = consoleTime.querySelector(".console__time__time__minutes");
  const date = new Date();
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  if (hour.toString().length < 2) {
    forHours.textContent = `0${hour}`;
    forTime.textContent = `0${hour}:${minutes}`;
    forSeconds.textContent = `${seconds}`;
  } else {
    forHours.textContent = `${hour}`;
    forTime.textContent = `${hour}:${minutes}`;
    forSeconds.textContent = `${seconds}`;
  }
  if (minutes.toString().length < 2) {
    forMinutes.textContent = `0${minutes}`;
    forTime.textContent = `${hour}:0${minutes}`;
    forSeconds.textContent = `${seconds}`;
  } else {
    forMinutes.textContent = `${minutes}`;
    forSeconds.textContent = `${seconds}`;
  }
  if (seconds.toString().length < 2) {
    forTime.textContent = `${hour}:${minutes}`;
    forSeconds.textContent = `0${seconds}`;
  }
}

getTime();

function getLockTime() {
  const timeLockInterval = setInterval(() => {
    getTime();
    if (!isOpen) {
      clearInterval(timeLockInterval);
    }
  }, 1000);
  return timeLockInterval;
}

function interval() {
  const interval2 = setInterval(() => {
    changeBatteryFill();
    console.log(`заряда осталось: ${consoleBatteryIndicator.style.height}`);
    if (consoleBatteryIndicator.style.height === 0 + "%") {
      clearInterval(interval2);
      test();
    }
  }, 1000);
}

const gameCards = document.querySelectorAll("#game_card");
/* function moveWithArrows() {} */
controlsButton.forEach((button) => {
  button.addEventListener("click", (evt) => {
    getFirstPress(evt.target);
  });
});

let currentPosition = 0;
let howManyClicks = 0;

consolePlusButton.addEventListener("click", (evt) => {
  let currentElem = "";
  gameCards.forEach((el) => {
    if (el.classList.contains("game__container__card-mod-manual-controls")) {
      el.classList.remove("game__container__card-mod-manual-controls");
      el.classList.add("game__container__card-mod");
      currentElem = el;
    }
  });
  console.log(currentElem);
  flipCard(currentElem);
});

consoleMinusButton.addEventListener("click", () => {
  getLockTime();
  if (!isOpen) {
    consoleScreen.classList.add("console__screen-mod");
    consoleTimeLock.classList.add("lock__time-mod");
    isOpen = true;
  } else {
    isOpen = false;
    consoleScreen.classList.remove("console__screen-mod");
    consoleTimeLock.classList.remove("lock__time-mod");
  }
});
function getFirstPress(evt) {
  howManyClicks++;
  if (howManyClicks === 1) {
    currentPosition = 0;
    gameCards[currentPosition].classList.add(
      "game__container__card-mod-manual-controls"
    );
  } else {
    move(evt);
  }
}

function move(evt) {
  gameCards[currentPosition].classList.remove(
    "game__container__card-mod-manual-controls"
  );
  if (
    evt.classList.contains("gamepad__d__pad__arrow-left") &&
    currentPosition > 0
  ) {
    currentPosition--;
    gameCards[currentPosition].classList.add(
      "game__container__card-mod-manual-controls"
    );
  } else if (
    evt.classList.contains("gamepad__d__pad__arrow-left") &&
    currentPosition === 0
  ) {
    currentPosition = gameCards.length - 1;
    gameCards[currentPosition].classList.add(
      "game__container__card-mod-manual-controls"
    );
  }
  if (
    evt.classList.contains("gamepad__d__pad__arrow-right") &&
    currentPosition <= 14
  ) {
    currentPosition++;
    gameCards[currentPosition].classList.add(
      "game__container__card-mod-manual-controls"
    );
  } else if (
    evt.classList.contains("gamepad__d__pad__arrow-right") &&
    currentPosition === 15
  ) {
    currentPosition = 0;
    gameCards[currentPosition].classList.add(
      "game__container__card-mod-manual-controls"
    );
  }
  if (
    evt.classList.contains("gamepad__d__pad__arrow-down") &&
    currentPosition <= 11
  ) {
    currentPosition += 4;
    gameCards[currentPosition].classList.add(
      "game__container__card-mod-manual-controls"
    );
  }
  if (
    evt.classList.contains("gamepad__d__pad__arrow-up") &&
    currentPosition >= 4
  ) {
    currentPosition -= 4;
    gameCards[currentPosition].classList.add(
      "game__container__card-mod-manual-controls"
    );
  }
}
function createGameField() {
  gameCards.forEach((card) => {
    card.addEventListener("click", (evt) => {
      flipCard(evt.target);
    });
  });
}
createGameField();

function flipCard(evt) {
  if (!isStarted) {
    interval();
  }
  isStarted = true;
  if (lock) return;

  if (evt === firstCard) return;

  evt.classList.add("open");
  evt.classList.add("game__container__card-mod");

  if (!isFlipped) {
    isFlipped = true;
    firstCard = evt;
    return;
  }
  secondCard = evt;
  checkForMatch();
}

function checkForMatch() {
  if (firstCard.style.backgroundImage === secondCard.style.backgroundImage) {
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
    firstCard.classList.remove("open", "game__container__card-mod");
    secondCard.classList.remove("open", "game__container__card-mod");
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

function lockingAllCards() {
  const gameCards = document.querySelectorAll("#game_card");
  gameCards.forEach((card) => {
    card.removeEventListener("click", flipCard);
    card.classList.remove("successfull");
  });
}
