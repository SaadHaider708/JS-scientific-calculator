"use strict";

// Buttons Data
const operations = [
  { id: "clear", display: "C" },
  { id: "pi", display: "π" },
  { id: "euler", display: "eu" },
  { id: "backspace", display: "⌫" },
  { id: "cosine", display: "cos" },
  { id: "sine", display: "sin" },
  { id: "tangent", display: "tan" },
  { id: "divide", display: "/" },
  { id: "number", display: 7 },
  { id: "number", display: 8 },
  { id: "number", display: 9 },
  { id: "multiply", display: "x" },
  { id: "number", display: 4 },
  { id: "number", display: 5 },
  { id: "number", display: 6 },
  { id: "addition", display: "+" },
  { id: "number", display: 1 },
  { id: "number", display: 2 },
  { id: "number", display: 3 },
  { id: "minus", display: "-" },
  { id: "dot", display: "." },
  { id: "number", display: 0 },
  { id: "exponent", display: "^" },
  { id: "root", display: "√" },
  { id: "percentage", display: "%" },
  { id: "parenthesis", display: "(" },
  { id: "parenthesis", display: ")" },
  { id: "equals", display: "=" },
];
// Display buttons

const btnSection = document.querySelector(".calc");
let addedBtns = 0;
operations.forEach((btns) => {
  addedBtns++;

  btnSection.insertAdjacentHTML(
    "beforeend",
    `<button id= ${btns.id} class="btn-inputs" oclick="setTextToCurrentPos()">${btns.display}</button>`
  );
});

//Selectors
const display = document.querySelector("#output-screen");
const clear = document.querySelector("#clear");
const backspace = document.querySelector("#backspace");
const buttonInputs = document.querySelectorAll(".btn-inputs");
const manualInputs = document.querySelector(".numberInput");
const numbers = document.querySelector("#numbers");
const equals = document.querySelector("#equals");
const outputHistory = document.querySelector(".history_screen");
const historyItem = document.querySelector(".history_item");
const answer = document.querySelector(".history_value");
const variableInput = document.querySelector(".variable_input");
const createVarBtn = document.querySelector(".create_Var_Btn");
const variableDisplay = document.querySelector(".variable_info");
const varInfo = document.querySelector(".var_info");

let historyDisplay = [];
let varDeclerations = {};
let varObjKeys = Object.keys(varDeclerations);
const cos = Math.cos;
const sin = Math.sin;
const tan = Math.tan;
const π = Math.PI;
const sqr = Math.sqrt;
const eu = Math.E;

//IIFE (Immediately invoked function expression)
(function () {
  getHistory();
  manualInputs.focus();
})();

// Variable Section
const timeOutErorMsg = setTimeout(() => {
  display.innerText = "";
}, 1000);
function variableDecleration() {
  const varInputs = variableInput.value;
  if (Number(varInputs[0]) || varInputs[0] == "=" || !varInputs.includes("=")) {
    display.innerText = "Invalid Assignment";
    timeOutErorMsg;
  } else {
    const variables = varInputs.trim().split("=");
    const [keys, value] = variables; // destructuring
    if (
      varInputs.includes("cos") ||
      varInputs.includes("sin") ||
      varInputs.includes("tan") ||
      varInputs.includes("eu") ||
      varInputs.includes("e") ||
      varInputs.includes("pi") ||
      varInputs.includes("π") ||
      varInputs.includes("sqr") ||
      !Number(value)
    ) {
      display.innerText = "Invalid Assignment";
      timeOutErorMsg;
      return;
    }

    if (keys.length > 1) {
      display.innerText = "Single char Variables only";
      return timeOutErorMsg;
    }

    if (varDeclerations.hasOwnProperty(keys)) {
      display.innerText = "Variable Exists";
      timeOutErorMsg;
    } else {
      varDeclerations = {
        ...varDeclerations, //spread
        [keys]: value,
      };

      console.log(varDeclerations);

      varInfo.innerText = "";
      variableDisplay.insertAdjacentHTML(
        "beforeend",
        ` <div>
      <small class='var_info'>${varInputs}</small>
      <hr />
    </div>`
      );
    }
  }
}

createVarBtn.addEventListener("click", variableDecleration);
variableInput.addEventListener("keyup", (e) => {
  if (e.key == "Enter") {
    variableDecleration();
    variableInput.value = "";
    setTimeout(() => {
      display.innerText = "";
    }, 3000);
  }
});

const result = (varObject) => {
  try {
    const variableKeys = Object.keys(varObject);

    const splitingValues = display.innerText.split("");

    let leadingZeroIndex = splitingValues.indexOf("0");
    //Replacing Variable keys with values

    function findVar() {
      variableKeys.find((key) => {
        let keyIndex = splitingValues.indexOf(key);
        if (keyIndex !== -1 && splitingValues.includes(key)) {
          splitingValues[keyIndex] = varObject[key];
          console.log(splitingValues);
        }
      });
    }
    for (let i = 0; i <= splitingValues.length; i++) {
      findVar();
    }

    if (leadingZeroIndex === 0) {
      const occurence = ".";
      if (splitingValues.includes(occurence)) {
        splitingValues;
      } else {
        splitingValues[leadingZeroIndex] = "";
      }
    }

    const joined = splitingValues.join("").trim();
    console.log(joined);
    if (joined.length > 4) {
      display.innerText = Number(eval(joined)).toFixed(3);
    } else {
      display.innerText = Number(eval(joined));
    }

    return setHistory(joined);
  } catch {
    display.innerText = "Invalid Expression";
    setTimeout(() => {
      display.innerText = "";
    }, 2000);
  }
};

// For Keyboard inputs
manualInputs.addEventListener("keyup", (e) => {
  display.innerText = e.target.value;

  if (e.key === "Enter") {
    result(varDeclerations);
  }
  if (e.key === "Escape" || e.key === "Delete") {
    display.innerText = "";
    manualInputs.value = "";
  }
});
// For button inputs
buttonInputs.forEach((items) => {
  items.addEventListener("click", (e) => {
    let btnInputs = e.target.innerText;
    const curEndPos = manualInputs.selectionEnd;

    if (btnInputs === "x") {
      btnInputs = "*";
    }
    if (btnInputs === "⌫") {
      btnInputs = "";
    }
    if (btnInputs === "=") {
      btnInputs = "";
    }
    if (btnInputs === "%") {
      btnInputs = "";
    }
    if (btnInputs === "√") {
      btnInputs = "sqr(";
    }
    if (btnInputs === "^") {
      btnInputs = "**";
    }
    if (btnInputs === "cos") {
      btnInputs = "cos(";
    }
    if (btnInputs === "sin") {
      btnInputs = "sin(";
    }
    if (btnInputs === "tan") {
      btnInputs = "tan(";
    }

    if (
      btnInputs === "(" &&
      btnInputs !== "cos" &&
      btnInputs !== "sin" &&
      btnInputs !== "tan"
    ) {
      btnInputs = "*(";
    }

    const editedString =
      manualInputs.value.slice(0, curEndPos) +
      btnInputs +
      manualInputs.value.slice(curEndPos);

    manualInputs.value = editedString;
    display.innerText = manualInputs.value;

    manualInputs.focus();
  });
});

//Clear inputs

clear.addEventListener("click", (e) => {
  display.innerText = "";
  manualInputs.value = "";
});

// Backspace function

backspace.addEventListener("click", (e) => {
  const splitingValues = display.innerText.split("");
  const removedValue = splitingValues.slice(0, -1);
  display.innerText = removedValue.join("");
  manualInputs.value = removedValue.join("");
});

// Percentage
percentage.addEventListener("click", () => {
  display.innerText = Number(eval(display.innerText + "/100"));
});

// Calculation with '=' button

equals.addEventListener("click", (e) => {
  result(varDeclerations);
});

// Setting LocalStorage History

function setHistory(historyData) {
  const value = historyData + "=" + Number(eval(historyData)).toFixed(2);

  let storedData = localStorage.getItem("storedData");
  if (storedData == null) {
    historyDisplay = [];
  } else {
    historyDisplay = JSON.parse(storedData);
  }
  historyDisplay.push(value);
  localStorage.setItem("storedData", JSON.stringify(historyDisplay));
  eval(historyData);
  getHistory();
}

// Getting LocalStorage History

function getHistory() {
  let storedData = localStorage.getItem("storedData");
  if (storedData == null) {
    historyDisplay = [];
  } else {
    historyDisplay = JSON.parse(storedData);
  }

  let html = "";

  historyDisplay.forEach(function (items, index) {
    const historyExpressions = items.split("=");
    const [expression, result] = historyExpressions;

    html += `   <div class="history_item">
<small id="${index}" onclick="getAnswer(this.id)">${
      index + 1
    }. ${expression}= <a>${result}</a></small>
    <button id="${index}" class="remove_History_Item" onClick="deleteHistoryItem(this.id)">remove</button>
    <hr />
</div>`;
  });

  if (historyDisplay.length != 0) {
    outputHistory.innerHTML = html;
  } else {
    outputHistory.innerHTML = `No History to Show!`;
  }
}

//Delete history

function deleteHistoryItem(index) {
  let storedData = localStorage.getItem("storedData");
  if (storedData == null) {
    historyDisplay = [];
  } else {
    historyDisplay = JSON.parse(storedData);
  }
  historyDisplay.splice(index, 1);
  localStorage.setItem("storedData", JSON.stringify(historyDisplay));
  getHistory();
}

function getAnswer(index) {
  let storedData = localStorage.getItem("storedData");
  if (storedData == null) {
    historyDisplay = [];
  } else {
    historyDisplay = JSON.parse(storedData);
  }

  const extractorValue = historyDisplay[index].split("=");
  display.innerText += extractorValue[1];
  manualInputs.value += extractorValue[1];
  getHistory();
}
