const cardsContainer = document.getElementById('cards');
const scoreDisplay = document.getElementById('score');
const timeDisplay = document.getElementById('time');
const startButton = document.getElementById('start');
const resultBox = document.getElementById('resultBox');
const finalScore = document.getElementById('finalScore');
const finalTime = document.getElementById('finalTime');

let score = 0;
let time = 0;
let intervalId;
let flippedCards = []; 
let matchedCards = [];  

// Larger set of emojis
const allEmojis = ['🍎', '🍌', '🍒', '💊', '🍓', '🍉', '😒', '🍬','🧁','🩸','😉','❤️','😁','👍','👌','🍟','🍔', '🥭', '🥑', '🍒', '🍉', '🍓', '🍍', '🥭', '🍎', '🍊', '🍌', '🍒', '🍓', '🍇', '😢', '😜', '🍶'];

// Maximum number of emoji pairs
const emojiPairs = 10;

startButton.addEventListener('click', startGame);

function startGame() {
  score = 0;
  time = 0;
  scoreDisplay.textContent = 'Score: 0';
  timeDisplay.textContent = 'Time: 0:00';
  clearInterval(intervalId);
  intervalId = setInterval(updateTime, 1000);
  createCards();
  startButton.disabled = true;
  resultBox.style.display = 'none'; // Hide result box when starting a new game
}

function createCards() {
  cardsContainer.innerHTML = '';

  // Get a random subset of emojis
  const selectedEmojis = getRandomEmojis();
  
  // Shuffle the emojis and create the cards
  const cardArray = shuffleArray(selectedEmojis.concat(selectedEmojis)); 
  cardArray.forEach(emoji => {
    const card = document.createElement('div');
    card.classList.add('card');

    const emojiDiv = document.createElement('div');
    emojiDiv.classList.add('emoji');
    emojiDiv.textContent = emoji;
    emojiDiv.style.display = 'none'; 

    card.appendChild(emojiDiv);
    card.addEventListener('click', flipCard);
    cardsContainer.appendChild(card);
  });
}

function getRandomEmojis() {
  // Shuffle the full list of emojis and select a subset for the game
  const shuffledEmojis = shuffleArray(allEmojis);
  return shuffledEmojis.slice(0, emojiPairs);  // Get a subset of emojis for the game
}

function flipCard() {
  if (flippedCards.length < 2 && !flippedCards.includes(this) && !matchedCards.includes(this)) {
    this.classList.add('flipped');
    const emojiDiv = this.querySelector('.emoji');
    emojiDiv.style.display = 'block'; 
    flippedCards.push(this);  

    if (flippedCards.length === 2) {
      setTimeout(checkMatch, 1000);  // Wait for a second before checking the match
    }
  }
}

function checkMatch() {
  const firstCardEmoji = flippedCards[0].querySelector('.emoji').textContent;
  const secondCardEmoji = flippedCards[1].querySelector('.emoji').textContent;

  if (firstCardEmoji === secondCardEmoji) {
    // If they match, add them to matchedCards using push
    matchedCards.push(flippedCards[0], flippedCards[1]);
    flippedCards[0].classList.add('matched');
    flippedCards[1].classList.add('matched');
    score++;
    scoreDisplay.textContent = 'Score: ' + score;
  } else {
    // If they don't match, flip them back
    flippedCards[0].classList.remove('flipped');
    flippedCards[1].classList.remove('flipped');
    flippedCards[0].querySelector('.emoji').style.display = 'none'; // Hide emoji again
    flippedCards[1].querySelector('.emoji').style.display = 'none'; // Hide emoji again
  }

  // Remove both cards from flippedCards using pop
  flippedCards.pop();
  flippedCards.pop();

  if (matchedCards.length === emojiPairs * 2) {
    clearInterval(intervalId);
    finalScore.textContent = 'Final Score: ' + score;
    finalTime.textContent = 'Time: ' + timeDisplay.textContent;
    resultBox.style.display = 'block'; // Show the result box
    startButton.disabled = false;
  }
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function updateTime() {
  time++;
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  timeDisplay.textContent = 'Time: ' + minutes + ':' + (seconds < 10 ? '0' + seconds : seconds);
}
