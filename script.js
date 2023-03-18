const targetColourBox = document.getElementById("target-colour-box");
const playerColourBox = document.getElementById("player-colour-box");
const redSlider = document.getElementById("red-slider");
const greenSlider = document.getElementById("green-slider");
const blueSlider = document.getElementById("blue-slider");
const difficultySelect = document.getElementById("difficulty");
const timerElement = document.getElementById("timer");
const startResetButton = document.getElementById("start-reset-button");

let targetColour = { r: 0, g: 0, b: 0 };
let timer;
let startTime;

function generateRandomColour() {
  return {
    r: Math.floor(Math.random() * 256),
    g: Math.floor(Math.random() * 256),
    b: Math.floor(Math.random() * 256),
  };
}

function colourToCSS(colour) {
  return `rgb(${colour.r}, ${colour.g}, ${colour.b})`;
}

function updatePlayerColourBox() {
  playerColourBox.style.backgroundColor = colourToCSS({
    r: parseInt(redSlider.value),
    g: parseInt(greenSlider.value),
    b: parseInt(blueSlider.value),
  });
}

function startTimer() {
  startTime = Date.now();
  timer = setInterval(() => {
    const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    const minutes = Math.floor(elapsedTime / 60);
    const seconds = elapsedTime % 60;
    timerElement.textContent = `${
minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}, 1000);
}

function stopTimer() {
clearInterval(timer);
}

function resetTimer() {
timerElement.textContent = "00:00";
}

function isColourMatched() {
const playerColour = {
r: parseInt(redSlider.value),
g: parseInt(greenSlider.value),
b: parseInt(blueSlider.value),
};

const tolerance = {
expert: 0,
medium: 20,
easy: 50,
}[difficultySelect.value];

const diff = (a, b) => Math.abs(a - b);

return (
diff(playerColour.r, targetColour.r) <= tolerance &&
diff(playerColour.g, targetColour.g) <= tolerance &&
diff(playerColour.b, targetColour.b) <= tolerance
);
}

function startResetGame() {
if (timer) {
stopTimer();
resetTimer();
}

targetColour = generateRandomColour();
targetColourBox.style.backgroundColor = colourToCSS(targetColour);
redSlider.value = 0;
greenSlider.value = 0;
blueSlider.value = 0;
updatePlayerColourBox();
startTimer();
 targetColourBox.style.backgroundColor = colourToCSS(targetColour);
  playerColourBox.style.backgroundColor = colourToCSS({
    r: 0,
    g: 0,
    b: 0
  });
}

redSlider.addEventListener("input", () => {
updatePlayerColourBox();
if (isColourMatched()) {
stopTimer();
alert("Well done Abi! You matched the colour!");
}
});

greenSlider.addEventListener("input", () => {
updatePlayerColourBox();
if (isColourMatched()) {
stopTimer();
alert("Well done Abi! You matched the colour!");
}
});

blueSlider.addEventListener("input", () => {
updatePlayerColourBox();
if (isColourMatched()) {
stopTimer();
alert("Well done Abi! You matched the colour!");
}
});

startResetButton.addEventListener("click", startResetGame);

// Initialize the game
startResetGame();
