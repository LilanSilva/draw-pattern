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
