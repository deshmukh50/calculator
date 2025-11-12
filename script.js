const exprEl = document.getElementById("expression");
const valueEl = document.getElementById("value");
const keys = document.querySelectorAll(".key");

let expression = "";
let current = "0";
let lastIsOperator = false;

function updateScreen() {
  exprEl.textContent = expression || "\u00A0";
  valueEl.textContent = current;
}

function clearAll() {
  expression = "";
  current = "0";
  lastIsOperator = false;
  updateScreen();
}

function backspace() {
  current = current.length > 1 ? current.slice(0, -1) : "0";
  updateScreen();
}

function appendDigit(d) {
  if (lastIsOperator) {
    current = d;
    lastIsOperator = false;
  } else if (current === "0") {
    current = d;
  } else {
    current += d;
  }
  updateScreen();
}

function appendDot() {
  if (!current.includes(".")) {
    current += ".";
  }
  updateScreen();
}

function applyOperator(op) {
  const map = { "÷": "/", "×": "*", "−": "-", "+": "+" };
  const jsOp = map[op] || op;

  if (lastIsOperator) {
    expression = expression.slice(0, -1) + jsOp;
  } else {
    expression += current + jsOp;
  }
  lastIsOperator = true;
  updateScreen();
}

function percent() {
  current = (parseFloat(current) / 100).toString();
  updateScreen();
}

function evaluate() {
  try {
    let expr = expression + current;
    expr = expr.replace(/×/g, "*").replace(/÷/g, "/").replace(/−/g, "-");
    const result = Function("return " + expr)();
    current = String(result);
    expression = "";
    updateScreen();
  } catch {
    current = "Error";
    expression = "";
    updateScreen();
  }
}

keys.forEach((btn) => {
  btn.addEventListener("click", () => {
    const action = btn.dataset.action;
    const text = btn.textContent.trim();

    if (action === "digit") appendDigit(text);
    else if (action === "dot") appendDot();
    else if (action === "clear") clearAll();
    else if (action === "back") backspace();
    else if (action === "percent") percent();
    else if (action === "operator") applyOperator(text);
    else if (action === "equals") evaluate();
  });
});

updateScreen();
