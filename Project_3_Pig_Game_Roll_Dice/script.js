"use strict";

//Selecting Elements
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");

const score0 = document.querySelector("#score--0");
const score1 = document.getElementById("score--1");

const currentScore0 = document.getElementById("current--0");
const currentScore1 = document.getElementById("current--1");

const dice = document.querySelector(".dice");

const buttonNew = document.querySelector(".button--new");
const buttonRoll = document.querySelector(".button--roll");
const buttonHold = document.querySelector(".button--hold");

let currentScore;
let activePlayer;
let playing;
let scores;

dice.classList.remove("hidden");
function reinitiliaze() {
  scores = [0, 0];
  currentScore = 0;
  score0.textContent = 0;
  score1.textContent = 0;

  currentScore = 0;
  activePlayer = 0;

  playing = true;

  document.getElementById(`current--0`).textContent = currentScore;
  document.getElementById(`current--1`).textContent = currentScore;

  document.getElementById("score--0").textContent = 0;
  document.getElementById("score--1").textContent = 0;

  dice.classList.remove("hidden");
  dice.src = "Starter.png";
  player0.classList.remove("player--winner");
  player1.classList.remove("player--winner");
  player1.classList.remove("player--active");
  player0.classList.add("player--active");
}
reinitiliaze();
function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  // activePlayer = activePlayer === 0 ? 1 : 0;
  if (activePlayer === 0) {
    activePlayer = 1;
    player1.classList.toggle("player--active");
    player0.classList.toggle("player--active");
  } else {
    activePlayer = 0;
    player0.classList.toggle("player--active");
    player1.classList.toggle("player--active");
  }
}

//Rolling dice functionality
buttonRoll.addEventListener("click", function () {
  if (playing) {
    //1.Generating the random dice roll
    const diceNumber = Math.trunc(Math.random() * 6) + 1;
    console.log(diceNumber);

    //2. Display Dice Number
    dice.classList.remove("hidden");
    dice.src = `Dice_${diceNumber}.png`;

    //3.Check if dice is 1
    if (diceNumber !== 1) {
      currentScore = currentScore + diceNumber;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

buttonHold.addEventListener("click", function () {
  if (playing) {
    // document.getElementById(`score--${activePlayer}`).textContent = currentScore;
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 20) {
      playing = false;
      dice.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      switchPlayer();
    }
  }
});

buttonNew.addEventListener("click", reinitiliaze);
