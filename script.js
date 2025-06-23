const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

let currentInput = "";

function updateDisplay() {
  display.value = currentInput;
}

function calculate() {
  try {
    currentInput = eval(currentInput).toString();
  } catch (e) {
    currentInput = "Error";
  }
  updateDisplay();
}

function handleInput(key) {
  if (key === "Enter") {
    calculate();
  } else if (key === "Backspace") {
    currentInput = currentInput.slice(0, -1);
  } else if (key === "C") {
    currentInput = "";
  } else if ("0123456789.+-*/".includes(key)) {
    currentInput += key;
  }
  updateDisplay();
}

// Button click
buttons.forEach(button => {
  button.addEventListener("click", () => {
    handleInput(button.dataset.key);
  });
});

// Keyboard support
document.addEventListener("keydown", (e) => {
  handleInput(e.key);
});
