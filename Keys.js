import * as script from "./script.js";
import {
  calculate,
  clear,
  deActivateShiftAndAlpha,
  input,
  isAlphaActive,
  isShiftActive,
  output,
} from "./script.js";

const buttonActions = {
  multiply: { base: "x", shift: "P" },
  divide: { base: "\u00F7", shift: "C" },
  add: { base: "+", shift: "Pol(" },
  subtract: { base: "-", shift: "Rec(" },
  sin: { base: "sin(", shift: "sin\u207B\u00B9(" },
  cos: { base: "cos(", shift: "cos\u207B\u00B9(" },
  tan: { base: "tan(", shift: "tan\u207B\u00B9(" },
  log: { base: "log(", shift: null },
  ln: { base: "ln(", shift: "e^" },
  exponent: { base: "^" },
  square: { base: "\u00B2" },
  root: { base: "\u221A(", shift: "\u221B(" },
  random: { base: ".", shift: "Ran#", alpha: "RanInt#(" },
  memory: { base: "M+", shift: "M-", alpha: "M" },
};

const addActionToInput = (action) => {
  if (action) {
    input.textContent += action;
    window.lastAction = ["add", action];
    window.answerJustOccurred = false;
    window.isStoring = false;
    deActivateShiftAndAlpha();
  }
};

const handleButtonClick = (buttonId) => {
  const { base, shift, alpha } = buttonActions[buttonId] || {};
  const action = isShiftActive ? shift : isAlphaActive ? alpha : base;
  addActionToInput(action);
};

Object.keys(buttonActions).forEach((id) => {
  const element = document.getElementById(id);
  if (element) {
    element.addEventListener("click", () => handleButtonClick(id), false);
  }
});

const staticActions = [
  { id: "Ans", func: () => addActionToInput("Ans") },
  { id: "10x", func: () => addActionToInput("x10^") },
  { id: "ENG", func: showEngineeringNotation },
  { id: "SD", func: changeFormat },
  { id: "DMS", func: getDMS },
  { id: "x-1", func: factorialFunction },
];

staticActions.forEach(({ id, func }) => {
  const element = document.getElementById(id);
  if (element) {
    element.addEventListener("click", func, false);
  }
});

export function factorial(x) {
  return x <= 1 ? 1 : x * factorial(x - 1);
}

function showEngineeringNotation() {
  if (window.answerJustOccurred) {
    const content = script.isInStandardForm
      ? output.textContent
      : standardForm(window.answer);
    output.textContent = content;
    script.isInStandardForm = !script.isInStandardForm;
  }
  deActivateShiftAndAlpha();
}

function changeFormat() {
  const currentOutput = parseFloat(output.textContent);
  if (isNaN(currentOutput)) return;
  output.textContent = output.textContent.includes("/")
    ? parseFloat(currentOutput.split("/")[0])
    : currentOutput.toFixed(10);
}

function getDMS() {
  addActionToInput(isShiftActive ? "B" : "\u00B0");
}

function factorialFunction() {
  addActionToInput(isShiftActive ? "!" : "\u207B\u00B9");
}

function standardForm(num) {
  let exponent = 0;
  const offset = script.engineeringNotationOffset || 1;
  while (num >= 10 * offset) {
    num /= 10;
    exponent++;
  }
  while (num < offset) {
    num *= 10;
    exponent--;
  }
  return `${num.toFixed(4)}x10^${exponent}`;
}
