class ScratchCanvas {
  constructor(canvasId, textCanvasId, clearSelector, buttonsSelector, inputSelector) {
    this.canvas = document.querySelector(canvasId);
    this.textCanvas = document.querySelector(textCanvasId);
    this.clearButton = document.querySelector(clearSelector);
    this.brushButtons = document.querySelectorAll(`${buttonsSelector} button`);
    this.inputText = document.querySelector(inputSelector);

    this.ctx = this.canvas.getContext('2d');
    this.ctxText = this.textCanvas.getContext('2d');
    this.isDrawing = false;
    this.brush = 120;
    this.textValue = this.inputText.value;

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
    window.addEventListener('resize', debounce(this.resizeCanvas));
    this.inputText.addEventListener('input', debounce(this.drawText.bind(this)));
    this.resizeCanvas();

  };

  resizeCanvas = () => {
    if (!this.canvas) return;
    const pixelRatio = window.devicePixelRatio || 1;
    const width = this.canvas.offsetWidth;
    const height = width / 2.3;

    this.canvas.width = width * pixelRatio;
    this.canvas.height = height * pixelRatio;
    this.canvas.style.width = `${width}px`;
    this.canvas.style.height = `${height}px`;

    this.textCanvas.width = width * pixelRatio;
    this.textCanvas.height = height * pixelRatio;
    this.textCanvas.style.width = `${width}px`;
    this.textCanvas.style.height = `${height}px`;

    this.ctx.scale(pixelRatio, pixelRatio);
    this.ctxText.scale(pixelRatio, pixelRatio);
    this.drawInitCanvas();
  };
  drawText() {
    this.textValue = this.inputText.value;
    this.ctxText.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctxText.fillStyle = '#111';
    const width = this.canvas.width / window.devicePixelRatio;
    const height = this.canvas.height / window.devicePixelRatio;
    const textWidth = (width / 2) - this.ctxText.measureText(this.textValue).width / 2;

    this.ctxText.fillText(this.textValue, textWidth, height / 2);

  }

  drawInitCanvas = () => {
    this.ctx.fillStyle = '#2d2820';
    this.drawText();
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
const myCanvas = new ScratchCanvas('#scratchCanvas', '#canvasText', '.scratchClear', '.scratchButtons', '.canvasInput');