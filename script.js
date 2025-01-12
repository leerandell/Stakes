const betButtons = document.querySelectorAll('.bet-amount');
const allInButton = document.getElementById('allInButton');
const betButton = document.getElementById('betButton');
const balanceDisplay = document.getElementById('balanceDisplay');
const resultDisplay = document.getElementById('result');
const gameOverDisplay = document.getElementById('gameOver');
const resetButton = document.getElementById('resetButton');
const multiplierSlider = document.getElementById('multiplierSlider');
const multiplierValue = document.getElementById('multiplierValue');

let balance = 100.00;
let currentBet = 0;
let multiplier = 1.00;

function updateBalance() {
    balanceDisplay.textContent = `Your current balance: $${balance.toFixed(2)}`;
}

function generateRandomMultiplier() {
    multiplier = Math.random() * (2 - 1) + 1; // Random multiplier between 1 and 2
    multiplierSlider.value = (multiplier - 1).toFixed(2); // Adjust the slider (0 to 1 range)
    multiplierValue.textContent = `${multiplier.toFixed(2)}x`;
}

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

allInButton.addEventListener('click', () => {
    currentBet = balance;
    resultDisplay.textContent = `You are betting all in: $${currentBet}. Good luck!`;
});

betButton.addEventListener('click', () => {
    if (currentBet > 0 && currentBet <= balance) {
        generateRandomMultiplier();
        const outcome = Math.random();

        if (outcome > 0.5) {
            const winnings = currentBet * multiplier;
            balance += winnings;
            resultDisplay.textContent = `You won! You received $${winnings.toFixed(2)}.`;
        } else {
            balance -= currentBet;
            resultDisplay.textContent = `You lost your bet of $${currentBet}. Better luck next time!`;
        }

        updateBalance();

        if (balance <= 0) {
            gameOverDisplay.textContent = "Game Over! You've run out of money.";
            gameOverDisplay.classList.remove('hidden');
            resetButton.classList.remove('hidden');
        }
    } else {
        resultDisplay.textContent = `Insufficient funds for this bet.`;
    }
});

resetButton.addEventListener('click', () => {
    balance = 100.00;
    updateBalance();
    resultDisplay.textContent = "";
    gameOverDisplay.classList.add('hidden');
    resetButton.classList.add('hidden');
    multiplier = 1.00;
    multiplierSlider.value = 0;
    multiplierValue.textContent = `${multiplier.toFixed(2)}x`;
});

updateBalance();
