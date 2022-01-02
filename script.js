const etchContainer = document.querySelector("#etchContainer");
const reset = document.querySelector("button");

let gridSize = 16;

function gridSetup() {
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            const pixel = document.createElement("div");
            etchContainer.appendChild(pixel);
            pixel.className = "grid";
            pixel.draggable = "false";
            pixel.classList.add("gridBox");
            pixel.addEventListener('mouseover', () => {
                pixel.style.backgroundColor = "blue";
            })
        }
    }
}

function gridRemove() {
    const pixel = document.getElementsByClassName("gridBox");
    while (pixel.length > 0) {
        etchContainer.removeChild(pixel[0]);
    }
}

reset.addEventListener("click", function () {
    gridSize = prompt("What do you want the size of your grid to be? (Max. 100)");
    gridRemove();
    gridSetup();
})

gridSetup();