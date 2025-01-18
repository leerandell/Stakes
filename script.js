const betButtons = document.querySelectorAll('.bet-amount');
const allInButton = document.getElementById('allInButton');
const betButton = document.getElementById('betButton');
const balanceDisplay = document.getElementById('balanceDisplay');
const resultDisplay = document.getElementById('result');
const gameOverDisplay = document.getElementById('gameOver');
const resetButton = document.getElementById('resetButton');
const multiplierSlider = document.getElementById('multiplierSlider');
const multiplierValue = document.getElementById('multiplierValue');


let balance = 100.0;
let currentBet = 0;
let multiplier = 1.0;

function updateBalance() {
    balanceDisplay.textContent = `Your current balance: $${balance.toFixed(2)}`;
}

function generateRandomMultiplier() {
    const outcome = Math.random();
    multiplier = outcome < 0.6 
        ? (Math.random() * 0.89) + 0.1
        : (Math.random() * 0.9) + 1.1;
    multiplierSlider.value = multiplier;
    multiplierValue.textContent = `${multiplier.toFixed(2)}x`;
}

function clearSelection() {
    betButtons.forEach(button => button.classList.remove('selected'));
    allInButton.classList.remove('selected');
}

function showResult(message, outcomeClass = "") {
    resultDisplay.className = `result ${outcomeClass}`;
    resultDisplay.textContent = message;
    resultDisplay.style.display = "block";
}

betButtons.forEach(button => {
    button.addEventListener('click', () => {
        clearSelection();
        button.classList.add('selected');
        currentBet = parseFloat(button.dataset.bet);

        if (currentBet <= balance) {
            showResult(`You chose to bet $${currentBet}. Good luck!`, "bet-choice");
        } else {
            showResult(`Insufficient funds for this bet.`, "error");
        }
    });
});

allInButton.addEventListener('click', () => {
    clearSelection();
    allInButton.classList.add('selected');
    currentBet = balance;
    showResult(`You are betting all in: $${currentBet.toFixed(2)}. Good luck!`, "bet-choice");
});

function showResult(message, outcomeClass = "") {
    resultDisplay.className = `result ${outcomeClass}`;
    resultDisplay.innerHTML = message; // Use innerHTML to render HTML tags
    resultDisplay.style.display = "block";
}

betButton.addEventListener('click', () => {
    if (currentBet > 0 && currentBet <= balance) {
        generateRandomMultiplier();

        if (multiplier < 1) {
            const lossAmount = currentBet * multiplier;
            balance -= lossAmount;
            showResult(`YOU LOST.<br> YOU LOST $${lossAmount.toFixed(2)} with a multiplier of ${multiplier.toFixed(2)}.`, "lose");
        } else {
            const winnings = currentBet * multiplier;
            balance += winnings;
            showResult(`YOU WON!<br>You received $${winnings.toFixed(2)} with a multiplier of ${multiplier.toFixed(2)}.`, "win");
            // Trigger confetti when the player wins
            import('https://cdn.skypack.dev/canvas-confetti').then(confetti => {
                confetti.default();
            });
        }

        updateBalance();

        if (balance < 1) {
            gameOverDisplay.textContent = "Game Over! You've run out of money.";
            gameOverDisplay.classList.remove('hidden');
            resetButton.classList.remove('hidden');
        }
    } else {
        showResult(`Insufficient funds for this bet.`, "error");
    }
});


resetButton.addEventListener('click', () => {
    balance = 100.0;
    updateBalance();
    resultDisplay.style.display = "none";
    gameOverDisplay.classList.add('hidden');
    resetButton.classList.add('hidden');
    multiplier = 1.0;
    multiplierSlider.value = multiplier;
    multiplierValue.textContent = `${multiplier.toFixed(2)}x`;
    clearSelection();
});

updateBalance();
