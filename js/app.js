/*
 * Create a list that holds all of your cards
 */
const cards = document.getElementsByClassName('card');
var openCards=[];

function noMatch() {
  if (openCards.length === 2 && !(openCards[0].isEqualNode(openCards[1]))) {
    for (let i=0; i<openCards.length; i++) {
      openCards[i].classList.remove('open', 'show');
    }
    openCards=[];
  }
}

//Cheking if the cards match
function match() {
  if (openCards.length === 2 && openCards[0].isEqualNode(openCards[1])) {
    for (let i=0; i<openCards.length; i++) {
      openCards[i].classList.add('match');
      openCards[i].classList.remove('open', 'show');
    }
    openCards=[];
  } else {
    noMatch();
  }
  // } else {
  //   for (let i=0; i<openCards.length; i++) {
  //     openCards[i].classList.remove('open', 'show');
  //   }
  // }
}




// Listening if a card is clicked
for (let i=0; i<cards.length; i++) {
  cards[i].addEventListener('click', function flipCard() {
    cards[i].classList.add('show', 'open');
    openCards.push(this);
    match();
  });
}


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
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
