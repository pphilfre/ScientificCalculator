import * as Keys from "./Keys.js";

export let input = document.getElementById("inputDisplayText");
export let output = document.getElementById("outputDisplayText");

let calculateButton = document.getElementById("equals");
calculateButton.addEventListener("click", calculate, false);

let clearButton = document.getElementById("AC");
clearButton.addEventListener("click", clear, false);

let delButton = document.getElementById("Del");
delButton.addEventListener("click", delLastChar, false);
window.lastAction = ["", ""];

let shiftButton = document.getElementById("shift");
let isShiftActiveBox = document.getElementById("isShiftActiveBox");
shiftButton.addEventListener("click", activateShift, false);
export let isShiftActive = false;

let alphaButton = document.getElementById("alpha");
let isAlphaActiveBox = document.getElementById("isAlphaActiveBox");
alphaButton.addEventListener("click", activateAlpha, false);
export let isAlphaActive = false;

let reset = document.getElementById("nine");
reset.addEventListener("click", resetData, false);

function resetData() {
  if (!isShiftActive && !isAlphaActive) {
    if (answerJustOccurred) {
      clear();
    }
    lastAction[0] = "add";
    lastAction[1] = "9";
    input.textContent += "9";
    answerJustOccurred = false;
  } else if (isShiftActive && !isAlphaActive) {
    input.textContent = "";
    output.textContent = "";
    answer = 0;
    lastAction = ["", ""];
    answerJustOccurred = false;
    localStorage.setItem("memoryValue", "0");
    localStorage.setItem("aValue", "0");
    localStorage.setItem("bValue", "0");
    localStorage.setItem("cValue", "0");
    localStorage.setItem("dValue", "0");
    localStorage.setItem("eValue", "0");
    localStorage.setItem("fValue", "0");
    localStorage.setItem("xValue", "0");
    localStorage.setItem("yValue", "0");
    deActivateShiftAndAlpha();
    engineeringNotationOffset = 1;
    isInStandardForm = false;
  }
}

function activateShift() {
  isShiftActive = !isShiftActive;
  isAlphaActive = false;
  if (isShiftActive) {
    isShiftActiveBox.style.backgroundColor = "#000000";
    isAlphaActiveBox.style.backgroundColor = "#86ad99";
  } else {
    isShiftActiveBox.style.backgroundColor = "#86ad99";
  }
  isStoring = false;
}

function activateAlpha() {
  isAlphaActive = !isAlphaActive;
  isShiftActive = false;
  if (isAlphaActive) {
    isAlphaActiveBox.style.backgroundColor = "#000000";
    isShiftActiveBox.style.backgroundColor = "#86ad99";
  } else {
    isAlphaActiveBox.style.backgroundColor = "#86ad99";
  }
  isStoring = false;
}

export function deActivateShiftAndAlpha() {
  isShiftActive = false;
  isAlphaActive = false;
  isShiftActiveBox.style.backgroundColor = "#86ad99";
  isAlphaActiveBox.style.backgroundColor = "#86ad99";
}

export function calculate() {
  let calculation = input.textContent

    .replace("M+", "")
    .replace("M-", "")
    .replace("M", "")

    .replace("(-)", "-")

    .replace("÷", "/")
    .replace("Ans", answer)
    .replace(/min\((\d+),\s*(\d+)\)/g, (match, num1, num2) => {
      num1 = parseFloat(num1);
      num2 = parseFloat(num2);
      return Math.min(num1, num2);
    })
    .replace(/max\((\d+),\s*(\d+)\)/g, (match, num1, num2) => {
      num1 = parseFloat(num1);
      num2 = parseFloat(num2);
      return Math.max(num1, num2);
    })
    .replace("x", "*")
    .replace("^", "**")
    .replace("%", "/100")
    .replace("π", String(Math.PI))
    .replace("A", localStorage.getItem("aValue"))
    .replace("B", localStorage.getItem("bValue"))
    .replace("ℂ", localStorage.getItem("cValue"))
    .replace("D", localStorage.getItem("dValue"))
    .replace("E", localStorage.getItem("eValue"))
    .replace("F", localStorage.getItem("fValue"))

    .replace("𝑥", localStorage.getItem("xValue"))

    .replace("y", localStorage.getItem("yValue"))
    .replace("³", "**3")
    .replace("²", "**2")
    .replace(/√\(([^)]+)\)/g, (match, num) => {
      try {
        return Math.sqrt(eval(num)).toPrecision(4);
      } catch (err) {
        return "Syntax Error";
      }
    })
    .replace(/∛\(([^]+)\)/g, (match, num) => {
      try {
        return Math.cbrt(eval(num)).toPrecision(4);
      } catch (err) {
        return "Syntax Error";
      }
    })

    .replace(/sin\(([^)]+)\)/g, (match, num) => {
      try {
        return Math.sin(eval(num)).toPrecision(4);
      } catch (err) {
        return "Syntax Error";
      }
    })
    .replace(/sin⁻¹\(([^)]+)\)/g, (match, num) => {
      try {
        return Math.asin(eval(num)).toPrecision(4);
      } catch (err) {
        return "Syntax Error";
      }
    })
    .replace(/cos\(([^)]+)\)/g, (match, num) => {
      try {
        return Math.cos(eval(num)).toPrecision(4);
      } catch (err) {
        return "Syntax Error";
      }
    })
    .replace(/cos⁻¹\(([^)]+)\)/g, (match, num) => {
      try {
        return Math.acos(eval(num)).toPrecision(4);
      } catch (err) {
        return "Syntax Error";
      }
    })
    .replace(/tan\(([^)]+)\)/g, (match, num) => {
      try {
        return Math.tan(eval(num)).toPrecision(4);
      } catch (err) {
        return "Syntax Error";
      }
    })
    .replace(/tan⁻¹\(([^)]+)\)/g, (match, num) => {
      try {
        return Math.atan(eval(num)).toPrecision(4);
      } catch (err) {
        return "Syntax Error";
      }
    })
    .replace("⁻¹", "**-1")
    .replace(/Rec\((\d+),\s*(\d+)\)/g, (match, num1, num2) => {
      num1 = parseFloat(num1);
      num2 = parseFloat(num2);
      let angleInRadians = num2 * (Math.PI / 180);
      let x = num1 * Math.cos(angleInRadians).toPrecision(7);
      let y = (num1 * Math.sin(angleInRadians)).toPrecision(7);
      return `"x = ${x}, y = ${y}"`;
    })
    .replace("e", String(Math.E))
    .replace(/RanInt#\((\d+),\s*(\d+)\)/g, (match, min, max) => {
      min = parseInt(min);
      max = parseInt(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    })
    .replace(/Rnd\(([^,]+),\s*([^,]+)\)/g, (match, num, precision) => {
      num = eval(num);
      precision = parseInt(precision);
      if (!isNaN(num) && !isNaN(precision)) {
        return num.toFixed(precision);
      }
    })

    .replace(/Pol\((\d+),\s*(\d+)\)/g, (match, num1, num2) => {
      num1 = parseFloat(num1);
      num2 = parseFloat(num2);
      let r = Math.sqrt(num1 ** 2 + num2 ** 2).toFixed(4);
      let theta = (Math.atan2(num2, num1) * (180 / Math.PI)).toFixed(4);
      return `"r = ${r}, θ = ${theta}"`;
    })
    .replace(/(\d+)\s*P\s*(\d+)/g, (match, num1, num2) => {
      num1 = parseInt(num1);
      num2 = parseInt(num2);
      try {
        return Keys.factorial(num1) / Keys.factorial(num1 - num2);
      } catch (err) {
        return "Syntax Error";
      }
    })
    .replace(/(\d+)\s*C\s*(\d+)/g, (match, num1, num2) => {
      num1 = parseInt(num1);
      num2 = parseInt(num2);
      return (
        Keys.factorial(num1) /
        (Keys.factorial(num2) * Keys.factorial(num1 - num2))
      );
    })
    .replace(/(\d+)!/g, (match, num) => {
      num = parseInt(num);
      return Keys.factorial(num);
    })
    .replace(/log\((\d+)\)/g, (match, num) => {
      try {
        num = parseInt(num);
        return Math.log(num) / Math.log(10);
      } catch (err) {
        return "Syntax Error";
      }
    })
    .replace(/log\((\d+),\s*(\d+)\)/g, (match, base, num) => {
      try {
        base = parseInt(base);
        num = parseInt(num);
        return Math.log(num) / Math.log(base);
      } catch (err) {
        return "Syntax Error";
      }
    })
    .replace(/ln\((\d+)\)/g, (match, num) => {
      try {
        num = parseInt(num);
        return Math.log(num) / Math.log(Math.E);
      } catch (err) {
        return "Syntax Error";
      }
    })
    .replace(/abs\(([^)]+)\)/g, (match, num) => {
      try {
        return Math.abs(eval(num));
      } catch (err) {
        return "Syntax Error";
      }
    })
    .replace(/sign\(([^)]+)\)/g, (match, num) => {
      try {
        num = parseFloat(num);
        return Math.sign(num);
      } catch (err) {
        return "Syntax Error";
      }
    })

    .replace("Ran#", String(Math.random().toPrecision(4)))
    .replace(/(?<![*\/+\-\s√])\(/g, "*(");

  lastAction[0] = "";
  lastAction[1] = "";

  try {
    console.log("Computer Calculation: " + calculation);

    if (calculation.includes("°")) {
      let parts = calculation.split("°");
      let beforeDegrees = parts[0].trim();
      let afterDegrees = parts.slice(1).join("°").trim();

      let degreesValue = eval(beforeDegrees);
      let degrees = Math.floor(degreesValue);
      let minutesDecimal = (degreesValue - degrees) * 60;
      let minutes = Math.floor(minutesDecimal);
      let seconds = ((minutesDecimal - minutes) * 60).toFixed(2);

      let dmsResult = `${degrees}° ${minutes}' ${seconds}"`;

      if (afterDegrees) {
        calculation = dmsResult + afterDegrees;
        answer = eval(calculation);
      } else {
        answer = dmsResult;
      }

      output.textContent = answer;
    } else {
      answer = eval(calculation);
    }

    if (isShiftActive) {
      answer = parseFloat(answer).toPrecision(4);
    }

    if (
      localStorage.getItem("memoryValue") === null ||
      isNaN(localStorage.getItem("memoryValue"))
    ) {
      localStorage.setItem("memoryValue", "0");
    }

    if (input.textContent.includes("M+")) {
      let currentMemoryValue =
        parseFloat(localStorage.getItem("memoryValue")) || 0;
      let newMemoryValue = currentMemoryValue + answer;
      localStorage.setItem("memoryValue", newMemoryValue);
      output.textContent = "Memory: " + localStorage.getItem("memoryValue");
    } else if (input.textContent.includes("M-")) {
      let currentMemoryValue = parseFloat(localStorage.getItem("memoryValue"));
      let newMemoryValue = currentMemoryValue - answer;
      localStorage.setItem("memoryValue", newMemoryValue);
      output.textContent = "Memory: " + localStorage.getItem("memoryValue");
    } else if (input.textContent.includes("M")) {
      output.textContent = "Memory: " + localStorage.getItem("memoryValue");
    } else {
      output.textContent = answer;
    }
    if (isStoring) {
      return answer;
    }
  } catch (err) {
    console.error(err);
    output.textContent = "Syntax Error";
  }
  isInStandardForm = false;
  answerJustOccurred = true;
  deActivateShiftAndAlpha();
}

export function clear() {
  lastAction[0] = "remove";
  lastAction[1] = `${input.textContent}`;
  input.textContent = "";
  output.textContent = "";
  deActivateShiftAndAlpha();
  engineeringNotationOffset = 1;
  isInStandardForm = false;
}

export function clearOutput() {
  output.textContent = "";
  isAlphaActive = false;
  isShiftActive = false;
}

function delLastChar() {
  if (!isShiftActive && !isAlphaActive) {
    if (input.textContent.endsWith("𝑥")) {
      input.textContent = input.textContent.slice(0, -2);
      lastAction[0] = "remove";
      lastAction[1] = "𝑥";
    } else if (input.textContent.endsWith("sign(")) {
      input.textContent = input.textContent.slice(0, -5);
      lastAction[0] = "remove";
      lastAction[1] = "sign(";
    } else if (input.textContent.endsWith("min(")) {
      input.textContent = input.textContent.slice(0, -4);
      lastAction[0] = "remove";
      lastAction[1] = "min(";
    } else if (input.textContent.endsWith("abs(")) {
      input.textContent = input.textContent.slice(0, -4);
      lastAction[0] = "remove";
      lastAction[1] = "abs(";
    } else if (input.textContent.endsWith("max(")) {
      input.textContent = input.textContent.slice(0, -4);
      lastAction[0] = "remove";
      lastAction[1] = "max(";
    } else if (input.textContent.endsWith("√(")) {
      input.textContent = input.textContent.slice(0, -2);
      lastAction[0] = "remove";
      lastAction[1] = "√(";
    } else if (input.textContent.endsWith("∛(")) {
      input.textContent = input.textContent.slice(0, -2);
      lastAction[0] = "remove";
      lastAction[1] = "∛(";
    } else if (input.textContent.endsWith("log(")) {
      input.textContent = input.textContent.slice(0, -4);
      lastAction[0] = "remove";
      lastAction[1] = "log(";
    } else if (input.textContent.endsWith("ln(")) {
      input.textContent = input.textContent.slice(0, -3);
      lastAction[0] = "remove";
      lastAction[1] = "ln(";
    } else if (input.textContent.endsWith("e^")) {
      input.textContent = input.textContent.slice(0, -2);
      lastAction[0] = "remove";
      lastAction[1] = "e^";
    } else if (input.textContent.endsWith("Ans")) {
      input.textContent = input.textContent.slice(0, -3);
      lastAction[0] = "remove";
      lastAction[1] = "Ans";
    } else if (input.textContent.endsWith("(-)")) {
      input.textContent = input.textContent.slice(0, -3);
      lastAction[0] = "remove";
      lastAction[1] = "(-)";
    } else if (input.textContent.endsWith("x10^")) {
      input.textContent = input.textContent.slice(0, -4);
      lastAction[0] = "remove";
      lastAction[1] = "x10^";
    } else if (input.textContent.endsWith("Ran#")) {
      input.textContent = input.textContent.slice(0, -4);
      lastAction[0] = "remove";
      lastAction[1] = "Ran#";
    } else if (input.textContent.endsWith("RanInt#(")) {
      input.textContent = input.textContent.slice(0, -8);
      lastAction[0] = "remove";
      lastAction[1] = "RanInt#(";
    } else if (input.textContent.endsWith("Rnd(")) {
      input.textContent = input.textContent.slice(0, -4);
      lastAction[0] = "remove";
      lastAction[1] = "Rnd(";
    } else if (input.textContent.endsWith("Pol(")) {
      input.textContent = input.textContent.slice(0, -4);
      lastAction[0] = "remove";
      lastAction[1] = "Pol(";
    } else if (input.textContent.endsWith("Rec(")) {
      input.textContent = input.textContent.slice(0, -4);
      lastAction[0] = "remove";
      lastAction[1] = "Rec(";
    } else if (input.textContent.endsWith("M+")) {
      input.textContent = input.textContent.slice(0, -2);
      lastAction[0] = "remove";
      lastAction[1] = "M+";
    } else if (input.textContent.endsWith("M-")) {
      input.textContent = input.textContent.slice(0, -2);
      lastAction[0] = "remove";
      lastAction[1] = "M-";
    } else if (input.textContent.endsWith("sin(")) {
      input.textContent = input.textContent.slice(0, -4);
      lastAction[0] = "remove";
      lastAction[1] = "sin(";
    } else if (input.textContent.endsWith("sin⁻¹(")) {
      input.textContent = input.textContent.slice(0, -6);
      lastAction[0] = "remove";
      lastAction[1] = "sin⁻¹(";
    } else if (input.textContent.endsWith("cos(")) {
      input.textContent = input.textContent.slice(0, -4);
      lastAction[0] = "remove";
      lastAction[1] = "cos(";
    } else if (input.textContent.endsWith("cos⁻¹(")) {
      input.textContent = input.textContent.slice(0, -6);
      lastAction[0] = "remove";
      lastAction[1] = "cos⁻¹(";
    } else if (input.textContent.endsWith("tan(")) {
      input.textContent = input.textContent.slice(0, -4);
      lastAction[0] = "remove";
      lastAction[1] = "tan(";
    } else if (input.textContent.endsWith("tan⁻¹(")) {
      input.textContent = input.textContent.slice(0, -6);
      lastAction[0] = "remove";
      lastAction[1] = "tan⁻¹(";
    } else if (input.textContent.endsWith("⁻¹")) {
      input.textContent = input.textContent.slice(0, -2);
      lastAction[0] = "remove";
      lastAction[1] = "⁻¹";
    } else {
      lastAction[0] = "remove";
      lastAction[1] = `${input.textContent.slice(-1)}`;
      input.textContent = input.textContent.slice(0, -1);
    }
  } else if (isAlphaActive && !isShiftActive) {
    if (lastAction[0] === "remove") {
      input.textContent += lastAction[1];
      lastAction[0] = "add";
    } else if (lastAction[0] === "add") {
      input.textContent = input.textContent.slice(0, -lastAction[1].length);
      lastAction[0] = "remove";
    }
  }
  deActivateShiftAndAlpha();
}
