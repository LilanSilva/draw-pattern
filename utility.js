
// Export the pattern as SVG
function exportSvg() {
    const svgElement = document.getElementById('canvas-page');
  
    var svgXml = new XMLSerializer().serializeToString(svgElement);
    var svgBlob = new Blob([svgXml], {type: "image/svg+xml;charset=utf-8"});
    var url = URL.createObjectURL(svgBlob);

    var link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "mySVG.svg");
    link.click();
}

// Export the pattern as PNG
function exportPng() {
    const div = document.getElementById('canvas-page');
  
    html2canvas(div).then(function(canvas) {
      const pngData = canvas.toDataURL('image/png');
  
      const link = document.createElement('a');
      link.href = pngData;
      link.download = 'pattern.png';
      link.click();
    });
}

// Remove specific item from array
function removeItem(array, item) {
  const index = array.indexOf(item);
  if (index > -1) {
    array.splice(index, 1);
  }

  return array;
}
