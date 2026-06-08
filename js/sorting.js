const size = 10;
function generateRandomArray(){
    const randomArray = [];
    for(let i=0; i<size; i++){
        randomArray.push(Math.floor(Math.random()*99)+1);
    }
    return randomArray;
}

function renderArray(array){
    const container = document.getElementById("array-container");
    container.innerHTML = "";

    array.forEach(element => {

        const wrapper = document.createElement("div");
        wrapper.style.display = "flex";
        wrapper.style.flexDirection = "column";
        wrapper.style.alignItems = "center";

        const bar = document.createElement("div");
        bar.style.height = element*2 + "px" ;
        bar.style.width = "25px";
        bar.style.backgroundColor = "#98B4D4";
        bar.classList.add("bar");
        bar.style.fontFamily = "Tahoma";

        const label = document.createElement("div");
        label.innerHTML = element;
        label.style.fontSize = "0.75rem";
        label.style.marginTop = "4px";
        label.classList.add("bar-label");

        wrapper.appendChild(bar);
        wrapper.appendChild(label);
        container.appendChild(wrapper);
    });
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function bubbleSortAnimated(array){
    document.querySelector("#sort-btn").disabled = true;
    document.querySelector("#shuffle-btn").disabled = true;

    const slider = document.querySelector("#speed-slider");
    slider.disabled = true;

    const delay = 510 - (slider.value*5);
    const bars = document.querySelectorAll(".bar");
    const labels = document.querySelectorAll(".bar-label")
    let temp;
    for(let i=0; i<array.length; i++){
        for(let j=0; j<array.length-1-i; j++){
            bars[j].style.backgroundColor = "orange";
            bars[j+1].style.backgroundColor = "orange";
            await sleep(delay);
            if(array[j] > array[j+1]){
                temp = array[j];
                array[j] = array[j+1];
                array[j+1] = temp;
                [bars[j].style.height, bars[j+1].style.height] = [bars[j+1].style.height, bars[j].style.height];
                [labels[j].innerHTML, labels[j+1].innerHTML] = [labels[j+1].innerHTML, labels[j].innerHTML];
            }
            bars[j].style.backgroundColor = "#98B4D4";
            bars[j+1].style.backgroundColor = "#98B4D4";
        }
        bars[array.length-1-i].style.backgroundColor = "#008000";
    }
    document.querySelector("#sort-btn").disabled = false;
    document.querySelector("#shuffle-btn").disabled = false;
    slider.disabled = false;
    return array;
}

let currentArray = generateRandomArray();
renderArray(currentArray);

let shuffleButton = document.getElementById("shuffle-btn");
shuffleButton.addEventListener("click", function() {
    currentArray = generateRandomArray();
    renderArray(currentArray);
})

let sortButton = document.getElementById("sort-btn");

sortButton.addEventListener("click", () => {
    const dropdownVal = document.getElementById("select-algo").value;
    if(dropdownVal == "bubble"){
    bubbleSortAnimated(currentArray);
    }
})
