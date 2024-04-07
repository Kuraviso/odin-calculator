class Calculator {
  constructor(previousOutputText, currentOutputText) {
    this.previousOutputText = previousOutputText;
    this.currentOutputText = currentOutputText;
    this.clear();
  }

  clear() {
    this.currentOutput = "";
    this.previousOutput = "";
    this.operation = undefined;
  }

  delete() {
    this.currentOutput = this.currentOutput.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && this.currentOutput.includes(".")) return;
    this.currentOutput = this.currentOutput.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOutput === "") return;
    if (this.previousOutput !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOutput = this.currentOutput;
    this.currentOutput = "";
  }

  compute() {
    let result;
    const prev = parseFloat(this.previousOutput);
    const current = parseFloat(this.currentOutput);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        result = prev + current;
        break;
      case "−":
        result = prev - current;
        break;
      case "×":
        result = prev * current;
        break;
      case "÷":
        result = prev / current;
        break;
      default:
        return;
    }
    this.currentOutput = result;
    this.operation = undefined;
    this.previousOutput = "";
  }

  updateDisplay() {
    this.currentOutputText.innerText = this.currentOutput;
    if (this.operation != null) {
      this.previousOutputText.innerText = `${this.previousOutput} ${this.operation}`;
    } else {
      this.previousOutputText.innerText = "";
    }
  }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-operator]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousOutputText = document.querySelector("[data-previous-output]");
const currentOutputText = document.querySelector("[data-current-output]");

const calculator = new Calculator(previousOutputText, currentOutputText);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
});

allClearButton.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});

document.addEventListener("keydown", (event) => {
  // Check if the key pressed is a number (0-9) or decimal point (.)
  if (!isNaN(event.key) || event.key === ".") {
    calculator.appendNumber(event.key);
    calculator.updateDisplay();
  }
  // Check if the key pressed is an operator (+, -, *, /)
  else if (["+", "-", "*", "/"].includes(event.key)) {
    let newKey;
    switch (event.key) {
      case "+":
        newKey = "+";
        break;
      case "-":
        newKey = "−";
        break;
      case "*":
        newKey = "×";
        break;
      case "/":
        newKey = "÷";
        break;
      default:
        return;
    }
    calculator.chooseOperation(newKey);
    calculator.updateDisplay();
  }
  // Check if the key pressed is the Enter key (=)
  else if (event.key === "Enter" || event.key === "=") {
    calculator.compute();
    calculator.updateDisplay();
  }
  // Check if the key pressed is the Escape key (AC)
  else if (event.key === "Escape") {
    calculator.clear();
    calculator.updateDisplay();
  }
  // Check if the key pressed is the Backspace key (DEL)
  else if (event.key === "Backspace") {
    calculator.delete();
    calculator.updateDisplay();
  }
});
