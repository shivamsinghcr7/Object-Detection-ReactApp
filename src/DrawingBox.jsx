const DrawingBox = (detection, ctx) => {
  detection.forEach((prediction) => {
    const [x, y, width, height] = prediction["bbox"];
    const text = prediction["class"];

    // Styling
    const color = "green";
    ctx.strokeStyle = color;
    ctx.font = "18px Arial";
    ctx.fillStyle = color;

    //Draw box and write text
    ctx.beginPath();
    ctx.fillText(text, x, y);
    ctx.rect(x, y, width, height);
    ctx.stroke();
  });
};

export { DrawingBox };
