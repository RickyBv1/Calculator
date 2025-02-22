//References
numericalButtons = Array.from(document.getElementsByClassName("number"));
operationalButtons = Array.from(document.getElementsByClassName("operation"));
screenElement = document.getElementById("screen");
operationIndicator = document.getElementById("operation-indicator");

//Other variables
let screen = 0;
let firstNumber;
let restartedNumber = false;

//Events
numericalButtons.forEach((button) => {
    button.addEventListener("click", (e) => 
        clickedNumber(parseFloat(e.target.textContent))
    )
});
operationalButtons.forEach((button) => {
    button.addEventListener("click", (e) =>
        clickedOperation(e.target.textContent)
    )
});
document.getElementById("clear").addEventListener("click", clearCurrentNumber);
document.getElementById("all-clear").addEventListener("click", reset);
document.getElementById("dot").addEventListener("click", dot);
document.addEventListener("keydown", (e) => {
    console.log(e)
    switch (e.key) {
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
            clickedNumber(parseFloat(e.key));
            break;
        case "+":
        case "-":
        case "*":
        case "/":
            clickedOperation(e.key);
            break;
        case "Enter": 
            clickedOperation("=");
            break;
        case "Backspace":
            clearCurrentNumber();
            break;
        case "Delete":
            reset();
            break;
        case ".":
            dot();
            break;
    }
})

//Functions
function clickedNumber(number) {
    if (restartedNumber) {
        screen = 0;
        restartedNumber = false;
    }
    screenNumber = parseFloat(screen);
    if (!isNaN(screenNumber)) {
        screen = parseFloat(screen.toString() + number);
        updateScreen();
    }
}

function clickedOperation(operation) {
    if (!firstNumber) {
        if (screen === 0) return;
        firstNumber = screen;
        operationIndicator.textContent = operation;
        updateScreen(0);
    } else {
        let result;
        switch (operationIndicator.textContent) {
            case "+":
                result = firstNumber + screen;
                break;
            case "-":
                result = firstNumber - screen;
                break;
            case "*":
                result = firstNumber * screen;
                break;
            case "/":
                if (screen === 0) {
                    result = 0;
                    break;
                }
                result = firstNumber / screen;
                break;
        }
        firstNumber = result;
        updateScreen(result);
        operationIndicator.textContent = operation;
        if (operation === "=") {
            operationIndicator.textContent = undefined;
            firstNumber = undefined;
        }
        restartedNumber = true;
    }
}

function updateScreen(message = screen) {
    screen = message;
    screenElement.textContent = screen;
}

function clearCurrentNumber() {
    updateScreen(0);
}

function reset() {
    clearCurrentNumber();
    (firstNumber = undefined),
    (operationIndicator.textContent = undefined);
}

function dot() {
    if (Number.isInteger(screen)) updateScreen(screen += ".");
}