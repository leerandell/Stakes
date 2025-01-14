// Element References
const betButtons = document.querySelectorAll('.bet-amount');
const allInButton = document.getElementById('allInButton');
const betButton = document.getElementById('betButton');
const balanceDisplay = document.getElementById('balanceDisplay');
const resultDisplay = document.getElementById('result');
const gameOverDisplay = document.getElementById('gameOver');
const resetButton = document.getElementById('resetButton');
const multiplierSlider = document.getElementById('multiplierSlider');
const multiplierValue = document.getElementById('multiplierValue');

// Initial Variables
let balance = 100.00;
let currentBet = 0;
let multiplier = 1.00;

// Update balance display
function updateBalance() {
    balanceDisplay.textContent = `Your current balance: $${balance.toFixed(2)}`;
}

// Generate a random multiplier
function generateRandomMultiplier() {
    const outcome = Math.random();
    if (outcome < 0.6) {
        multiplier = (Math.random() * 0.89) + 0.1; // Loss multiplier (0.1 - 0.99)
    } else {
        multiplier = (Math.random() * 0.9) + 1.1; // Win multiplier (1.1 - 2.0)
    }
    multiplierSlider.value = multiplier;
    multiplierValue.textContent = `${multiplier.toFixed(2)}x`;
}

// Clear all selected button states
function clearSelection() {
    betButtons.forEach(button => button.classList.remove('selected'));
    allInButton.classList.remove('selected');
}

// Handle individual bet buttons
betButtons.forEach(button => {
    button.addEventListener('click', () => {
        clearSelection();
        button.classList.add('selected');
        currentBet = parseFloat(button.dataset.bet);

        // Ensure the bet doesn't exceed the balance
        if (currentBet <= balance) {
            resultDisplay.textContent = `You chose to bet $${currentBet}. Good luck!`;
        } else {
            resultDisplay.textContent = `Insufficient funds for this bet.`;
        }
    });
});

// Handle All In button
allInButton.addEventListener('click', () => {
    clearSelection();
    allInButton.classList.add('selected');
    currentBet = balance; // Set the bet to the current balance
    resultDisplay.textContent = `You are betting all in: $${currentBet.toFixed(2)}. Good luck!`;
});

// Handle Bet action
betButton.addEventListener('click', () => {
    if (currentBet > 0 && currentBet <= balance) {
        generateRandomMultiplier();

        if (multiplier < 1) {
            const lossAmount = currentBet * multiplier;
            balance -= lossAmount;
            resultDisplay.textContent = `You lost $${lossAmount.toFixed(2)} with a multiplier of ${multiplier.toFixed(2)}. Better luck next time!`;
        } else {
            const winnings = currentBet * multiplier;
            balance += winnings;
            resultDisplay.textContent = `You won! You received $${winnings.toFixed(2)} with a multiplier of ${multiplier.toFixed(2)}.`;
        }

        updateBalance();

        if (balance < 1) {
            gameOverDisplay.textContent = "Game Over! You've run out of money.";
            gameOverDisplay.classList.remove('hidden');
            resetButton.classList.remove('hidden');
        }
    } else {
        resultDisplay.textContent = `Insufficient funds for this bet.`;
    }
});

// Reset the game
resetButton.addEventListener('click', () => {
    balance = 100.00;
    updateBalance();
    resultDisplay.textContent = "";
    gameOverDisplay.classList.add('hidden');
    resetButton.classList.add('hidden');
    multiplier = 1.00;
    multiplierSlider.value = multiplier;
    multiplierValue.textContent = `${multiplier.toFixed(2)}x`;
    clearSelection();
});

// Initialize balance on page load
updateBalance();
