/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */



// Variables
const icons = ['.fa-leaf', '.fa-cloud', '.fa-tree', '.fa-paw', '.fa-pagelines', '.fa-bug', '.fa-sun-o', '.fa-binoculars','.fa-leaf', '.fa-cloud', '.fa-tree', '.fa-paw', '.fa-pagelines', '.fa-bug', '.fa-sun-o', '.fa-binoculars'];
const cards = document.getElementsByClassName('card');
const movesCounter = document.querySelector('.moves');
const stars = document.querySelectorAll('.fa-star');
const seconds = document.getElementById('seconds');
const minutes = document.getElementById('minutes');
const repeat = document.querySelector('.fa-repeat');
var moves = 0;
var cardsOpen = [];
let sec = 0;


// Implementing the timer. Function inspired by https://stackoverflow.com/questions/5517597/
function startTimer() {
  function pad(val) { return val > 9 ? val : '0' + val; }

  var timer = setInterval( function(){
    seconds.innerHTML = pad(++sec % 60);
    minutes.innerHTML = pad(parseInt(sec / 60));
  }, 1000);
}

// Check if cards match
function match() {
  if (cardsOpen.length === 2) {
    if (cardsOpen[0].isEqualNode(cardsOpen[1])) {
      for (let i = 0; i < cardsOpen.length; i++) {
        cardsOpen[i].classList.add('match');
        cardsOpen[i].classList.remove('open', 'show');
      }
      cardsOpen = [];
    } else {
      noMatch();
    }
    moves += 1;
    movesCounter.innerText = moves;
  }
}

// If cards doesn't match, error state
function noMatch() {
  cardsOpen[0].classList.add('no-match');
  cardsOpen[1].classList.add('no-match');

  setTimeout(function() {
    cardsOpen[0].classList.remove('open', 'show', 'no-match', 'no-click');
    cardsOpen[1].classList.remove('open', 'show', 'no-match', 'no-click');
    cardsOpen = [];
  }, 1000)
}

// Stars rating depending of the moves made
function rating() {
  if (moves > 15) {
    stars[0].classList.remove('fa-star');
    stars[0].classList.add('fa-star-o');
    if (moves > 20) {
      stars[1].classList.remove('fa-star');
      stars[1].classList.add('fa-star-o');
      if (moves > 30) {
        stars[2].classList.remove('fa-star');
        stars[2].classList.add('fa-star-o');
        // @TODO Add modal saying you lost
      }
    }
  }
}

// Shuffle cards so it doesn´t get repetitive. Function from http://stackoverflow.com/a/2450976
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

// Restarting the game
var reset = function resetGame() {
  moves = 0;
  movesCounter.innerText = 0;
  sec = 0;
  seconds.innerText = '00';
  minutes.innerText = '00';

  for (let i = 0; i < cards.length; i++) {
    cards[i].classList.remove('open', 'show', 'no-click', 'match');
  }

  for (var i = 0; i < stars.length; i++) {
    stars[i].classList.remove('fa-star-o');
    stars[i].classList.add('fa-star');
  }

  shuffle(cards);
}

/*
 * Starting the game
 */

startTimer();

// Listening if a card is clicked
for (let i = 0; i < cards.length; i++) {
  cards[i].addEventListener('click', function flipCard() {
    cards[i].classList.add('open', 'show', 'no-click');
    cardsOpen.push(this);

      match();
      rating();
  });
}

//Listening if reset is clicked
repeat.addEventListener('click', reset);
