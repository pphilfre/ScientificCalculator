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

let numbers = document.getElementsByClassName("number");
for (let i = 0; i < numbers.length; i++) {
  numbers[i].addEventListener("click", appendToInput, false);
}

let permutations = document.getElementById("multiply");
permutations.addEventListener("click", getPermutations, false);

let combinations = document.getElementById("divide");
combinations.addEventListener("click", getCombinations, false);

let pol = document.getElementById("add");
pol.addEventListener("click", getPol, false);

let randomNumber = document.getElementById("random");
randomNumber.addEventListener("click", randomNum, false);

let round = document.getElementById("zero");
round.addEventListener("click", roundNumber, false);

let answerButton = document.getElementById("Ans");
answerButton.addEventListener("click", showAnswer, false);
window.answer = 0;
window.answerJustOccurred = false;

let engineeringNotationButton = document.getElementById("ENG");
engineeringNotationButton.addEventListener(
  "click",
  showEngineeringNotation,
  false,
);
window.engineeringNotationOffset = 1;

window.isInStandardForm = false;

let standardFormButton = document.getElementById("10x");
standardFormButton.addEventListener("click", showStandardForm, false);

let rec = document.getElementById("subtract");
rec.addEventListener("click", getRec, false);

let sin = document.getElementById("sin");
sin.addEventListener("click", sinFunction, false);

let cos = document.getElementById("cos");
cos.addEventListener("click", cosFunction, false);

let tan = document.getElementById("tan");
tan.addEventListener("click", tanFunction, false);

let memoryButton = document.getElementById("memory");
memoryButton.addEventListener("click", memory, false);

let negative = document.getElementById("negative");
negative.addEventListener("click", getNegative, false);

let factorialButton = document.getElementById("x-1");
factorialButton.addEventListener("click", factorialFunction, false);

let DMS = document.getElementById("DMS");
DMS.addEventListener("click", getDMS, false);

let store = document.getElementById("store");
store.addEventListener("click", storeData, false);
window.isStoring = false;

let format = document.getElementById("SD");
format.addEventListener("click", changeFormat, false);

let bracketStart = document.getElementById("bracketStart");
bracketStart.addEventListener("click", appendToInput, false);

let bracketEnd = document.getElementById("bracketEnd");
bracketEnd.addEventListener("click", bracketFunction, false);

let fraction = document.getElementById("fraction");
fraction.addEventListener("click", getFraction, false);

let root = document.getElementById("root");
root.addEventListener("click", getRoot, false);

let square = document.getElementById("square");
square.addEventListener("click", getSquare, false);

let exponent = document.getElementById("exponent");
exponent.addEventListener("click", getExponent, false);

let log = document.getElementById("log");
log.addEventListener("click", getLog, false);

let ln = document.getElementById("ln");
ln.addEventListener("click", getLn, false);

let minMax = document.getElementById("minMax");
minMax.addEventListener("click", getMinMax, false);

let cubed = document.getElementById("cubed");
cubed.addEventListener("click", getCubed, false);

let absolute = document.getElementById("absolute");
absolute.addEventListener("click", getAbsolute, false);

let sign = document.getElementById("sign");
sign.addEventListener("click", getSign, false);

function getSign() {
  if (!isShiftActive && !isAlphaActive) {
    input.textContent += "sign(";
    lastAction[0] = "add";
    lastAction[1] = "sign(";
  }
  answerJustOccurred = false;
  isStoring = false;
  deActivateShiftAndAlpha();
}

function getAbsolute() {
  if (!isShiftActive && !isAlphaActive) {
    input.textContent += "abs(";
    lastAction[0] = "add";
    lastAction[1] = "abs(";
  }
  answerJustOccurred = false;
  isStoring = false;
  deActivateShiftAndAlpha();
}

function getCubed() {
  if (!isShiftActive && !isAlphaActive) {
    input.textContent += "³";
    lastAction[0] = "add";
    lastAction[1] = "³";
  }
  answerJustOccurred = false;
  isStoring = false;
  deActivateShiftAndAlpha();
}

function getMinMax() {
  if (!isShiftActive && !isAlphaActive) {
    if (answerJustOccurred) {
      script.clear();
    }
    input.textContent += "max(";
    lastAction[0] = "add";
    lastAction[1] = "max(";
  } else if (isShiftActive && !isAlphaActive) {
    input.textContent += "min(";
    lastAction[0] = "add";
    lastAction[1] = "min(";
  }
  answerJustOccurred = false;
  isStoring = false;
  deActivateShiftAndAlpha();
}

function getLn() {
  if (!isShiftActive && !isAlphaActive) {
    input.textContent += "ln(";
    lastAction[0] = "add";
    lastAction[1] = "ln(";
  } else if (isShiftActive && !isAlphaActive) {
    input.textContent += "e^";
    lastAction[0] = "add";
    lastAction[1] = "e^";
  }
  answerJustOccurred = false;
  isStoring = false;
  deActivateShiftAndAlpha();
}

function getLog() {
  if (!isShiftActive && !isAlphaActive) {
    if (answerJustOccurred) {
      script.clear();
    }
    input.textContent += "log(";
    lastAction[0] = "add";
    lastAction[1] = "log(";
  }
  answerJustOccurred = false;
  isStoring = false;
  deActivateShiftAndAlpha();
}

function getExponent() {
  if (!isShiftActive && !isAlphaActive) {
    input.textContent += "^";
    lastAction[0] = "add";
    lastAction[1] = "^";
  }
  answerJustOccurred = false;
  isStoring = false;
  deActivateShiftAndAlpha();
}

function getSquare() {
  if (!isShiftActive && !isAlphaActive) {
    input.textContent += "²";
    lastAction[0] = "add";
    lastAction[1] = "²";
  }
  answerJustOccurred = false;
  isStoring = false;
  deActivateShiftAndAlpha();
}

function getRoot() {
  if (!isShiftActive && !isAlphaActive) {
    input.textContent += "√(";
    lastAction[0] = "add";
    lastAction[1] = "√(";
  } else if (isShiftActive && !isAlphaActive) {
    input.textContent += "∛(";
    lastAction[0] = "add";
    lastAction[1] = "∛(";
  }
  answerJustOccurred = false;
  isStoring = false;
  deActivateShiftAndAlpha();
}

function getFraction() {
  if (!isShiftActive && !isAlphaActive) {
    input.textContent += "/";
    lastAction[0] = "add";
    lastAction[1] = "/";
  }
  answerJustOccurred = false;
  isStoring = false;
  deActivateShiftAndAlpha();
}

function changeFormat() {
  if (!isShiftActive && !isAlphaActive) {
    if (isStoring) {
      if (
        localStorage.getItem("yValue") === null ||
        isNaN(localStorage.getItem("yValue"))
      ) {
        localStorage.setItem("yValue", "0");
      }
      localStorage.setItem("yValue", calculate());
      clear();
      isStoring = false;
      input.textContent = "y -> " + localStorage.getItem("yValue");
      output.textContent = localStorage.getItem("yValue");
      return;
    }

    if (answerJustOccurred) {
      let currentOutput = output.textContent;
      if (currentOutput.includes("/")) {
        output.textContent = parseFloat(currentOutput.split("/")[0]);
      } else if (!isNaN(currentOutput) && currentOutput.includes(".")) {
        output.textContent = parseFloat(currentOutput).toPrecision(10);
      } else {
        let numerator = parseFloat(currentOutput);
        let denominator = 1;
        output.textContent = `${numerator}/${denominator}`;
      }
    }
  } else if (isAlphaActive && !isShiftActive) {
    input.textContent += "y";
  }
  isStoring = false;
  isStoring = false;
  answerJustOccurred = false;
  deActivateShiftAndAlpha();
}

function getDMS() {
  if (!isShiftActive && !isAlphaActive) {
    if (isStoring) {
      if (
        localStorage.getItem("bValue") === null ||
        isNaN(localStorage.getItem("bValue"))
      ) {
        localStorage.setItem("bValue", "0");
      }
      localStorage.setItem("bValue", calculate());
      script.clear();
      isStoring = false;
      input.textContent = "B -> " + localStorage.getItem("bValue");
      output.textContent = localStorage.getItem("bValue");
      return;
    }
    input.textContent += "°";
    lastAction[0] = "add";
    lastAction[1] = "°";
    answerJustOccurred = false;
  } else if (isShiftActive && !isAlphaActive) {
    if (answerJustOccurred) {
      output.innerHTML = primeFactorization(output.textContent);
    }
  } else if (isAlphaActive && !isShiftActive) {
    input.textContent += "B";
    lastAction[0] = "add";
    lastAction[1] = "B";
    answerJustOccurred = false;
  }
  isStoring = false;
  answerJustOccurred = false;
  deActivateShiftAndAlpha();
}

function primeFactorization(n) {
  const factors = {};
  let divisor = 2;

  while (n > 1) {
    while (n % divisor === 0) {
      factors[divisor] = (factors[divisor] || 0) + 1;
      n /= divisor;
    }
    divisor++;
  }

  return Object.entries(factors)
    .map(([base, exponent]) => `${base}<sup>${exponent}<sup>`)
    .join(" &times; ");
}

function getNegative() {
  if (!isShiftActive && !isAlphaActive) {
    if (isStoring) {
      if (
        localStorage.getItem("aValue") === null ||
        isNaN(localStorage.getItem("aValue"))
      ) {
        localStorage.setItem("aValue", "0");
      }
      localStorage.setItem("aValue", calculate());
      script.clear();
      isStoring = false;
      input.textContent = "A -> " + localStorage.getItem("aValue");
      output.textContent = localStorage.getItem("aValue");
      return;
    }
    if (answerJustOccurred) {
      clear();
    }
    input.textContent += "(-)";
    lastAction[0] = "add";
    lastAction[1] = "(-)";
  }
  if (isAlphaActive && !isShiftActive) {
    input.textContent += "A";
    lastAction[0] = "add";
    lastAction[1] = "A";
    answerJustOccurred = false;
  }
  isStoring = false;
  answerJustOccurred = false;
  deActivateShiftAndAlpha();
}

function memory() {
  if (!isShiftActive && !isAlphaActive) {
    if (isStoring) {
      if (
        localStorage.getItem("memoryValue") === null ||
        isNaN(localStorage.getItem("memoryValue"))
      ) {
        localStorage.setItem("memoryValue", "0");
      }
      localStorage.setItem("memoryValue", calculate());
      script.clear();
      isStoring = false;
      input.textContent = "M -> " + localStorage.getItem("memoryValue");
      output.textContent = localStorage.getItem("memoryValue");
      return;
    }
    if (
      localStorage.getItem("memoryValue") === null ||
      isNaN(localStorage.getItem("memoryValue"))
    ) {
      localStorage.setItem("memoryValue", "0");
    }

    if (answerJustOccurred) {
      clear();
      input.textContent = "Ans";
    }
    input.textContent += "M+";
    lastAction[0] = "add";
    lastAction[1] = "M+";
    answerJustOccurred = false;

    deActivateShiftAndAlpha();
  } else if (isShiftActive && !isAlphaActive) {
    if (answerJustOccurred) {
      clear();
      input.textContent = "Ans";
    }
    input.textContent += "M-";
    lastAction[0] = "add";
    lastAction[1] = "M-";
    answerJustOccurred = false;
    deActivateShiftAndAlpha();
  } else if (isAlphaActive && !isShiftActive) {
    if (answerJustOccurred) {
      clear();
    }
    input.textContent += "M";
    lastAction[0] = "add";
    lastAction[1] = "M";
    answerJustOccurred = false;
    deActivateShiftAndAlpha();
  }
  isStoring = false;
  answerJustOccurred = false;
  deActivateShiftAndAlpha();
}

function sinFunction() {
  if (!isShiftActive && !isAlphaActive) {
    if (isStoring) {
      if (
        localStorage.getItem("dValue") === null ||
        isNaN(localStorage.getItem("dValue"))
      ) {
        localStorage.setItem("dValue", "0");
      }
      localStorage.setItem("dValue", calculate());
      script.clear();
      isStoring = false;
      input.textContent = "D -> " + localStorage.getItem("dValue");
      output.textContent = localStorage.getItem("dValue");
      return;
    }
    input.textContent += "sin(";
    lastAction[0] = "add";
    lastAction[1] = "sin(";
  } else if (isShiftActive && !isAlphaActive) {
    input.textContent += "sin⁻¹(";
    lastAction[0] = "add";
    lastAction[1] = "sin⁻¹(";
  } else if (isAlphaActive && !isShiftActive) {
    input.textContent += "D";
    lastAction[0] = "add";
    lastAction[1] = "D";
  }
  isStoring = false;
  answerJustOccurred = false;
  deActivateShiftAndAlpha();
}

function cosFunction() {
  if (!isShiftActive && !isAlphaActive) {
    if (isStoring) {
      if (
        localStorage.getItem("eValue") === null ||
        isNaN(localStorage.getItem("eValue"))
      ) {
        localStorage.setItem("eValue", "0");
      }
      localStorage.setItem("eValue", calculate());
      script.clear();
      isStoring = false;
      input.textContent = "E -> " + localStorage.getItem("eValue");
      output.textContent = localStorage.getItem("eValue");
      return;
    }
    input.textContent += "cos(";
    lastAction[0] = "add";
    lastAction[1] = "cos(";
  } else if (isShiftActive && !isAlphaActive) {
    input.textContent += "cos⁻¹(";
    lastAction[0] = "add";
    lastAction[1] = "cos⁻¹(";
  } else if (isAlphaActive && !isShiftActive) {
    input.textContent += "E";
    lastAction[0] = "add";
    lastAction[1] = "E";
  }
  isStoring = false;
  answerJustOccurred = false;
  deActivateShiftAndAlpha();
}

function tanFunction() {
  if (!isShiftActive && !isAlphaActive) {
    if (isStoring) {
      if (
        localStorage.getItem("fValue") === null ||
        isNaN(localStorage.getItem("fValue"))
      ) {
        localStorage.setItem("fValue", "0");
      }
      localStorage.setItem("fValue", calculate());
      script.clear();
      isStoring = false;
      input.textContent = "F -> " + localStorage.getItem("fValue");
      output.textContent = localStorage.getItem("fValue");
      return;
    }
    input.textContent += "tan(";
    lastAction[0] = "add";
    lastAction[1] = "tan(";
  } else if (isShiftActive && !isAlphaActive) {
    input.textContent += "tan⁻¹(";
    lastAction[0] = "add";
    lastAction[1] = "tan⁻¹(";
  } else if (isAlphaActive && !isShiftActive) {
    input.textContent += "F";
    lastAction[0] = "add";
    lastAction[1] = "F";
  }
  isStoring = false;
  answerJustOccurred = false;
  deActivateShiftAndAlpha();
}

function getRec() {
  if (!script.isShiftActive && !script.isAlphaActive) {
    script.input.textContent += "-";
    lastAction[0] = "add";
    lastAction[1] = "-";
  } else if (script.isShiftActive && !script.isAlphaActive) {
    script.input.textContent += "Rec(";
    lastAction[0] = "add";
    lastAction[1] = "Rec(";
  }
  isStoring = false;
  answerJustOccurred = false;
  deActivateShiftAndAlpha();
}

function getPol() {
  if (!isShiftActive && !isAlphaActive) {
    input.textContent += "+";
    lastAction[0] = "add";
    lastAction[1] = "+";
  } else if (isShiftActive && !isAlphaActive) {
    input.textContent += "Pol(";
    lastAction[0] = "add";
    lastAction[1] = "Pol(";
  }
  isStoring = false;
  answerJustOccurred = false;
  deActivateShiftAndAlpha();
}

function getCombinations() {
  if (!isShiftActive && !isAlphaActive) {
    input.textContent += "÷";
    lastAction[0] = "add";
    lastAction[1] = "÷";
  } else if (isShiftActive && !isAlphaActive) {
    input.textContent += "C";
    lastAction[0] = "add";
    lastAction[1] = "C";
  }
  isStoring = false;
  answerJustOccurred = false;
  deActivateShiftAndAlpha();
}

function getPermutations() {
  if (!isShiftActive && !isAlphaActive) {
    input.textContent += "x";
    lastAction[0] = "add";
    lastAction[1] = "x";
  } else if (isShiftActive && !isAlphaActive) {
    input.textContent += "P";
    lastAction[0] = "add";
    lastAction[1] = "P";
  }
  isStoring = false;
  answerJustOccurred = false;
  deActivateShiftAndAlpha();
}

function roundNumber() {
  if (!isShiftActive && !isAlphaActive) {
    if (answerJustOccurred) {
      script.clear();
    }
    input.textContent += "0";
    lastAction[0] = "add";
    lastAction[1] = "0";
  } else if (isShiftActive && !isAlphaActive) {
    if (answerJustOccurred) {
      script.clear();
    }
    input.textContent += "Rnd(";
    lastAction[0] = "add";
    lastAction[1] = "Rnd(";
  }
  isStoring = false;
  answerJustOccurred = false;
  deActivateShiftAndAlpha();
}

function randomNum() {
  if (!isShiftActive && !isAlphaActive) {
    if (answerJustOccurred) {
      script.clear();
    }
    input.textContent += ".";
    lastAction[0] = "add";
    lastAction[1] = ".";
  } else if (isShiftActive && !isAlphaActive) {
    if (answerJustOccurred) {
      script.clear();
    }
    input.textContent += "Ran#";
    lastAction[0] = "add";
    lastAction[1] = "Ran#";
  } else if (isAlphaActive && !isShiftActive) {
    if (answerJustOccurred) {
      script.clear();
    }
    input.textContent += "RanInt#(";
    lastAction[0] = "add";
    lastAction[1] = "RanInt#(";
  }
  isStoring = false;
  answerJustOccurred = false;
  deActivateShiftAndAlpha();
}

function showAnswer() {
  if (answerJustOccurred) {
    if (!isShiftActive) {
      script.clear();
    } else if (isShiftActive) {
      script.clearOutput();
    }
  }

  if (!isShiftActive) {
    input.textContent += "Ans";
    lastAction[0] = "add";
    lastAction[1] = "Ans";
  } else {
    if (answerJustOccurred) {
      clear();
      script.input.textContent += "Ans";
    }
    input.textContent += "%";
    lastAction[0] = "add";
    lastAction[1] = "%";
  }
  isStoring = false;
  answerJustOccurred = false;
  deActivateShiftAndAlpha();
}

function showStandardForm() {
  if (!isShiftActive && !isAlphaActive) {
    if (answerJustOccurred) {
      script.clear();
    }
    input.textContent += "x10^";
    lastAction[0] = "add";
    lastAction[1] = "x10^";
  } else if (isShiftActive && !isAlphaActive) {
    if (answerJustOccurred) {
      script.clear();
    }
    input.textContent += "π";
    lastAction[0] = "add";
    lastAction[1] = "π";
  } else if (isAlphaActive && !isShiftActive) {
    if (answerJustOccurred) {
      script.clear();
    }
    input.textContent += "e";
    lastAction[0] = "add";
    lastAction[1] = "e";
  }
  isStoring = false;
  answerJustOccurred = false;
  deActivateShiftAndAlpha();
}

export function factorial(x) {
  if (x === 0) {
    return 1;
  }
  return x * factorial(x - 1);
}

function factorialFunction() {
  if (!isShiftActive && !isAlphaActive) {
    if (isStoring) {
      if (
        localStorage.getItem("cValue") === null ||
        isNaN(localStorage.getItem("cValue"))
      ) {
        localStorage.setItem("cValue", "0");
      }
      localStorage.setItem("cValue", calculate());
      script.clear();
      isStoring = false;
      input.textContent = "ℂ -> " + localStorage.getItem("cValue");
      output.textContent = localStorage.getItem("cValue");
      return;
    }
    input.textContent += "⁻¹";
    lastAction[0] = "add";
    lastAction[1] = "⁻¹";
    answerJustOccurred = false;
  } else if (isShiftActive && !isAlphaActive) {
    input.textContent += "!";
    lastAction[0] = "add";
    lastAction[1] = "!";
    answerJustOccurred = false;
  } else if (isAlphaActive && !isShiftActive) {
    input.textContent += "ℂ";
  }
  deActivateShiftAndAlpha();
}

function standardForm(num) {
  let exponent = 0;

  if (num < engineeringNotationOffset) {
    while (num < engineeringNotationOffset) {
      num *= 10;
      exponent--;
    }
  } else if (num >= 10 * engineeringNotationOffset) {
    while (num >= 10 * engineeringNotationOffset) {
      num /= 10;
      exponent++;
    }
  }

  let precision = 4;
  num = parseFloat(num.toPrecision(precision));

  return `${num}x10^${exponent}`;
}

function showEngineeringNotation() {
  if (answerJustOccurred) {
    if (!isShiftActive && !isAlphaActive) {
      if (!isInStandardForm) {
        script.output.textContent = standardForm(answer);
        isInStandardForm = true;
      } else {
        if (engineeringNotationOffset >= 1000000000) {
          engineeringNotationOffset = 1;
          isInStandardForm = false;
          script.output.textContent = answer;
        } else {
          engineeringNotationOffset *= 1000;
          script.output.textContent = standardForm(answer);
        }
      }
      script.output.textContent = standardForm(answer);
    } else if (isShiftActive && !isAlphaActive) {
      if (!isInStandardForm) {
        script.output.textContent = standardForm(answer);
        isInStandardForm = true;
      } else {
        if (engineeringNotationOffset <= 0.000000001) {
          engineeringNotationOffset = 1;
          isInStandardForm = false;
          script.output.textContent = answer;
        } else {
          engineeringNotationOffset /= 1000;
          script.output.textContent = standardForm(answer);
        }
      }
    }
  }

  deActivateShiftAndAlpha();
}

export function storeData() {
  if (!isShiftActive && !isAlphaActive) {
    isStoring = true;
  }
  if (isShiftActive && !isAlphaActive) {
    clear();
    input.innerHTML += `
      A: ${localStorage.getItem("aValue")}&nbsp;&nbsp;&nbsp;&nbsp;
      B: ${localStorage.getItem("bValue")}&nbsp;&nbsp;&nbsp;&nbsp;
      C: ${localStorage.getItem("cValue")}<br>
      
      D: ${localStorage.getItem("dValue")}&nbsp;&nbsp;&nbsp;&nbsp;
      E: ${localStorage.getItem("eValue")}&nbsp;&nbsp;&nbsp;&nbsp;
      F: ${localStorage.getItem("fValue")}<br>
      
      X: ${localStorage.getItem("xValue")}&nbsp;&nbsp;&nbsp;&nbsp;
      Y: ${localStorage.getItem("yValue")}&nbsp;&nbsp;&nbsp;&nbsp;
      M: ${localStorage.getItem("memoryValue")}`;
    answerJustOccurred = true;
  }
}

export function appendToInput() {
  if (output.textContent === "Syntax Error") {
    clear();
  }
  if (answerJustOccurred) {
    if (isFinite(this.textContent)) {
      clear();
      lastAction[0] = "add";
      lastAction[1] = `${this.textContent}`;
      answerJustOccurred = false;
    } else if (!isFinite(this.textContent)) {
      input.textContent = input.textContent + this.textContent;
      lastAction[0] = "add";
      lastAction[1] = `${this.textContent}`;
      answerJustOccurred = false;
      return;
    }
  }
  lastAction[0] = "add";
  lastAction[1] = `${this.textContent}`;
  input.textContent = input.textContent + this.textContent;
  deActivateShiftAndAlpha();
  isStoring = false;
}

export function bracketFunction() {
  if (!isShiftActive && !isAlphaActive) {
    if (isStoring) {
      if (
        localStorage.getItem("xValue") === null ||
        isNaN(localStorage.getItem("xValue"))
      ) {
        localStorage.setItem("xValue", "0");
      }
      localStorage.setItem("xValue", calculate());
      clear();
      isStoring = false;
      input.textContent = "𝑥 -> " + localStorage.getItem("xValue");
      output.textContent = localStorage.getItem("xValue");
      return;
    }
    input.textContent += ")";
    lastAction[0] = "add";
    lastAction[1] = ")";
  } else if (isShiftActive && !isAlphaActive) {
    input.textContent += ",";
    lastAction[0] = "add";
    lastAction[1] = ",";
  } else if (isAlphaActive && !isShiftActive) {
    input.textContent += "𝑥";
    lastAction[0] = "add";
    lastAction[1] = "𝑥";
    answerJustOccurred = false;
  }
  answerJustOccurred = false;
  deActivateShiftAndAlpha();
}
