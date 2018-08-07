/*
 * Create a list that holds all of your cards
 */
let cardsArray = [
  "fa-diamond",
  "fa-paper-plane",
  "fa-anchor",
  "fa-bolt",
  "fa-cube",
  "fa-leaf",
  "fa-bicycle",
  "fa-bomb"
]


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)*/
const deck = document.querySelector(".deck");
let toggledCards = [];
let moves = 0;
let clockOff = true;
let time = 0;
let clockId;
let matched = 0;
let card = document.querySelector(".card");
const cardsToShuffle = Array.from(document.querySelectorAll(".deck li"));
const shuffledCards = shuffle(cardsToShuffle);
const TOTAL_MATCH = 8;

startClock();

deck.addEventListener("click", event => {
  const clickTarget = event.target;
  if (clickTarget.classList.contains("card") &&
  !clickTarget.classList.contains("match") &&
  toggledCards.length < 2 &&
  !toggledCards.includes(clickTarget)
  ) {

  toggleCard(clickTarget);
  addToggleCard(clickTarget);
  if (toggledCards.length === 2) {
      checkForMatch(clickTarget);
      addMove();
      checkScore();
    }
  }
});

function toggleCard(clickTarget) {
  clickTarget.classList.toggle("open");
  clickTarget.classList.toggle("show");
}
/*  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
*/
function addToggleCard(clickTarget) {
  toggledCards.push(clickTarget);
  console.log(toggledCards);
}



/*
 *  - if the list already has another card, check to see if the two cards match*/
 /*    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
*/
function checkForMatch() {
   if (
     toggledCards[0].firstElementChild.className ===
     toggledCards[1].firstElementChild.className
   ) {
     toggledCards[0].classList.toggle("match");
     toggledCards[1].classList.toggle("match");
     toggledCards = [];
     matched++;
      }
    else {
     setTimeout(() => {
     toggleCard(toggledCards[0]);
     toggleCard(toggledCards[1]);
     toggledCards = [];
   }, 1000);
     }
}

function shuffleDeck() {
  for (card of shuffledCards) {
    deck.appendChild(card);
    resetCards();
  }
}

function addMove() {
  moves++;
  const movesText = document.querySelector(".moves");
  movesText.innerHTML = moves;
}

function checkScore() {
  if (moves === 14 || moves === 20)
    { hideStar();
  }
}

function hideStar() {
  const starList = document.querySelectorAll(".stars li");
  for (star of starList) {
    if (star.style.display !== "none") {
      star.style.display = "none";
      break;
    }
  }
}

function startClock() {
    clockId = setInterval(() => {
    time++;
    displayTime();
    console.log(time);
  }, 1000);
}


function displayTime ()  {
  const clock = document.querySelector(".clock");
  clock.innerHTML = time;
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  if (seconds < 10) {
    clock.innerHTML = `${minutes}:0${seconds}`;
  } else {
    clock.innerHTML = `${minutes}:${seconds}`;
  }
}

function stopClock() {
  clearInterval(clockId);
}

function toggleModal() {
  const modal = document.querySelector(".modal_background");
  modal.classList.toggle("hide");
  modal.classList.toggle("show");
}




/* Modal tests
time = 121;
displayTime();
moves = 16;
checkScore();
*/


function getStars() {
  stars = document.querySelectorAll(".stars li");
  starCount = 3;
  for (let star of stars) {
    if (star.style.display !== "none") {
      starCount++;
    }
  }
  console.log(starCount);
  return starCount;
}

stars = getStars();
function writeModalStats() {
  const timeStat = document.querySelector(".modal_time");
  const clockTime = document.querySelector(".clock").innerHTML;
  const movesStat = document.querySelector(".modal_moves");
  const starsStat = document.querySelector(".modal_stars");

  timeStat.innerHTML = `Time = ${clockTime}`;
  movesStat.innerHTML = `Moves = ${moves}`;
  starsStat.innerHTML = `Stars = ${stars}`;
}

document.querySelector(".modal_cancel").addEventListener("click", () => {
  toggleModal("hide");
});

document.querySelector(".modal_replay").addEventListener("click", () => {
  toggleModal("hide");
  shuffleDeck();
});

function resetClockAndTime() {
  clockOff = true;
  time = 0;
  displayTime("Time");
}

function resetMoves () {
  moves = 0;
  document.querySelector(".moves").innerHTML = moves;
}

function resetGame() {
  resetClockAndTime();
  resetMoves();
  resetStars();
  shuffleDeck();
  startClock();
 }

function resetStars() {
  stars;
}

document.querySelector(".restart").addEventListener("click", () => {
  resetGame();
  });

function gameOver() {
  stopClock();
  writeModalStats();
  toggleModal();
  resetCards();
  }

  if (matched.length === 8) {
    gameOver();
  }

function resetCards() {
  const cards = document.querySelectorAll(".deck li");
  for (let card of cards) {
    card.className = "card";
  }
}

 /*    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
