// Konfigurace hry
const cardValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const shuffledValues = [...cardValues, ...cardValues].sort(() => Math.random() - 0.5); // Zamíchání hodnot karet

let flippedCards = [];
let matchedCards = 0;
let gameBoard = document.getElementById('gameBoard');

// Funkce pro vytvoření karet
function createCard(value, index) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('data-index', index);
    card.dataset.value = value;

    card.addEventListener('click', flipCard);
    return card;
}

// Funkce pro otočení karty
function flipCard() {
    const card = this;
    if (flippedCards.length >= 2 || card.classList.contains('flipped') || card.classList.contains('matched')) return;

    card.classList.add('flipped');
    card.innerHTML = card.dataset.value;
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        setTimeout(checkMatch, 1000);
    }
}

// Funkce pro kontrolu shody
function checkMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.value === card2.dataset.value) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedCards++;
    } else {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        card1.innerHTML = '';
        card2.innerHTML = '';
    }

    flippedCards = [];
    if (matchedCards === cardValues.length) {
        alert('Gratulujeme, vyhráli jste!');
    }
}

// Funkce pro vykreslení herního pole
function setupGame() {
    shuffledValues.forEach((value, index) => {
        const card = createCard(value, index);
        gameBoard.appendChild(card);
    });
}

// Inicializace hry
setupGame();