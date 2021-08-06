'use strict';

//selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnRollDice = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const btnModal = document.querySelector('.show-modal');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');

//variables
let scores, currentScore, activePlayer, playing;

//initialization function
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
};

//load starting values on page load
init();

//starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

//switch player function
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//function for dice roll
btnRollDice.addEventListener('click', function () {
  if (playing) {
    // Generate random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    //display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //check for rolled 1, if true, switch players
    if (dice !== 1) {
      //add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch player
      switchPlayer();
    }
  }
});

//function for hold button click
btnHold.addEventListener('click', function () {
  if (playing) {
    // add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //check score is >= 100
    //finish game
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //else switch player
      switchPlayer();
    }
  }
});

//reset the game to default
btnNew.addEventListener('click', init);

//function to hide modal and overlay
const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

//uses close modal function to close modal and overlay when clicked
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

//add event listener to close modal on escape key press
document.addEventListener('keydown', function (evt) {
  if (evt.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

const openModal = function () {
  console.log('Button Clicked');
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

btnModal.addEventListener('click', openModal);
