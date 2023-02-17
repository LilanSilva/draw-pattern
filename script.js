// Global variables
let patternSize = 2;               
let patternFormat = { col: 9, row: 9, canvasWidth: 1080, canvasHeigth: 1080 };
let patternColors = ['red'];
let patternQuantity = 25;
let outerRatio = 0.7;
let imageType = "svg";


// Resize screen 
function resizeScreen() {
  const patternGrid = document.getElementById("pattern-grid");
  const heightAdjuster = document.getElementById("height-adjuster");
  const canvas = document.getElementById("pattern-svg");

  patternGrid.style.height = (window.innerHeight - (window.innerHeight * 0.16)) + "px";
  heightAdjuster.style.height = (window.innerHeight - 700) + "px";

  var celMinWidth = patternGrid.clientWidth / 16;
  var celMinHeight = patternGrid.clientHeight / 16;
  var minCellSize = Math.floor(celMinWidth > celMinHeight ? celMinHeight : celMinWidth);
  canvas.style.width = (minCellSize * patternFormat.col) + "px";
  canvas.style.height = (minCellSize * patternFormat.row) + "px";

  canvas.width = patternFormat.canvasWidth;
  canvas.height = patternFormat.canvasHeigth;
}

// Draw pattern
function drawPattern() {
    // Calculate number of rows and columns
    let numRows = patternFormat.row;
    let numCols = patternFormat.col;
  
    // Calculate cell size
    const cellSize = 120;
  
    let counter = 0;
    let gridInfo = [];
    // Generate SVG elements
    for (let rowIndex = 0; rowIndex < numRows; rowIndex++) {
      for (let colIndex = 0; colIndex < numCols; colIndex++) {
        const x = rowIndex * cellSize;
        const y = colIndex * cellSize;

        // Only draw if in outer layer or random chance
        if ((rowIndex === 0 || rowIndex === numRows - 1 || colIndex === 0 || colIndex === numCols - 1) && counter < patternQuantity) {
          let item = {};
          item.xValue = x;
          item.yValue = y;
          item.cellSize = cellSize * patternSize;

          gridInfo.push(item);
          counter++;
        }
      }
    }

    generateCanvas(gridInfo);
}

// Donload image 
function downloadImage() {
  if (imageType === 'svg') {
    exportSvg();
  }
  else {
    canvasExportAsPng();
  }
}
  
// Generate canvas based on pattern
function generateCanvas(gridInfo) {
  if (gridInfo.length > 0) {
    resizeScreen();

    var canvas = document.getElementById("pattern-svg");
    var context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);

    gridInfo.forEach((item) => {
      var img = new Image();
      img.src = "data:image/svg+xml;utf8," + encodeURIComponent(transformShape(patternColors, item.cellSize));

      img.onload = function() {
        context.drawImage(img, item.xValue, item.yValue);
      };
    });
  }
}

// Event binder
function eventBinder() {
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
          patternFormat.canvasWidth = 1080;
          patternFormat.canvasHeigth = 1080;
          break;
        case '16x9':
          patternFormat.col = 16;
          patternFormat.row = 9;
          patternFormat.canvasWidth = 1920;
          patternFormat.canvasHeigth = 1080;
          break;
        case '9x16':
          patternFormat.col = 9;
          patternFormat.row = 16;
          patternFormat.canvasWidth = 1080;
          patternFormat.canvasHeigth = 1920;
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

  // Add click event listener to each color radio button
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

  // Add event listener for pattern quantity change
  document.getElementById('pattern-quantity').addEventListener('change', () => {
    patternQuantity = Number(document.getElementById('pattern-quantity').value);
  });

  // Add generate button event listeners
  const generateButton = document.getElementById("generate-button");
  generateButton.addEventListener("click", drawPattern);

  // Add svg listener for pattern quantity change
  document.getElementById('svgLabel').addEventListener('click', () => {
    imageType = 'svg';
  });

  // Add png ang png listener for pattern quantity change
  document.getElementById('pngLabel').addEventListener('click', () => {
    imageType = 'png';
  });

  // Add download button event listner
  const downloadButton = document.getElementById("download-button");
  downloadButton.addEventListener("click", downloadImage);

  window.addEventListener('resize', function() {
    drawPattern();
  });

  resizeScreen();
}
  
// Initialize the UI
function initialize() {
  // event binder
  eventBinder();

  // draw pattern 
  //drawPattern();
}

// Initialize the UI when the page has loaded
window.addEventListener("load", initialize);

  