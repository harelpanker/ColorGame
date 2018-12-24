let numSquaers = 6;
let colors = [];
let squares = document.querySelectorAll('.square');
let pickedColor;
let colorDisplay = document.querySelector('#colorDisplay');
let messageDisplay = document.querySelector('#message');
let h1 = document.querySelector('h1');
let resetButton = document.querySelector('#reset');
let modeButtons = document.querySelectorAll('.mode');

init();

function init() {
    // mode buttons event listeners
    for(let i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener('click', function() {
            modeButtons[0].classList.remove('selected');
            modeButtons[1].classList.remove('selected');
            modeButtons[2].classList.remove('selected');
            this.classList.add('selected');
            if(this.textContent === 'recruited') {
                numSquaers = 3;
            } else if(this.textContent === 'sergeant') {
                numSquaers = 6;
            } else {
                numSquaers = 9;
            }
            reset();
        });
    }

    for (let i = 0; i < squares.length; i++) {
        squares[i].style.background = colors[i];
        // add click listeners to squares
        squares[i].addEventListener('click', function() {
            // grab color of clicked square
            let clickedColer = this.style.backgroundColor;
            // comper color to pickedColor
            if(clickedColer === pickedColor) {
                messageDisplay.textContent = 'Correct!';
                // reset button change text
                resetButton.textContent = 'Play Again?';
                h1.style.backgroundColor = clickedColer;
                changeColors(pickedColor);
            } else {
                this.style.backgroundColor = '#232323';
                messageDisplay.textContent = 'Try Again';
            }
        });
    }
    
    reset();
}

function reset() {
    // generate all new colors
    colors = generateRandomColors(numSquaers);
    // picked a new color from the array
    pickedColor = pickColor();
    // change colorDisplay to match picked color
    colorDisplay.textContent = pickedColor;
    resetButton.textContent = 'New Colors';
    // change colors of squares
    for(let i = 0; i < squares.length; i++) {
        if(colors[i]){
            squares[i].style.display = 'block';
            squares[i].style.backgroundColor = colors[i];
        } else {
            squares[i].style.display = 'none';
        }
    }
    messageDisplay.textContent = '';
    // h1 background reset
    h1.style.backgroundColor = 'steelBlue';
}

resetButton.addEventListener('click', function() {
    reset();
});

colorDisplay.textContent = pickedColor;

function changeColors(color) {
    // loop all squares
    for(let i = 0; i < squares.length; i++) {
        // change to match the given color
        squares[i].style.backgroundColor = pickedColor;
    }
}

function pickColor() {
    let random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

function generateRandomColors(num) {
    // make an array
    let arr =[];
    // add random num of colors to an array
    for(let i = 0; i < num; i++) {
        // get random color and push into array
        arr.push(randomColor());
    }
    // return that array
    return arr;
}

function randomColor() {
    // random for red
    let r = Math.floor(Math.random() * 256);
    // random for green
    let g = Math.floor(Math.random() * 256);
    // random for blue
    let b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}