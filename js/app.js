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
const cards = document.getElementsByClassName('card');
var cardsOpen = [];



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
  }
}

// If cards don't match, error state
function noMatch() {
  // @TODO add timer and error state

  for (let i = 0; i < cardsOpen.length; i++) {
    cardsOpen[i].classList.remove('open', 'show');
  }
  cardsOpen = [];
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



// Listening if a card is clicked
for (let i = 0; i < cards.length; i++) {
  cards[i].addEventListener('click', function flipCard() {

    if (cards[i] !== cardsOpen[0]) { // Checking if it is the same card
      cards[i].classList.add('open', 'show');
      cardsOpen.push(this);

      match();
    }
  });
}
