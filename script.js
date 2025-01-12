// Grab elements from the DOM
const betButtons = document.querySelectorAll('.bet-amount');
const allInButton = document.getElementById('allInButton');
const betButton = document.getElementById('betButton');
const balanceDisplay = document.getElementById('balanceDisplay');
const resultDisplay = document.getElementById('result');
const gameOverDisplay = document.getElementById('gameOver');
const resetButton = document.getElementById('resetButton');

let balance = 100.00;  // starting balance
let currentBet = 0;  // current bet amount

// Update the balance display
function updateBalance() {
    balanceDisplay.textContent = `Your current balance: $${balance.toFixed(2)}`;
}

// Handle regular bet button clicks
betButtons.forEach(button => {
    button.addEventListener('click', () => {
        currentBet = parseFloat(button.dataset.bet);
        if (currentBet <= balance) {
            resultDisplay.textContent = `You chose to bet $${currentBet}. Good luck!`;
        } else {
            resultDisplay.textContent = `Insufficient funds for this bet.`;
        }
    });
});

// Handle "All In" button click
allInButton.addEventListener('click', () => {
    currentBet = balance;
    resultDisplay.textContent = `You are betting all in: $${currentBet}. Good luck!`;
});

// Handle the actual placing of the bet
betButton.addEventListener('click', () => {
    if (currentBet > 0 && currentBet <= balance) {
        // Random outcome for simplicity, adjust to actual game logic
        const outcome = Math.random();
        const multiplier = 1 + (Math.random() * 2);  // Random multiplier between 1x and 3x

        // If outcome is above 0.5, player wins
        if (outcome > 0.5) {
            const winnings = currentBet * multiplier;
            balance += winnings;
            resultDisplay.textContent = `You won! You received $${winnings.toFixed(2)}.`;
        } else {
            balance -= currentBet;
            resultDisplay.textContent = `You lost your bet of $${currentBet}. Better luck next time!`;
        }

        // Update balance
        updateBalance();

        // Check if game over
        if (balance <= 0) {
            gameOverDisplay.textContent = "Game Over! You've run out of money.";
            gameOverDisplay.classList.remove('hidden');
            resetButton.classList.remove('hidden');
        }
    } else {
        resultDisplay.textContent = `Insufficient funds for this bet.`;
    }
});

// Reset game
resetButton.addEventListener('click', () => {
    balance = 100.00;  // Reset balance
    updateBalance();
    resultDisplay.textContent = "";
    gameOverDisplay.classList.add('hidden');
    resetButton.classList.add('hidden');
});
