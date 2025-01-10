let balance = 100; // Starting balance

document.getElementById("betButton").addEventListener("click", placeBet);

function displayBalance() {
    document.getElementById("balanceDisplay").innerText = `Your current balance: $${balance.toFixed(2)}`;
}

function placeBet() {
    const betInput = document.getElementById("betInput");
    let bet = parseFloat(betInput.value);

    if (isNaN(bet) || bet <= 0) {
        alert("Please enter a valid positive bet amount!");
        return;
    }

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

    // Calculate win or loss
    if (stakeMultiplier >= 1) {
        let winnings = bet * stakeMultiplier;
        document.getElementById("result").innerText += `\nCongratulations! You win $${winnings.toFixed(2)}.`;
        balance += winnings;
    } else {
        let loss = bet * stakeMultiplier;
        document.getElementById("result").innerText += `\nSorry, you lost $${loss.toFixed(2)}.`;
        balance -= loss;
    }

    displayBalance();

    // Check if player wants to continue
    if (balance <= 0) {
        document.getElementById("gameOver").innerText += '\nYou ran out of money. GGS!'
        document.getElementById("betButton").disabled = true;
    }

    // Clear the input field
    betInput.value = '';
}

// Initial display of balance
displayBalance();
