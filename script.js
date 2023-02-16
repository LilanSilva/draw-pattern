// Global variables
let patternFormatText = "9x9";      // format input
let patternSize = 50;               // Size input
let patternFormat = { col: 9, row: 9 };
let patternColors = ['red'];
let patternQuantity = 10;
let outerRatio = 0.7;

// Event listener for pattern quantity change
document.getElementById('pattern-quantity').addEventListener('change', () => {
  patternQuantity = Number(document.getElementById('pattern-quantity').value);
  drawPattern();
});

function getSelectedQuantity(){
    return document.getElementById('pattern-quantity').value;
}

// Generate the pattern
function generatePattern() {
  let shapes = [];
  const outerCells = patternFormat.col * 2 + (patternFormat.row - 2) * 2;
  const outerShapeCount = Math.round(patternQuantity * outerRatio);
  const innerShapeCount = patternQuantity - outerShapeCount;

  for (let i = 0; i < outerShapeCount; i++) {
    shapes.push(generateShape(0, outerCells - 1));
  }

  for (let i = 0; i < innerShapeCount; i++) {
    shapes.push(generateShape(outerCells, patternFormat.col * patternFormat.row - 1));
  }

  return shapes;
}

// Generate a single shape
function generateShape(min, max) {
  const type = SHAPE_TYPES[Math.floor(Math.random() * SHAPE_TYPES.length)];
  const rotation = SHAPE_ROTATIONS[Math.floor(Math.random() * SHAPE_ROTATIONS.length)];
  const color = patternColors[Math.floor(Math.random() * patternColors.length)];
  const position = getRandomInt(min, max);
  return { type, rotation, color, position };
}


function drawPattern() {
    const patternCanvas = document.getElementById('pattern-svg');
    const ctx = patternCanvas.getContext('2d');
  
    // Get selected values
    const formatValue = patternFormat;
    const sizeValue = parseInt(patternSize);
    const colorValue = patternColors;
    const quantityValue = parseInt(patternQuantity);
  
    // Calculate number of rows and columns
    let numRows = patternFormat.row;
    let numCols = patternFormat.col;
  
    // Calculate cell size
    const divElement = document.getElementById('canvas-page');
    const cellSize = (divElement.clientWidth - 100) / numCols;
  
    // Generate SVG elements
    for (let rowIndex = 0; rowIndex < numRows; rowIndex++) {
      for (let colIndex = 0; colIndex < numCols; colIndex++) {
        const randomRotation = getRandomInt(4);
        const randomColorIndex = getRandomInt(colorValue.length);
        const colorString = getColorString(colorValue[randomColorIndex]);
        const rotationString = getRotationString(randomRotation);
        const x = j * cellSize;
        const y = i * cellSize;


        // // Only draw if in outer layer or random chance
        // if (rowIndex === 0 || rowIndex === numRows - 1 || colIndex === 0 || colIndex === numCols - 1) {
        //   const rectElement = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        //   rectElement.setAttribute('x', `${x}%`);
        //   rectElement.setAttribute('y', `${y}%`);
        //   rectElement.setAttribute('width', `${cellSize}%`);
        //   rectElement.setAttribute('height', `${cellSize}%`);
        //   rectElement.setAttribute('fill', colorString);
        //   rectElement.setAttribute('transform', rotationString);
        //   svgElement.appendChild(rectElement);
        // }
      }
    }
}
  

  


  
/**
 * Handle the generate button click event
 */
function handleGenerate() {
  // const quantity = getSelectedQuantity();

  // var tt = generatePattern(patternFormatText, patternSize, patternColors, quantity);

  
  
  const divElement = document.getElementById('right-menu');

  var img = new Image();
  var img1 = new Image();
  var img2 = new Image();
  img.src = "data:image/svg+xml;utf8," + encodeURIComponent(transformShape(patternColors));
  img1.src = "data:image/svg+xml;utf8," + encodeURIComponent(transformShape(patternColors));
  img2.src = "data:image/svg+xml;utf8," + encodeURIComponent(transformShape(patternColors));

  img1.onload = function() {
    var canvas = document.getElementById("pattern-svg");
    canvas.width = divElement.clientWidth - 300;
    canvas.height = divElement.clientHeight - 300;
    var context = canvas.getContext("2d");
    context.drawImage(img, 0, 100);
    context.drawImage(img1, 100, 100);
    context.drawImage(img2, 200, 100);
  };
}

// Bold Format option
const formatLabels = document.querySelectorAll('label[for^="format-"]');
const sizeLabels = document.querySelectorAll('label[for^="size-"]');
const colorRadios = document.querySelectorAll('input[name="color"]');

// Add a click event listener to each label
formatLabels.forEach((label) => {
  label.addEventListener('click', () => {
    // Remove the bold class from all labels
    formatLabels.forEach((label) => {
      label.classList.remove('bold-label');
    });
    // Add the bold class to the clicked label
    label.classList.add('bold-label');

    const selectedFormat = label.getAttribute('value');
    switch (selectedFormat) {
      case '9x9':
        patternFormat.col = 9;
        patternFormat.row = 9;
        break;
      case '16x9':
        patternFormat.col = 16;
        patternFormat.row = 9;
        break;
      case '9x16':
        patternFormat.col = 9;
        patternFormat.row = 16;
        break;
    }
  });
});

// Add a click event listener to each label
sizeLabels.forEach((label) => {
    label.addEventListener('click', () => {
      // Remove the bold class from all labels
      sizeLabels.forEach((label) => {
        label.classList.remove('bold-label');
      });
      // Add the bold class to the clicked label
      label.classList.add('bold-label');
  
      patternSize = Number(label.getAttribute('value'));
    });
});

// Add event listener to each color radio button
colorRadios.forEach((radio) => {
    radio.addEventListener('click', (event) => {
        if (event.target.nextElementSibling.querySelector('.rounded-circle').classList.contains('border-2')) {
          event.target.nextElementSibling.querySelector('.rounded-circle').classList.remove('border', 'border-2', 'border-secondary');
          removeItem(patternColors, event.target.nextElementSibling.getAttribute('value'));
        } else {
          event.target.nextElementSibling.querySelector('.rounded-circle').classList.add('border', 'border-2', 'border-secondary');
          patternColors.push(event.target.nextElementSibling.getAttribute('value'));
        }
    });
});

  
/**
 * Initialize the UI
 */
function initialize() {
    // // Generate the initial pattern
    // const quantity = getSelectedQuantity();
  
    // generatePattern(patternFormatText, patternSize, patternColors, quantity);
  
    // Attach event listeners
    const generateButton = document.getElementById("generate-button");
    generateButton.addEventListener("click", handleGenerate);

    const divElement = document.getElementById('right-menu');
    const patternGrid = document.getElementById("pattern-grid");
    const heightAdjuster = document.getElementById("height-adjuster");
    const canvas = document.getElementById("pattern-svg");
    window.addEventListener('resize', function() {
      resizeWindow(patternGrid, heightAdjuster);
    });
}

// get the current width of the div element in pixels
function resizeWindow(patternGrid, heightAdjuster) {
  patternGrid.style.height = (window.innerHeight - (window.innerHeight * 0.16)) + "px";
  heightAdjuster.style.height = (window.innerHeight - 700) + "px";
}
  
// Initialize the UI when the page has loaded
window.addEventListener("load", initialize);

  