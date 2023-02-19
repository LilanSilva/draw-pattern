// Global variables
let patternSize = 2;               
let patternFormat = { col: 9, row: 9, canvasWidth: 1080, canvasHeigth: 1080 };
let patternColors = ['red'];
let patternQuantity = 10;
let outerRatio = 0.7;
let imageType = "svg";

/**************************** Transform ******************************/
// Constants
const SHAPE_TYPES = [
  '<svg height="@@size" width="@@size" transform="@@rotation" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 300 300" style="fill: @@color;" xml:space="preserve"><path d="M150,0C67.29,0,0,67.29,0,150v150h112.5h75H300V150C300,67.29,232.71,0,150,0z M147.95,222.92\n c-39.14,0-70.87-31.73-70.87-70.87s31.73-70.87,70.87-70.87c39.14,0,70.87,31.73,70.87,70.87S187.09,222.92,147.95,222.92z"/></svg>', 
  '<svg height="@@size" width="@@size" transform="@@rotation" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 300 300" style="fill: @@color;" xml:space="preserve"><path d="M300,300H187.5c0-103.39-84.11-187.5-187.5-187.5V0C165.42,0,300,134.58,300,300z"/></svg>', 
  '<svg height="@@size" width="@@size" transform="@@rotation" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 300 300" style="fill: @@color;" xml:space="preserve"><path d="M300,300H150C67.29,300,0,232.71,0,150S67.29,0,150,0h150v112.5H150c-20.68,0-37.5,16.82-37.5,37.5\n s16.82,37.5,37.5,37.5h150V300z"/></svg>'];
const SHAPE_ROTATIONS = [0, 90, 180, 270];

// Get random number
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

// Get rotate status
function getRandomRotation() {
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

// Transform shape according to provide settings
function transformShape(colorOptions, size) {
  var shape = SHAPE_TYPES[getRandomInt(SHAPE_TYPES.length)];

  shape = shape.replaceAll('@@size', (size + 'px'));
  shape = shape.replace('@@rotation', getRandomRotation());
  shape = shape.replace('@@color', colorOptions[getRandomInt(colorOptions.length)]);

  return shape;
}

/************************* Utility Support ****************************/
// Export the pattern as SVG
function exportSvg() {
  var canvas = document.getElementById("pattern-svg");
  var context = canvas.getContext("2d");
  var imageData = context.getImageData(0, 0, canvas.width, canvas.height);

  // Create an SVG image element with the same dimensions as the canvas
  var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="' + canvas.width + '" height="' + canvas.height + '">';

  // Loop through the pixels of the canvas and add them to the SVG image
  for (var i = 0; i < imageData.data.length; i += 4) {
    var r = imageData.data[i];
    var g = imageData.data[i + 1];
    var b = imageData.data[i + 2];
    var a = imageData.data[i + 3];

    svg += '<rect x="' + ((i / 4) % canvas.width) + '" y="' + Math.floor(i / (4 * canvas.width)) + '" width="1" height="1" fill="rgba(' + r + ',' + g + ',' + b + ',' + (a / 255) + ')" />';
  }
  svg += '</svg>';

  var blob = new Blob([svg], { type: 'image/svg+xml' });
  var url = URL.createObjectURL(blob);

  var link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', "pattern.svg");
  link.style.display = 'none';

  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Export the pattern as PNG
function exportPng() {
  const canvas = document.getElementById('pattern-svg');
  const dataURL = canvas.toDataURL("image/png");

  const link = document.createElement("a");
  link.download = "pattern.png";
  link.href = dataURL;

  // Simulate a click on the link element to trigger the download
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Remove specific item from array
function removeItem(array, item) {
  const index = array.indexOf(item);
  if (index > -1) {
    array.splice(index, 1);
  }

  return array;
}


/************************** Draw image ***********************/
// Resize screen 
function resizeScreen() {
  const rightMenu = document.getElementById("right-menu");
  const patternGrid = document.getElementById("pattern-grid");
  const heightAdjuster = document.getElementById("height-adjuster");
  const canvas = document.getElementById("pattern-svg");

  patternGrid.style.height = (window.innerHeight - (window.innerHeight * 0.16)) + "px";
  heightAdjuster.style.height = (window.innerHeight - 700) + "px";

  var celMinWidth = rightMenu.clientWidth / 16;
  var celMinHeight = rightMenu.clientHeight / 16;
  var minCellSize = Math.floor(celMinWidth > celMinHeight ? celMinHeight : celMinWidth);
  canvas.style.width = (minCellSize * patternFormat.col) + "px";
  canvas.style.height = (minCellSize * patternFormat.row) + "px";

  canvas.width = patternFormat.canvasWidth;
  canvas.height = patternFormat.canvasHeigth;
}

// Get drawing points
function GetPosibleDrawingPoints() {
  var posibleCells = [];
  for (let i = 0; i < patternFormat.col - (patternSize - 1); i++) {
    for (let j = 0; j < patternFormat.row - (patternSize - 1); j++) {
      if (i === 0 || i === patternFormat.col - patternSize || j === 0 || j === patternFormat.row - patternSize) {
        posibleCells.push({x: i, y: j});
      }
    }
  }

  return posibleCells;
}

// Check overlap
function checkOverlap(gridInfo, randomCel) {
  let overlapStatus = false;

  for (let i = 0; i < gridInfo.length; i++) {
    if ((gridInfo[i].xValue < randomCel.x && gridInfo[i].xValue + patternSize > randomCel.x) || (gridInfo[i].xValue > randomCel.x && gridInfo[i].xValue - patternSize < randomCel.x)) {
      overlapStatus = true;
      break;
    }
    else if ((gridInfo[i].yValue < randomCel.y && gridInfo[i].yValue + patternSize > randomCel.y) || (gridInfo[i].yValue > randomCel.y && gridInfo[i].yValue - patternSize < randomCel.y)) {
      overlapStatus = true;
      break;
    } 
    else if (randomCel.x === gridInfo[i].xValue && gridInfo[i].yValue + patternSize > randomCel.y) {
      overlapStatus = true;
      break;
    }
  }

  return overlapStatus;
}

// Draw pattern
function drawPattern() {
  let maximumOverlapChecker = 0;
  let gridInfo = [];
  let possiblePoints = GetPosibleDrawingPoints();

  for (let i = 0; i < patternQuantity; i++) {
    let arrayIndex = getRandomInt(possiblePoints.length);
    let randomCel = possiblePoints[arrayIndex];

    if (patternSize === 1 || !checkOverlap(gridInfo, randomCel)) {
      let item = {
        xValue: randomCel.x,
        yValue: randomCel.y
      };

      gridInfo.push(item);
      possiblePoints.splice(arrayIndex, 1);
    }
    else {
      // Fix overlap issue
      i--;
      maximumOverlapChecker++;

      if (maximumOverlapChecker === 2000) {
        break;
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
    exportPng();
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
      img.src = "data:image/svg+xml;utf8," + encodeURIComponent(transformShape(patternColors, patternSize * 120));

      img.onload = function() {
        context.drawImage(img, item.xValue * 120, item.yValue * 120);
      };
    });
  }
}

/************************** Event binder ***********************/
// Bind page event
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

      resizeScreen();
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

  