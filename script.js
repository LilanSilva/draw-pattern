// Constants
const SHAPE_TYPES = ['square', 'triangle', 'circle'];
const SHAPE_ROTATIONS = [0, 90, 180, 270];

// Global variables
let patternFormatText = "9x9";      // format input
let patternSize = 50;               // Size input
let patternFormat = { width: 9, height: 9 };
let patternColors = ['#000000'];
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
  const outerCells = patternFormat.width * 2 + (patternFormat.height - 2) * 2;
  const outerShapeCount = Math.round(patternQuantity * outerRatio);
  const innerShapeCount = patternQuantity - outerShapeCount;

  for (let i = 0; i < outerShapeCount; i++) {
    shapes.push(generateShape(0, outerCells - 1));
  }

  for (let i = 0; i < innerShapeCount; i++) {
    shapes.push(generateShape(outerCells, patternFormat.width * patternFormat.height - 1));
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

// Constants
const colorOptions = [
    '#3d3d3d',
    '#ffffff',
    '#a5a5a5',
    '#bfbfbf',
    '#d5d5d5',
    '#ebebeb',
    '#f5f5f5',
    '#8b8b8b',
    '#c9c9c9',
    '#e2e2e2',
    '#f2f2f2',
    '#fafafa',
  ];
  
// ------------------- Pattern utility functions ------------------- //

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
  
function getRotationString() {
  let rotation = getRandomInt(4);

  switch (rotation) {
    case 1:
      return 'rotate(90)';
    case 2:
      return 'rotate(180)';
    case 3:
      return 'rotate(270)';
    default:
      return '';
  }
}
  
function getColorString(numberofColorCodes) {
  let colorIndex = getRandomInt(numberofColorCodes);
  return colorOptions[colorIndex];
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
    let numRows, numCols;
    if (formatValue.width === 9 && formatValue.height === 9) {
      numRows = 9;
      numCols = 9;
    } else if (formatValue.width === 16 && formatValue.height === 9) {
      numRows = 9;
      numCols = 16;
    } else if (formatValue.width === 9 && formatValue.height === 16) {
      numRows = 16;
      numCols = 9;
    }
  
    // Calculate cell size
    const cellSize = 100 / sizeValue;
  
    // Generate SVG elements
    const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svgElement.setAttribute('viewBox', '0 0 100 100');
    svgElement.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numCols; j++) {
        const randomRotation = getRandomInt(4);
        const randomColorIndex = getRandomInt(colorValue.length);
        const colorString = getColorString(colorValue[randomColorIndex]);
        const rotationString = getRotationString(randomRotation);
        const x = j * cellSize;
        const y = i * cellSize;


        // Only draw if in outer layer or random chance
        if (i === 0 || i === numRows - 1 || j === 0 || j === numCols - 1 || Math.random() < 0.3) {
          const rectElement = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
          rectElement.setAttribute('x', `${x}%`);
          rectElement.setAttribute('y', `${y}%`);
          rectElement.setAttribute('width', `${cellSize}%`);
          rectElement.setAttribute('height', `${cellSize}%`);
          rectElement.setAttribute('fill', colorString);
          rectElement.setAttribute('transform', rotationString);
          svgElement.appendChild(rectElement);
        }

      }
    }

    const svgString = new XMLSerializer().serializeToString(svgElement);
    const img = new Image();
    img.onload = function() {
      ctx.drawImage(img, 0, 0);
    };
    img.src = 'data:image/svg+xml;base64,' + btoa(svgString);
}
  

  


  
/**
 * Handle the generate button click event
 */
function handleGenerate() {
  // const quantity = getSelectedQuantity();

  // var tt = generatePattern(patternFormatText, patternSize, patternColors, quantity);

  // Get the input values from the user
  const format = "9/9";
  const size = 1;
  const colors = [
    '#3d3d3d',
    '#ffffff',
    '#a5a5a5',
    '#bfbfbf',
    '#d5d5d5',
    '#ebebeb',
    '#f5f5f5',
    '#8b8b8b',
    '#c9c9c9',
    '#e2e2e2',
    '#f2f2f2',
    '#fafafa',
  ];
  const quantity = 15;

  // Calculate the number of rows and columns based on the format and size
  let rows, cols;
  if (format === "9/9") {
    rows = cols = size;
  } else if (format === "16/9") {
    rows = size;
    cols = Math.floor(size * (16/9));
  } else if (format === "9/16") {
    rows = Math.floor(size * (9/16));
    cols = size;
  }

  // Calculate the number of cells in the grid
  const cells = rows * cols;

  // Calculate the number of shapes to generate
  const shapesCount = Math.min(quantity, cells);

  // Calculate the number of shapes that should be in the outermost layer
  const outermostCount = Math.ceil(cells * 0.7);

  // Create an array to store the shapes
  const shapes = [];

  // Generate the shapes
  for (let i = 0; i < shapesCount; i++) {
    const shape = {
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.floor(Math.random() * 4) * 90
    };
    shapes.push(shape);
  }

  // Fill the grid with shapes
  const grid = document.getElementById("grid");
  let shapeIndex = 0;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (i < 2 || i >= rows - 2 || j < 2 || j >= cols - 2 || shapeIndex < outermostCount) {
        const shape = shapes[shapeIndex];
        const cell = document.createElement("div");
        cell.className = "cell";
        cell.style.backgroundColor = shape.color;
        cell.style.transform = `rotate(${shape.rotation}deg)`;
        grid.appendChild(cell);
        shapeIndex++;
      } else {
        const cell = document.createElement("div");
        cell.className = "cell";
        grid.appendChild(cell);
      }
    }
  }
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
        patternFormat.width = 9;
        patternFormat.height = 9;
        break;
      case '16x9':
        patternFormat.width = 16;
        patternFormat.height = 9;
        break;
      case '9x16':
        patternFormat.width = 9;
        patternFormat.height = 16;
        break;
    }
    drawPattern();
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
      drawPattern();
    });
});

// Add event listener to each color radio button
colorRadios.forEach((radio) => {
    radio.addEventListener('click', (event) => {
        // Remove border from all other color radio buttons
        colorRadios.forEach((r) => {
            r.nextElementSibling.querySelector('.rounded-circle').classList.remove('border', 'border-2', 'border-secondary');
        });
    
        // Add border to selected color radio button
        event.target.nextElementSibling.querySelector('.rounded-circle').classList.add('border', 'border-2', 'border-secondary');

        patternColors = event.target.nextElementSibling.getAttribute('value').split(',');
        drawPattern();
    });
});

  
/**
 * Initialize the UI
 */
function initialize() {
    // Generate the initial pattern
    const quantity = getSelectedQuantity();
  
    generatePattern(patternFormatText, patternSize, patternColors, quantity);
  
    // Attach event listeners
    const generateButton = document.getElementById("generate-button");
    generateButton.addEventListener("click", handleGenerate);
}
  
// Initialize the UI when the page has loaded
window.addEventListener("load", initialize);

  