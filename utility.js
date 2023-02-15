// Export the pattern as SVG
function exportSvg() {
    // Get a reference to the div element
    const svgElement = document.getElementById('canvas-page');
  
    // Get the SVG XML markup
    var svgXml = new XMLSerializer().serializeToString(svgElement);
    var svgBlob = new Blob([svgXml], {type: "image/svg+xml;charset=utf-8"});
  
    // Create a new URL object from the Blob
    var url = URL.createObjectURL(svgBlob);
  
    // Create a new link element and set its href and download attributes
    var link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "mySVG.svg");
    link.click();
}

// Export the pattern as PNG
function exportPng() {
    // Get a reference to the div element
    const div = document.getElementById('canvas-page');
  
    // Use html2canvas to convert the div to a canvas
    html2canvas(div).then(function(canvas) {
      // Convert the canvas to a PNG image
      const pngData = canvas.toDataURL('image/png');
  
      // Create a link that the user can click to download the image
      const link = document.createElement('a');
      link.href = pngData;
      link.download = 'pattern.png';
      link.click();
    });
}