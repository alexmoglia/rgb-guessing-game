"use strict";

// *** VARIABLES ***
const messageDisplay = document.querySelector("#message");
const colorDisplay = document.querySelector("#colorDisplay");
const squares = document.querySelectorAll(".square");
const h1 = document.querySelector("h1");
const resetButton = document.querySelector("#reset");
const easyButton = document.querySelector("#easy");
const hardButton = document.querySelector("#hard");
let numSquares = 6;
let colors = generateRandomColors(numSquares);
let correctColor = pickCorrectColor();

colorDisplay.textContent = correctColor;

// *** SQUARES ***
for (let i = 0; i < squares.length; i++) {
  // add colors to squares
  squares[i].style.backgroundColor = colors[i];
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

// ** BUTTON FUNCTIONS ***
resetButton.addEventListener("click", function() {
  // generate new colors array
  colors = generateRandomColors(numSquares);
  // pick new random color from array
  correctColor = pickCorrectColor();
  // update colorDisplay span with new color
  colorDisplay.textContent = correctColor;
  // update color of squares with new array
  for (let i = 0; i < squares.length; i++) {
    // add colors to squares
    squares[i].style.backgroundColor = colors[i];
  }
  h1.style.backgroundColor = "steelblue";
  messageDisplay.textContent = "";
  resetButton.textContent = "New Colors";
});

easyButton.addEventListener("click", function() {
  easyButton.classList.add("selected");
  hardButton.classList.remove("selected");
  numSquares = 3;
  colors = generateRandomColors(numSquares);
  correctColor = pickCorrectColor();
  colorDisplay.textContent = correctColor;
  for (let i = 0; i < squares.length; i++) {
    if (colors[i]) {
      squares[i].style.backgroundColor = colors[i];
    } else {
      squares[i].style.display = "none";
    }
  }
});

hardButton.addEventListener("click", function() {
  hardButton.classList.add("selected");
  easyButton.classList.remove("selected");
  numSquares = 6;
  colors = generateRandomColors(numSquares);
  correctColor = pickCorrectColor();
  colorDisplay.textContent = correctColor;
  for (let i = 0; i < squares.length; i++) {
    squares[i].style.backgroundColor = colors[i];
    squares[i].style.display = "block";
  }
});

// *** HELPER FUNCTIONS ***

function pickCorrectColor() {
  // * Pick a random color from the color array to be the correctColor
  const random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

function generateRandomColors(num) {
  // *
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
  // * Update squares with correctly selected color
  for (let i = 0; i < squares.length; i++) {
    squares[i].style.backgroundColor = color;
  }
}
