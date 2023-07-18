// SELECTORS
// Etch a Sketch Container
const etchContainer = document.querySelector("#etchContainer");
// Buttons
const regularMode = document.querySelector("#regularMode");
const rainbowMode = document.querySelector("#rainbowMode");
const eraserMode = document.querySelector("#eraserMode");
const resetButton = document.querySelector("#resetButton");
// Color Input
const colorSelect = document.getElementById("colorSelect");

// Default Variables
const DEFAULT_COLOR = '#000000';
const DEFAULT_GRID_SIZE = 16;
const DEFAULT_COLOR_MODE = 'regular';

let colorTrigger = false;
let color = DEFAULT_COLOR;
let gridSize = DEFAULT_GRID_SIZE;
let mode = DEFAULT_COLOR_MODE;

colorSelect.addEventListener('change', setNewColor, false);
function setNewColor(event) {
    color = event.target.value;
}

// Drawing Event Listeners
etchContainer.addEventListener('mousedown', (e) => {
    colorTrigger = true;
    e.preventDefault();
})
etchContainer.addEventListener('mouseup', () => {
    colorTrigger = false;
})

regularMode.addEventListener("click", () => {
    mode = DEFAULT_COLOR_MODE;
})

rainbowMode.addEventListener("click", () => {
    mode = "rainbow";
})

eraserMode.addEventListener("click", () => {
    mode = "eraser";
})

function gridSetup() {
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            const pixel = document.createElement("div");
            etchContainer.appendChild(pixel);
            pixel.className = "grid";
            pixel.classList.add("gridBox");
            pixel.style.width = `${500 / gridSize}`;
            pixel.style.height = `${500 / gridSize}`;
        }
    }
    draw(color);
}

function draw(color) {
    let pixelElements = document.querySelectorAll(".gridBox");

    for (let pixelElement of pixelElements) {
        pixelElement.addEventListener('mousedown', changeColor);
        pixelElement.addEventListener('mouseover', changeColor);
    }
}

function changeColor(e) {
    if (!colorTrigger) return;
    if (mode === DEFAULT_COLOR_MODE) {
        e.target.style.backgroundColor = color;
        e.target.style.h
    } else if (mode === 'rainbow') {
        let randomRed = Math.floor(Math.random() * 256);
        let randomGreen = Math.floor(Math.random() * 256);
        let randomBlue = Math.floor(Math.random() * 256);
        e.target.style.backgroundColor = `rgb(${randomRed}, ${randomGreen}, ${randomBlue})`;
    } else if (mode === 'eraser') {
        e.target.style.backgroundColor = '#ffffff';
    }
}

function gridRemove() {
    const pixel = document.getElementsByClassName("gridBox");
    while (pixel.length > 0) {
        etchContainer.removeChild(pixel[0]);
    }
}

function promptGridChange() {
    gridSize = prompt("What do you want the size of your grid to be? (Max. 100)");
    if (isNaN(gridSize)) {
        alert("Numbers Only!");
        promptGridChange();
    } else if (gridSize > 100 || gridSize <= 0) {
        alert("Too Big / Small!");
        promptGridChange();
    } else if (gridSize % 1 !== 0) {
        alert("Rounded Numbers Only!");
        promptGridChange();
    } else {
        etchContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    }
}

resetButton.addEventListener("click", function () {
    promptGridChange();
    gridRemove();
    gridSetup();
})

gridSetup();