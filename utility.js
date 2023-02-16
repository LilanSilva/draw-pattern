
// Export the pattern as SVG
function divExportAsSvg() {
    const svgElement = document.getElementById('pattern-svg');
  
    var svgXml = new XMLSerializer().serializeToString(svgElement);
    var svgBlob = new Blob([svgXml], {type: "image/svg+xml;charset=utf-8"});
    var url = URL.createObjectURL(svgBlob);

    var link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "pattern.svg");
    link.click();
}

// Export the pattern as SVG
function canvasExportAsSvg() {

}

// Export the pattern as PNG
function divExportAsPng() {
    const div = document.getElementById('pattern-svg');
  
    html2canvas(div).then(function(canvas) {
      const pngData = canvas.toDataURL('image/png');
  
      const link = document.createElement('a');
      link.href = pngData;
      link.download = 'pattern.png';
      link.click();
    });
}

// Export the pattern as PNG
function canvasExportAsPng() {
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
