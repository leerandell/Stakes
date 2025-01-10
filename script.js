let balance = 100; // Starting balance
const MIN_BET = 1;
const MAX_BET = 50000;

document.getElementById("betButton").addEventListener("click", placeBet);
document.getElementById("resetButton").addEventListener("click", resetGame);

function displayBalance() {
    document.getElementById("balanceDisplay").innerText = `Your current balance: $${balance.toFixed(2)}`;
}

function placeBet() {
    const betInput = document.getElementById("betInput");
    let bet = parseFloat(betInput.value);

    // Validate bet amount
    if (isNaN(bet) || bet <= 0) {
        alert("Please enter a valid positive bet amount!");
        return;
    }

    // Check if bet is within the allowed range
    if (bet < MIN_BET || bet > MAX_BET) {
        alert(`Please enter a bet between $${MIN_BET} and $${MAX_BET}.`);
        return;
    }

    // Check if the bet exceeds the balance
    if (bet > balance) {
        alert("You can't bet more than your current balance!");
        return;
    }

    // Adjusting the multiplier probability:
    let stakeMultiplier;
    if (Math.random() < 0.62) {
        // House wins (multiplier < 1.00x)
        stakeMultiplier = (Math.random() * (0.99 - 0.01) + 0.01).toFixed(2);
    } else {
        // Player wins (multiplier >= 1.00x)
        stakeMultiplier = (Math.random() * (2.00 - 1.00) + 1.00).toFixed(2);
    }

    // Display the result
    document.getElementById("result").innerText = `The stake multiplier is: ${stakeMultiplier}x`;

    // Update the slider to reflect the multiplier
    const slider = document.getElementById("multiplierSlider");
    slider.value = stakeMultiplier;  // Update the slider's value based on the multiplier

    // Update the multiplier display
    document.getElementById("multiplierValue").innerText = stakeMultiplier + "x";

    // Calculate win or loss
    let winningsOrLoss;
    if (stakeMultiplier >= 1) {
        winningsOrLoss = bet * stakeMultiplier;
        document.getElementById("result").innerText += `\nCongratulations! You win $${winningsOrLoss.toFixed(2)}.`;
        balance += winningsOrLoss;
    } else {
        winningsOrLoss = bet * stakeMultiplier;
        document.getElementById("result").innerText += `\nSorry, you lost $${winningsOrLoss.toFixed(2)}.`;
        balance -= winningsOrLoss;
    }

    displayBalance();

    // Check if player wants to continue
    if (balance <= 0) {
        document.getElementById("gameOver").innerText = 'You ran out of money. GGS!';
        document.getElementById("betButton").disabled = true;
        document.getElementById("resetButton").style.display = 'inline'; // Show reset button
    }

    // Clear the input field
    betInput.value = '';
}

// Reset game after losing all balance
function resetGame() {
    balance = 100; // Reset balance
    document.getElementById("gameOver").innerText = '';
    document.getElementById("betButton").disabled = false;
    displayBalance();
    document.getElementById("resetButton").style.display = 'none'; // Hide reset button

    // Reset the slider to the middle (default) and the multiplier display
    const slider = document.getElementById("multiplierSlider");
    slider.value = 1;
    document.getElementById("multiplierValue").innerText = "1.00x";
}

// Initial display of balance
displayBalance();
