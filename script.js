const form = document.querySelector("form");
const tipPercentButtonContainer = document.querySelector(
  ".tip-calculator__buttons"
);
const tipPercentButtons = document.querySelectorAll(".tip-calculator__button");
const billInput = document.querySelector(".input--bill");
const billInputContainer = document.querySelector(".tip-calculator__input");
const personInput = document.querySelector(".input--person");
const personInputContainer = document.querySelector(
  ".tip-calculator__input--people"
);

const tipPerPersonInput = document.querySelector(".result__tip-amount--bill");
const billPerPersonInput = document.querySelector(
  ".result__tip-amount--person"
);
const resetBtn = document.querySelector(".result__reset-btn");
const error = document.querySelector(".error");
const customBtn = document.querySelector(".tip-calculator__button--custom");

let bill = 0;
let percentage = 100;
let persons = 1;

form.addEventListener("submit", (e) => {
  e.preventDefault();
});

tipPercentButtonContainer.addEventListener("click", (e) => {
  if (!e.target.classList.contains("tip-calculator__button--custom")) {
    tipPercentButtons.forEach((btn) => {
      btn.classList.remove("tip-calculator__button--selected");
    });
    e.target.classList.add("tip-calculator__button--selected");
    percentage = parseInt(e.target.textContent);
    showResult();
  }
});

function showResult() {
  const totalTip = bill * (percentage / 100);
  const billPerPerson = (bill / persons).toFixed(2);
  const tipPerPerson = (totalTip / persons).toFixed(2);

  tipPerPersonInput.textContent = `$${tipPerPerson}`;
  billPerPersonInput.textContent = `$${billPerPerson}`;
}

billInputContainer.addEventListener("click", (e) => {
  billInput.focus();
});

billInput.addEventListener("input", (e) => {
  bill = +billInput.value;
  showResult();
});

personInputContainer.addEventListener("click", (e) => {
  personInput.focus();
});

personInput.addEventListener("input", (e) => {
  persons = +personInput.value;
  if (persons === 0) {
    error.style.display = "initial";
  } else {
    error.style.display = "none";
    showResult();
  }
});

resetBtn.addEventListener("click", function () {
  bill = 0;
  percentage = 100;
  persons = 1;
  tipPerPersonInput.textContent = `$0`;
  billPerPersonInput.textContent = `$0`;
  personInput.value = "";
  billInput.value = "";
  tipPercentButtons.forEach((btn) => {
    btn.classList.remove("tip-calculator__button--selected");
  });
  error.style.display = "none";
  customBtn.textContent = "Custom";
});

customBtn.addEventListener("input", function () {
  percentage = parseInt(customBtn.textContent);
  if (!isNaN(percentage)) {
    showResult();
  }
  tipPercentButtons.forEach((btn) => {
    btn.classList.remove("tip-calculator__button--selected");
  });
  customBtn.classList.add("tip-calculator__button--selected");
  console.log(percentage);
});
