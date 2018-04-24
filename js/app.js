// cards array holds all cards
let card = document.getElementsByClassName("card");
let cards = [...card];
console.log(cards);

// content arrau holds all descriptions
let content = document.getElementsByClassName("content");
let contents = [...content];

// deck of all cards in game
let deck = document.getElementById("card-deck");

// declaring move variable
let moves = 40;
let counter = document.querySelector(".moves");

// declare variables for star icons
const stars = document.querySelectorAll(".fa-star");

// declaring variable of matchedCards
let matchedCard = document.getElementsByClassName("match");

// stars list
let starsList = document.querySelectorAll(".stars li");

// close icon in modal
//let closeicon = document.querySelector(".close");

// declare modal
let modal = document.getElementById("popup1");

// array for opened cards
var openedCards = [];
var matchCount = 0;
var z = -1; //TODO make this go to zero after 2
var researching = ["Biodiversity helps us research new solutions to problems. Biodiversity has helped us engineer new organs for patients and it has helped up improve our nutrition.", "description 2", "description 3"];


// @description shuffles cards
// @param {array}
// @returns shuffledarray
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


// @description shuffles cards when page is refreshed / loads
// document.body.onload = startGame();


// @description function to start a new play
function startGame() {
  console.log("started");
  //shuffle content
  z++;

  // shuffle deck
  cards = shuffle(cards);

  // remove all exisiting classes from each card
  for (var i = 0; i < cards.length; i++) {
    deck.innerHTML = "";
    [].forEach.call(cards, function(item) {
      deck.appendChild(item);
    });
    cards[i].classList.remove("show", "open", "match", "disabled");
  }

  // shuffle contents
  // contents = suffle(contents);


  // reset moves
  moves = 40;
  counter.innerHTML = moves;
  // reset rating
  for (i = 0; i < stars.length; i++) {
    stars[i].style.color = "#FFD700";
    stars[i].style.visibility = "visible";
  }
  //reset timer
  second = 59;
  minute = 1;
  var timer = document.querySelector(".timer");
  // timer.innerHTML = "1 min 59 secs";
  clearInterval(interval);
}


// @description toggles open and show class to display cards
var displayCard = function() {
  this.classList.toggle("open");
  this.classList.toggle("show");
  this.classList.toggle("disabled");
};


// @description add opened cards to OpenedCards list and check if cards are match or not
function cardOpen() {
  openedCards.push(this);
  var len = openedCards.length;
  console.log(len);
  moveCounter();
  if (len === 2) {
    //moveCounter();
    if (openedCards[0].type === openedCards[1].type) {
      setTimeout(matched, 1200);
    } else {
      unmatched();
    }
  }
}


// @description when cards match
function matched() {
  openedCards[0].classList.add("match", "disabled");
  openedCards[1].classList.add("match", "disabled");
  openedCards[0].classList.remove("show", "open", "no-event");
  openedCards[1].classList.remove("show", "open", "no-event");
  congratulations();
  openedCards = [];
}


// description when cards don't match
function unmatched() {
  openedCards[0].classList.add("unmatched");
  openedCards[1].classList.add("unmatched");
  disable();
  setTimeout(function() {
    openedCards[0].classList.remove("show", "open", "no-event", "unmatched");
    openedCards[1].classList.remove("show", "open", "no-event", "unmatched");
    enable();
    openedCards = [];
  }, 2200);
}


// @description disable cards temporarily
function disable() {
  Array.prototype.filter.call(cards, function(card) {
    card.classList.add('disabled');
  });
}


// @description enable cards and disable matched cards
function enable() {
  Array.prototype.filter.call(cards, function(card) {
    card.classList.remove('disabled');
    for (var i = 0; i < matchedCard.length; i++) {
      matchedCard[i].classList.add("disabled");
    }
  });
}


// @description count player's moves
function moveCounter() {
  moves--;
  counter.innerHTML = moves;
  //start timer on first click
  if (moves == 39) {
    second = 59;
    minute = 1;
    startTimer();
  } else if (moves <= 1) {
    moves = 1;
  }
  // setting rates based on moves (not in use)
  // if (moves > 8 && moves < 12){
  //     for( i= 0; i < 3; i++){
  //         if(i > 1){
  //             stars[i].style.visibility = "collapse";
  //         }
  //     }
  // }
  // else if (moves > 13){
  //     for( i= 0; i < 3; i++){
  //         if(i > 0){
  //             stars[i].style.visibility = "collapse";
  //         }
  //     }
  // }
}


// @description game timer
var second = 59,
  minute = 1;
var timer = document.querySelector(".timer");
var interval;

function startTimer() {
  interval = setInterval(function() {
    // timer.innerHTML = minute + " min " + second + " secs";
    if (minute == 0 && second == 0) {
      clearInterval(interval);
    } else if (minute == 1 && second == 0) {
      second = 59;
      minute--;
    } else if (second == 29 && minute == 0) {
      document.querySelector(".timer").style.color = "red";
    }
    second--;
  }, 1000);
}

// @description congratulations when all cards match, show modal and moves, time and rating
function congratulations() {
  clearInterval(interval);
  //var finalTime = timer.innerHTML;

  // show congratulations modal
  modal.classList.add("show");
  document.getElementById("popup").classList.add("match");
  document.getElementById("response").classList.add("match");

  // declare star rating variable
  //var starRating = document.querySelector(".stars").innerHTML;


  //showing move, rating, time on modal
  //document.getElementById("finalMove").innerHTML = moves;
  //document.getElementById("starRating").innerHTML = starRating;
  //document.getElementById("totalTime").innerHTML = finalTime;
  if (openedCards[0].type == "leaf") {
    document.getElementById("factOne").innerHTML = researching[z];
    document.getElementById("myImage").src = "img/nutrition.jpg";
    document.getElementsByTagName("H3")[0].innerHTML = "Do you eat food?";
  } else if (openedCards[0].type == "anchor") {
    document.getElementById("factOne").innerHTML = "Phytoplankton form the base of virtually every ocean food web. In short, they make most other ocean life possible.";
    document.getElementById("myImage").src = "img/phytoplankton.jpg";
  } else if (openedCards[0].type == "plane") {
    document.getElementById("factOne").innerHTML = "Nothing to see here!";
    document.getElementById("myImage").src = "img/worms.jpg";
  } else if (openedCards[0].type == "bolt") {
    document.getElementById("factOne").innerHTML = "The outbreaks of widespread diseases, such as SARS, Ebola, and malaria, are a result of changes in biodiversity.";
    document.getElementById("myImage").src = "img/ebola.jpg";
  } else if (openedCards[0].type == "cube") {
    document.getElementById("factOne").innerHTML = "Coral reefs act as a physical barrier to help protect our coasts!";
    document.getElementById("myImage").src = "img/coral_reef.jpg";
  } else if (openedCards[0].type == "bicycle") {
    document.getElementById("factOne").innerHTML = "Hiking, kayaking, and bicycling keep us healthy. They’re fun too! There would be fewer places to go and less to see without biodiversity!";
    document.getElementById("myImage").src = "img/hiking.jpg";
  } else if (openedCards[0].type == "diamond") {
    document.getElementById("factOne").innerHTML = "There can be 10,000 to 50,000 species in less than a teaspoon of soil. There are more microbes in a teaspoon of soil than there are people on the earth!";
    document.getElementById("myImage").src = "img/soil.jpg";
  } else if (openedCards[0].type == "bomb") {
    document.getElementById("factOne").innerHTML = "Urban trees help us convert carbon dioxide to oxygen through photosynthesis. They also filter pollutants in our air.";
    document.getElementById("myImage").src = "img/urban_trees.jpg";
  }
  setInterval(interval);
  //closeicon on modal
}


// @description close icon on modal
function closeModal() {
  modal.classList.remove("show");
  document.getElementById("popup").classList.remove("match");
  document.getElementById("response").classList.remove("match");
  startTimer();
}

// Will use later to create different levels of difficulty
// function changeGrid(){
//   var entry = document.createElement('li');
//   entry.className= 'card';
//   var list = document.getElementById('card-deck');
//   list.appendChild(entry);
// }

// loop to add event listeners to each card
for (var i = 0; i < cards.length; i++) {
  card = cards[i];
  card.addEventListener("click", displayCard);
  card.addEventListener("click", cardOpen);
  //card.addEventListener("click",congratulations);
};

$(document).ready(function() {
  $('#middle').click(function() {
    $('#middle').fadeOut();
    $('.deg0').addClass('card');
    $('.deg45').addClass('card');
    $('.deg90').addClass('card');
    $('.deg135').addClass('card');
    $('.deg180').addClass('card');
    $('.deg225').addClass('card');
    $('.deg270').addClass('card');
    $('.deg315').addClass('card');
    $('.deg0').removeClass('deg0');
    $('.deg45').removeClass('deg45');
    $('.deg90').removeClass('deg90');
    $('.deg135').removeClass('deg135');
    $('.deg180').removeClass('deg180');
    $('.deg225').removeClass('deg225');
    $('.deg270').removeClass('deg270');
    $('.deg315').removeClass('deg315');
    setTimeout(function() {
      $('#card-deck').removeClass("circle-container");
      $('#card-deck').addClass('deck');
      $('li').removeClass('circle-card');
      startGame();
    }, 5000);
  })
});