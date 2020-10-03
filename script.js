const canvas = document.getElementById('main');
const childCanvas = document.getElementById('child');
const ctx = canvas.getContext('2d');

const drawStar = (cx, cy, spikes, outerRadius, innerRadius, color) => {
  let rot = Math.PI / 2 * 3;
  let x = cx;
  let y = cy;
  let step = Math.PI / spikes;

  ctx.beginPath();
  ctx.moveTo(cx, cy - outerRadius);

  for (let i = 0; i < spikes; i++) {
    x = cx + Math.cos(rot) * outerRadius;
    y = cy + Math.sin(rot) * outerRadius;
    ctx.lineTo(x, y);
    rot += step;

    x = cx + Math.cos(rot) * innerRadius;
    y = cy + Math.sin(rot) * innerRadius;
    ctx.lineTo(x, y);
    rot += step;
  }
  ctx.lineTo(cx, cy - outerRadius);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
};

const getElementPosition = (obj) => {
  let curleft = 0, curtop = 0;

  if (obj.offsetParent) {
    do {
      curleft += obj.offsetLeft;
      curtop += obj.offsetTop;
    } while (obj === obj.offsetParent);
    return { x: curleft, y: curtop };
  }
  return undefined;
};

const getEventLocation = (element, event) => {
  let pos = getElementPosition(element);

  return {
    x: (event.pageX - pos.x),
    y: (event.pageY - pos.y)
  };
};

const rgbToHex = (r, g, b) => {
  if (r > 255 || g > 255 || b > 255)
    throw 'Invalid color component';
  return ((r << 16) | (g << 8) | b).toString(16);
};

canvas.addEventListener('click', function(event) {
  const eventLocation = getEventLocation(this, event);
  const pixelData = ctx.getImageData(eventLocation.x, eventLocation.y, 1, 1).data;
  let hex = '';

  if((pixelData[0] === 0) && (pixelData[1] === 0) && (pixelData[2] === 0) && (pixelData[3] === 0)){
    hex = '#ffffff';
  } else {
    hex = '#' + ('000000' + rgbToHex(pixelData[0], pixelData[1], pixelData[2])).slice(-6);
  }

  childCanvas.style.backgroundColor = hex;
});

document.addEventListener('DOMContentLoaded', () => {
  drawStar(75, 100, 5, 30, 15, 'blue');
  drawStar(180, 200, 5, 30, 15, 'red');
  drawStar(400, 250, 5, 30, 15, 'yellow');
  drawStar(300, 450, 5, 30, 15, 'green');
  drawStar(150, 500, 5, 30, 15, 'black');
});
