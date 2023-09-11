let displayValue = '0';
let inputExpression = ''; // Track the input expression

function updateDisplay() {
    document.getElementById('input-expression').innerText = inputExpression;
    document.getElementById('output-value').innerText = displayValue;
}

function appendToDisplay(value) {
    if (displayValue === '0' && value !== '.') {
        displayValue = value;
    } else {
        displayValue += value;
    }
    updateDisplay();
}

function clearDisplay() {
    displayValue = '0';
    inputExpression = ''; // Clear the input expression
    updateDisplay();
}

function backspace() {
    displayValue = displayValue.slice(0, -1);
    if (displayValue === '') {
        displayValue = '0';
    }
    updateDisplay();
}

function toggleSign() {
    if (displayValue !== '0') {
        if (displayValue.startsWith('-')) {
            displayValue = displayValue.substring(1);
        } else {
            displayValue = '-' + displayValue;
        }
        updateDisplay();
    }
}

function calculate() {
    try {
        const result = eval(displayValue);
        inputExpression = displayValue; // Store the input expression
        displayValue = result.toString();
        updateDisplay();
    } catch (error) {
        displayValue = 'Error';
        inputExpression = ''; // Clear the input expression on error
        updateDisplay();
    }
}

function DisplayAnswer() {
    displayValue = '42'; // Replace with the logic to get the answer
    updateDisplay();
}

// Add event listener to clear display on load
window.addEventListener('load', clearDisplay);
