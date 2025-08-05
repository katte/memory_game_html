const gameBoard = document.getElementById("game-board");
const statusText = document.getElementById("status");

const totalPairs = 18;
let cardsArray = [];
for (let i = 1; i <= totalPairs; i++) {
  cardsArray.push(`images/img${i}.png`);
  cardsArray.push(`images/img${i}.png`);
}

// Algoritmo Fisher–Yates per uno shuffle migliore
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

cardsArray = shuffle(cardsArray);

let flippedCards = [];
let matchedCards = 0;

function createBoard() {
  cardsArray.forEach((img) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.image = img;

    const fill = document.createElement("div");
    fill.classList.add("card-fill");

    const inner = document.createElement("div");
    inner.classList.add("card-inner");

    const front = document.createElement("div");
    front.classList.add("card-front");

    const back = document.createElement("div");
    back.classList.add("card-back");
    back.style.backgroundImage = `url(${img})`;

    inner.appendChild(front);
    inner.appendChild(back);
    card.appendChild(fill);
    card.appendChild(inner);

    card.addEventListener("click", flipCard);
    gameBoard.appendChild(card);
  });
}

function flipCard() {
  if (this.classList.contains("flipped") || flippedCards.length >= 2) return;
  this.classList.add("flipped");
  flippedCards.push(this);

  if (flippedCards.length === 2) {
    setTimeout(checkMatch, 800);
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;
  if (card1.dataset.image === card2.dataset.image) {
    matchedCards += 1;
    card1.removeEventListener("click", flipCard);
    card2.removeEventListener("click", flipCard);

    setTimeout(() => {
      card1.classList.add("hidden");
      card2.classList.add("hidden");
    }, 400);

    if (matchedCards === totalPairs) {
      statusText.textContent = "Hai vinto!";
      gameBoard.classList.add("win");
    }
  } else {
    card1.classList.remove("flipped");
    card2.classList.remove("flipped");
  }
  flippedCards = [];
}

createBoard();
