//References
const numericalButtons = Array.from(document.getElementsByClassName("number"));
const operationalButtons = Array.from(document.getElementsByClassName("operation"));
const screenElement = document.getElementById("screen");
const operationIndicator = document.getElementById("operation-indicator");

//Other variables
let firstNumber;
let restartedNumber = false;

//Events
numericalButtons.forEach(button => button.addEventListener("click", (e) => clickedNumber(e.target.textContent)));
operationalButtons.forEach(button => button.addEventListener("click", (e) => clickedOperation(e.target.textContent)));
document.getElementById("dot").addEventListener("click", dot);
document.getElementById("clear").addEventListener("click", clear);
document.getElementById("all-clear").addEventListener("click", allClear);

//Functions
function clickedNumber(number) {
    if (restartedNumber) {
        screenElement.textContent = parseFloat(number);
    } else {
        screenElement.textContent = parseFloat(screenElement.textContent + number);
    }
}

function clickedOperation(operation) {
    if (!firstNumber) {
        if (screenElement.textContent === "0") return;
        firstNumber = parseFloat(screenElement.textContent);
    } else {
        let result;
        switch (operationIndicator.textContent) {
            case "+":
                result = firstNumber + parseFloat(screenElement.textContent);
                break;
            case "-":
                result = firstNumber - parseFloat(screenElement.textContent);
                break;
            case "*":
                result = firstNumber * parseFloat(screenElement.textContent);
                break;
            case "/":
                if (screenElement.textContent === "0") {
                    result = 0;
                    break;
                }
                result = firstNumber / parseFloat(screenElement.textContent);
                break;
        }
        screenElement.textContent = result;
        firstNumber = result;
    }
    restartedNumber = true;
    operationIndicator.textContent = operation;
    console.log(operation, firstNumber);
}

function dot() {
    if (Number.isInteger(parseFloat(screenElement.textContent))) {
        screenElement.textContent += ".";
    }
}

function clear() {
    screenElement.textContent = 0;
}

function allClear() {
    clear();
    firstNumber = 0
    operationIndicator.textContent = undefined;
}