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

function getColorString(colorOptions) {
    return colorOptions[getRandomInt(colorOptions.length)];
}

function getRandomShape() {
    return SHAPE_TYPES[getRandomInt(SHAPE_TYPES.length)];
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
    var shape = getRandomShape();

    shape = shape.replaceAll('@@size', (size + 'px'));
    shape = shape.replace('@@rotation', getRandomRotation());
    shape = shape.replace('@@color', getColorString(colorOptions));

    return shape;
}
