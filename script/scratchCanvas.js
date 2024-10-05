class ScratchCanvas {
  constructor(canvasId, clearSelector, buttonsSelector) {
    // console.log('here')
    this.canvas = document.querySelector(canvasId);
    this.clearButton = document.querySelector(clearSelector);
    this.brushButtons = document.querySelectorAll(`${buttonsSelector} button`);

    this.ctx = this.canvas.getContext('2d');
    this.isDrawing = false;
    this.brush = 20;
    this.canvas.addEventListener('mousedown', this.startDrawing);
    this.canvas.addEventListener('mousemove', this.draw);
    this.canvas.addEventListener('mouseup', this.stopDrawing);
    this.canvas.addEventListener('touchstart', this.startDrawing);
    this.canvas.addEventListener('touchmove', this.draw);
    this.canvas.addEventListener('touchend', this.stopDrawing);

    this.clearButton.addEventListener('click', this.clearCanvas);

    this.brushButtons.forEach((btn) => {
      btn.addEventListener('click', (event) => {
        if (event.target.classList.contains('larger')) {
          this.changeBrushSize(5);
        } else {
          this.changeBrushSize(-5);
        }
      })
    })
    window.addEventListener('resize', this.resizeCanvas);
    this.resizeCanvas();

  };

  resizeCanvas = () => {
    const pixelRatio = window.devicePixelRatio || 1;
    const width = this.canvas.offsetWidth;
    const height = width / 2.3;

    this.canvas.width = width * pixelRatio;
    this.canvas.height = height * pixelRatio;
    this.canvas.style.width = `${width}px`;
    this.canvas.style.height = `${height}px`;

    this.ctx.scale(pixelRatio, pixelRatio);
    this.drawInitCanvas();
  }

  drawInitCanvas = () => {
    this.ctx.fillStyle = '#555';
    this.ctx.fillRect(0, 0, this.canvas.width / window.devicePixelRatio, this.canvas.height / window.devicePixelRatio);
  }

  startDrawing = (event) => {
    event.preventDefault();
    this.isDrawing = true;
    this.draw(event);
  };
  stopDrawing = () => {
    this.isDrawing = false;
    this.ctx.beginPath();
  };
  draw = (event) => {
    event.preventDefault();
    if (!this.isDrawing) return;

    this.ctx.globalCompositeOperation = 'destination-out';
    this.ctx.lineWidth = this.brush;
    this.ctx.lineCap = 'round';
    this.ctx.strokeStyle = 'rgb(0, 0, 0, 1)';
    const rect = this.canvas.getBoundingClientRect();
    let x, y;
    if (event.touches) {
      const touches = event.touches[0];
      x = touches.clientX - rect.left;
      y = touches.clientY - rect.top;
    } else {
      x = event.clientX - rect.left;
      y = event.clientY - rect.top;
    }

    this.ctx.lineTo(x, y);
    this.ctx.stroke();
    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
  };

  clearCanvas = () => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.resizeCanvas();
  };

  changeBrushSize = (delta) => {
    this.brush = Math.max(1, this.brush + delta)
  };
};
const myCanvas = new ScratchCanvas('#scratchCanvas', '.scratchClear', '.scratchButtons');