/*
 * Variables
 */

// Resources
const icons = ['fa-leaf', 'fa-cloud', 'fa-tree', 'fa-paw', 'fa-pagelines', 'fa-bug', 'fa-sun-o', 'fa-binoculars', 'fa-leaf', 'fa-cloud', 'fa-tree', 'fa-paw', 'fa-pagelines', 'fa-bug', 'fa-sun-o', 'fa-binoculars'];
const audioClick = new Audio('sound/click.wav');
const audioMatch = new Audio('sound/match.wav');
const audioNoMatch = new Audio('sound/nomatch.wav');
const audioWin = new Audio('sound/win.wav');

 // DOM Selecetors
const cards = document.getElementsByClassName('card');
const movesCounter = document.querySelector('.moves');
const stars = document.querySelectorAll('.fa-star');
const starsContainer = document.querySelector('.stars');
const timeContainer = document.getElementById('timer');
const seconds = document.getElementById('seconds');
const minutes = document.getElementById('minutes');
const restart = document.querySelector('.fa-repeat');
const modal = document.getElementById('myModal');
const span = document.getElementsByClassName('close');
const play = document.querySelector('.play-button');
const finalStars = document.querySelector('.final-stars');
const finalMoves = document.querySelector('.final-moves');
const finalTime = document.querySelector('.final-time');
const deck = document.querySelector('.deck');

// Logical variables
let moves = 0;
let cardsOpen = [];
let matchings = 0;
let timer;
let sec = 0;
let canPlay = true;



/*
 * Starting the game
 */

// Create a new deck
newDeck();

// if restart is clicked, reset the game
restart.addEventListener('click', resetGame);



/*
 * Functions
 */

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


// Generate a new deck with the shuffled cards and the game start
function newDeck() {
  let newIcons = shuffle(icons);
  let ul = '';

  for (let i = 0; i < newIcons.length; i++) {
    let li = '<li class="card"><i class="fa ' + newIcons[i] + '"></i></li>'
    ul += li;
  }

  deck.innerHTML = ul;
  startTimer();

  // if a card is clicked, flip the card
  for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener('click', flipCard);
  }
}


// Initiate the timer. Function inspired by https://stackoverflow.com/questions/5517597/
function startTimer() {
  function pad(val) { return val > 9 ? val : '0' + val; }

  timer = setInterval( function(){
    seconds.innerHTML = pad(++sec % 60);
    minutes.innerHTML = pad(parseInt(sec / 60));
  }, 1000);
}


// Show the card, if two cards are open check if it is a match and update the rating
function flipCard() {
  if (canPlay === true) {
    this.classList.add('open', 'show', 'no-click');
    cardsOpen.push(this);

    if (cardsOpen.length === 2) {
      moves += 1;
      movesCounter.innerText = moves;

      if (cardsOpen[0].isEqualNode(cardsOpen[1])) {
        match();

      } else {
        noMatch();
      }

      rating();

    } else {
      audioClick.play();
    }
  }
}


// If cards match, display match state and check if user has won
function match() {
  for (let i = 0; i < cardsOpen.length; i++) {
    cardsOpen[i].classList.add('match');
    cardsOpen[i].classList.remove('open', 'show');
  }

  cardsOpen = [];
  matchings += 1;
  audioMatch.play();

  if (matchings === 8) {
    winGame();
  }
}


// If cards doesn't match, display error state
function noMatch() {
  cardsOpen[0].classList.add('no-match');
  cardsOpen[1].classList.add('no-match');
  canPlay = false;
  audioNoMatch.play();

  for (let i = 0; i < cards.length; i++) {
    cards[i].classList.add('no-pointer');
  }

  // After show the error state, hide the cards
  setTimeout(function() {
    cardsOpen[0].classList.remove('open', 'show', 'no-match', 'no-click');
    cardsOpen[1].classList.remove('open', 'show', 'no-match', 'no-click');
    cardsOpen = [];
    for (let i = 0; i < cards.length; i++) {
      cards[i].classList.remove('no-pointer');
    }
    canPlay = true;
  }, 700);
}


// Update the stars rating depending on the moves made
function rating() {
  if (moves > 15) {
    stars[2].classList.remove('fa-star');
    stars[2].classList.add('fa-star-o');
    if (moves > 20) {
      stars[1].classList.remove('fa-star');
      stars[1].classList.add('fa-star-o');
      if (moves > 30) {
        stars[0].classList.remove('fa-star');
        stars[0].classList.add('fa-star-o');
        // @TODO Add modal saying you lost
      }
    }
  }
}


// When the user wins, display congratulations modal
function winGame() {
  clearInterval(timer);
  finalStars.innerHTML = starsContainer.innerHTML;
  finalMoves.innerText = moves;
  finalTime.innerText = timeContainer.innerText;
  modal.classList.remove('hidden');
  audioWin.play();

  // When the user clicks on <span> (x), close the modal
  span[0].onclick = function() {
      modal.classList.add('hidden');
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
      if (event.target == modal) {
          modal.classList.add('hidden');
      }
  }

  // When the user click on play again, restart the game
  play.addEventListener('click', resetGame);
}


// Restart the game: generate new deck, reset score panel and logical variables
function resetGame() {
  cardsOpen = [];
  moves = 0;
  movesCounter.innerText = 0;
  sec = 0;
  matchings = 0;
  seconds.innerText = '00';
  minutes.innerText = '00';
  clearInterval(timer);
  modal.classList.add('hidden');

  for (let i = 0; i < cards.length; i++) {
    cards[i].classList.remove('open', 'show', 'no-click', 'match');
  }

  for (var i = 0; i < stars.length; i++) {
    stars[i].classList.remove('fa-star-o');
    stars[i].classList.add('fa-star');
  }

  newDeck();
}
