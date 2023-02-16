// Global variables
let patternFormatText = "9x9";      // format input
let patternSize = 50;               // Size input
let patternFormat = { col: 9, row: 9 };
let patternColors = ['red'];
let patternQuantity = 10;
let outerRatio = 0.7;


// Draw pattern
function drawPattern() {
    // Calculate number of rows and columns
    let numRows = patternFormat.row;
    let numCols = patternFormat.col;
  
    // Calculate cell size
    const divElement = document.getElementById('pattern-grid');
    const cellSize = Math.floor((divElement.clientWidth - 100) / numCols);
  
    let counter;
    let gridInfo = [];
    // Generate SVG elements
    for (let rowIndex = 0; rowIndex < numRows; rowIndex++) {
      for (let colIndex = 0; colIndex < numCols; colIndex++) {
        const x = rowIndex * cellSize;
        const y = colIndex * cellSize;

        // Only draw if in outer layer or random chance
        if ((rowIndex === 0 || rowIndex === numRows - 1 || colIndex === 0 || colIndex === numCols - 1) && counter <= patternQuantity) {
          let item = {};
          item.xValue = x;
          item.yValue = y;
          item.cellSize = cellSize;

          gridInfo.push(item);
          counter++;
        }
      }
    }

    // Resize screen 
    const patternGrid = document.getElementById("pattern-grid");
    const heightAdjuster = document.getElementById("height-adjuster");
    patternGrid.style.height = (window.innerHeight - (window.innerHeight * 0.16)) + "px";
    heightAdjuster.style.height = (window.innerHeight - 700) + "px";

    generateCanvas(gridInfo);
}
  
// Generate canvas based on pattern
function generateCanvas(gridInfo) {
  const divElement = document.getElementById('right-menu');

  var img = new Image();
  img.src = "data:image/svg+xml;utf8," + encodeURIComponent(transformShape(patternColors));

  img.onload = function() {
    var canvas = document.getElementById("pattern-svg");
    canvas.style.width = (divElement.clientWidth - (divElement.clientWidth * 0.16)) + "px";
    canvas.style.height = (divElement.clientHeight - 300) + "px";
    var context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(img, 0, 100);
  };
}
  
// Initialize the UI
function initialize() {
  // Add a click event listener to each label
  const formatLabels = document.querySelectorAll('label[for^="format-"]');
  formatLabels.forEach((label) => {
    label.addEventListener('click', () => {
      formatLabels.forEach((label) => {
        label.classList.remove('bold-label');
      });
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
  const sizeLabels = document.querySelectorAll('label[for^="size-"]');
  sizeLabels.forEach((label) => {
      label.addEventListener('click', () => {
        sizeLabels.forEach((label) => {
          label.classList.remove('bold-label');
        });
        label.classList.add('bold-label');
    
        patternSize = Number(label.getAttribute('value'));
      });
  });

  // Add event listener to each color radio button
  const colorRadios = document.querySelectorAll('input[name="color"]');
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

  // Event listener for pattern quantity change
  document.getElementById('pattern-quantity').addEventListener('change', () => {
    patternQuantity = Number(document.getElementById('pattern-quantity').value);
  });

  // Attach event listeners
  const generateButton = document.getElementById("generate-button");
  generateButton.addEventListener("click", drawPattern);

  window.addEventListener('resize', function() {
    drawPattern();
  });

  // draw pattern 
  drawPattern();
}

// Initialize the UI when the page has loaded
window.addEventListener("load", initialize);

  