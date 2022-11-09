const etchContainer = document.querySelector("#etchContainer");
const reset = document.querySelector("button");

let colorTrigger = false;
let color = "blue";

etchContainer.addEventListener('mousedown', (e) => {
    colorTrigger = true;
    e.preventDefault();
})

etchContainer.addEventListener('mouseup', () => {
    colorTrigger = false;
})

let gridSize = 16;

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
        pixelElement.addEventListener('mousedown', () => {
            pixelElement.style.backgroundColor = color;
        })
        pixelElement.addEventListener('mousemove', () => {
            if (colorTrigger) {
                pixelElement.style.backgroundColor = color;
            }
        })
    }
}

function gridRemove() {
    const pixel = document.getElementsByClassName("gridBox");
    while (pixel.length > 0) {
        etchContainer.removeChild(pixel[0]);
    }
}

function promptGridChange(){
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

reset.addEventListener("click", function () {
    promptGridChange();
    gridRemove();
    gridSetup();
})

gridSetup();