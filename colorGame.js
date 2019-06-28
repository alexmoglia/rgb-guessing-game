"use strict";

// *** VARIABLES ***
const messageDisplay = document.querySelector("#message");
const colorDisplay = document.querySelector("#colorDisplay");
const squares = document.querySelectorAll(".square");
const h1 = document.querySelector("h1");
const resetButton = document.querySelector("#reset");
const modeButtons = document.querySelectorAll(".mode");

let numSquares = 6;
let colors = [];
let correctColor;

init();

function init() {
  // *** Mode Button Event Listeners ***
  configModeButtons();

  // *** Square Event Listeners ***
  configSquares();

  reset();
}

colorDisplay.textContent = correctColor;

// *** RESET ***

resetButton.addEventListener("click", function() {
  reset();
});

function reset() {
  // create new color array & correct color
  colors = generateRandomColors(numSquares);
  correctColor = pickCorrectColor();
  colorDisplay.textContent = correctColor;
  // apply new colors to squares
  for (let i = 0; i < squares.length; i++) {
    if (colors[i]) {
      squares[i].style.display = "block";
      squares[i].style.backgroundColor = colors[i];
    } else {
      squares[i].style.display = "none";
    }
  }
  // reset initial game color and text
  h1.style.backgroundColor = "steelblue";
  messageDisplay.textContent = "";
  resetButton.textContent = "New Colors";
}

// *** HELPER FUNCTIONS ***

function configModeButtons() {
  // * Mode Button event listeners
  for (let i = 0; i < modeButtons.length; i++) {
    modeButtons[i].addEventListener("click", function() {
      modeButtons[0].classList.remove("selected");
      modeButtons[1].classList.remove("selected");
      this.classList.add("selected");
      this.textContent === "Easy" ? (numSquares = 3) : (numSquares = 6);
      reset();
    });
  }
}

function configSquares() {
  // * Square event listeners
  for (let i = 0; i < squares.length; i++) {
    // add click listeners
    squares[i].addEventListener("click", function() {
      // identify color of picked square
      let clickedColor = this.style.backgroundColor;
      // compare color to correctColor
      if (clickedColor === correctColor) {
        messageDisplay.textContent = "Correct!";
        resetButton.textContent = "Play Again?";
        changeColors(clickedColor);
        h1.style.backgroundColor = clickedColor;
      } else {
        this.style.backgroundColor = "#232323";
        messageDisplay.textContent = "Try Again";
      }
    });
  }
}

function pickCorrectColor() {
  // * Pick a random color from the color array to be the correctColor
  const random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

function generateRandomColors(num) {
  // * Create the color array for the squares
  const arr = [];
  for (let i = 0; i < num; i++) {
    arr.push(randomColor());
  }
  return arr;
}

function randomColor() {
  // * Pick a random value between 0-255 for rgb
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);
  return `rgb(${red}, ${green}, ${blue})`;
}

function changeColors(color) {
  // * Update squares with correctColor once it's selected
  for (let i = 0; i < squares.length; i++) {
    squares[i].style.backgroundColor = color;
  }
}
