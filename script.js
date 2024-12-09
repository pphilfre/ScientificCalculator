import * as Keys from "./Keys.js";

// Cache DOM elements
const elements = {
  input: document.getElementById("inputDisplayText"),
  output: document.getElementById("outputDisplayText"),
  calculateButton: document.getElementById("equals"),
  clearButton: document.getElementById("AC"),
  delButton: document.getElementById("Del"),
  shiftButton: document.getElementById("shift"),
  isShiftActiveBox: document.getElementById("isShiftActiveBox"),
  alphaButton: document.getElementById("alpha"),
  isAlphaActiveBox: document.getElementById("isAlphaActiveBox"),
  resetButton: document.getElementById("nine"),
};

export let { input, output } = elements;
export let isShiftActive = false;
export let isAlphaActive = false;
let lastAction = ["", ""];
let answer = 0;
let answerJustOccurred = false;
let isInStandardForm = false;

// Initialise event listeners
[
  { el: elements.calculateButton, handler: calculate },
  { el: elements.clearButton, handler: clear },
  { el: elements.delButton, handler: delLastChar },
  { el: elements.shiftButton, handler: toggleShift },
  { el: elements.alphaButton, handler: toggleAlpha },
  { el: elements.resetButton, handler: resetData },
].forEach(({ el, handler }) => el.addEventListener("click", handler, false));

const storageKeys = [
  "memoryValue",
  "aValue",
  "bValue",
  "cValue",
  "dValue",
  "eValue",
  "fValue",
  "xValue",
  "yValue",
];

// Functions
function resetData() {
  if (!isShiftActive && !isAlphaActive) {
    if (answerJustOccurred) clear();
    updateLastAction("add", "9");
    appendToInput("9");
  } else if (isShiftActive && !isAlphaActive) {
    resetCalculatorState();
  }
}

function resetCalculatorState() {
  clear();
  storageKeys.forEach((key) => localStorage.setItem(key, "0"));
  deActivateShiftAndAlpha();
  isInStandardForm = false;
}

function toggleShift() {
  toggleMode("shift");
}

function toggleAlpha() {
  toggleMode("alpha");
}

function toggleMode(mode) {
  if (mode === "shift") {
    isShiftActive = !isShiftActive;
    isAlphaActive = false;
  } else {
    isAlphaActive = !isAlphaActive;
    isShiftActive = false;
  }

  elements.isShiftActiveBox.style.backgroundColor = isShiftActive ? "#000000" : "#86ad99";
  elements.isAlphaActiveBox.style.backgroundColor = isAlphaActive ? "#000000" : "#86ad99";
}

export function deActivateShiftAndAlpha() {
  isShiftActive = false;
  isAlphaActive = false;
  elements.isShiftActiveBox.style.backgroundColor = "#86ad99";
  elements.isAlphaActiveBox.style.backgroundColor = "#86ad99";
}

export function calculate() {
  try {
    let calculation = prepareCalculation(input.textContent);
    answer = evaluateCalculation(calculation);
    handleMemoryActions();
    output.textContent = isShiftActive ? parseFloat(answer).toPrecision(4) : answer;
    answerJustOccurred = true;
    deActivateShiftAndAlpha();
  } catch (err) {
    console.error(err);
    output.textContent = "Syntax Error";
  }
}

function prepareCalculation(calculation) {
  const replacements = [
    [/M[+-]?/g, ""],
    [/Ans/g, answer],
    [/÷/g, "/"],
    [/x/g, "*"],
    [/^/g, "**"],
    [/%/g, "/100"],
    [/π/g, Math.PI],
    [/e/g, Math.E],
    [/³/g, "**3"],
    [/²/g, "**2"],
    [/Ran#/g, Math.random().toPrecision(4)],
  ];

  storageKeys.forEach((key) =>
    replacements.push([new RegExp(key[0].toUpperCase(), "g"), localStorage.getItem(key)])
  );

  replacements.forEach(([regex, replacement]) => {
    calculation = calculation.replace(regex, replacement);
  });

  calculation = applyAdvancedMathFunctions(calculation);
  return calculation.replace(/(?<![*\/+\-\s√])\(/g, "*(");
}

function applyAdvancedMathFunctions(calculation) {
  const regexFunctions = [
    [/√\(([^)]+)\)/g, (match, num) => Math.sqrt(eval(num)).toPrecision(4)],
    [/∛\(([^)]+)\)/g, (match, num) => Math.cbrt(eval(num)).toPrecision(4)],
    [/sin\(([^)]+)\)/g, (match, num) => Math.sin(eval(num)).toPrecision(4)],
    // Add other advanced functions here
  ];

  regexFunctions.forEach(([regex, func]) => {
    calculation = calculation.replace(regex, func);
  });

  return calculation;
}

function evaluateCalculation(calculation) {
  return eval(calculation);
}

function handleMemoryActions() {
  const memoryValue = parseFloat(localStorage.getItem("memoryValue")) || 0;
  if (input.textContent.includes("M+")) {
    localStorage.setItem("memoryValue", memoryValue + answer);
  } else if (input.textContent.includes("M-")) {
    localStorage.setItem("memoryValue", memoryValue - answer);
  } else if (input.textContent.includes("M")) {
    output.textContent = `Memory: ${localStorage.getItem("memoryValue")}`;
  }
}

export function clear() {
  updateLastAction("remove", input.textContent);
  input.textContent = "";
  output.textContent = "";
  deActivateShiftAndAlpha();
}

function updateLastAction(action, value) {
  lastAction = [action, value];
}

function appendToInput(value) {
  input.textContent += value;
}
