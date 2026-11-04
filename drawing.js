// 공용 그림판 모듈 - 선생님 화면과 조별 화면이 함께 사용합니다.
// createDrawingBoard(canvas, options) -> { setColor, setEraser, setWidth, undo, clear, setLocked, getDataURL, loadFromDataURL }

const CRAYON_COLORS = [
  { name: 'black', hex: '#4A3F35' },
  { name: 'red', hex: '#FF6B6B' },
  { name: 'orange', hex: '#FFA94D' },
  { name: 'yellow', hex: '#FFD43B' },
  { name: 'green', hex: '#63D471' },
  { name: 'sky', hex: '#4FC3F7' },
  { name: 'blue', hex: '#5C8DFF' },
  { name: 'pink', hex: '#FF8FC4' },
  { name: 'brown', hex: '#B08463' }
];

function createDrawingBoard(canvas, options = {}) {
  const ctx = canvas.getContext('2d');
  let drawing = false;
  let locked = options.locked || false;
  let color = '#4A3F35';
  let width = 6;
  let eraser = false;
  let strokes = []; // for undo: array of {points, color, width, eraser}
  let currentStroke = null;

  function resize() {
    const ratio = window.devicePixelRatio || 1;
    const cssW = canvas.clientWidth;
    const cssH = canvas.clientHeight;
    canvas.width = cssW * ratio;
    canvas.height = cssH * ratio;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    redraw();
  }

  function redraw() {
    const cssW = canvas.clientWidth;
    const cssH = canvas.clientHeight;
    ctx.clearRect(0, 0, cssW, cssH);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, cssW, cssH);
    for (const s of strokes) {
      drawStroke(s);
    }
  }

  function drawStroke(s) {
    if (s.points.length < 1) return;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.strokeStyle = s.eraser ? '#ffffff' : s.color;
    ctx.lineWidth = s.width;
    ctx.beginPath();
    ctx.moveTo(s.points[0].x, s.points[0].y);
    for (let i = 1; i < s.points.length; i++) {
      ctx.lineTo(s.points[i].x, s.points[i].y);
    }
    if (s.points.length === 1) {
      // dot
      ctx.lineTo(s.points[0].x + 0.1, s.points[0].y + 0.1);
    }
    ctx.stroke();
  }

  function getPos(evt) {
    const rect = canvas.getBoundingClientRect();
    const t = evt.touches && evt.touches[0];
    const clientX = t ? t.clientX : evt.clientX;
    const clientY = t ? t.clientY : evt.clientY;
    return { x: clientX - rect.left, y: clientY - rect.top };
  }

  function start(evt) {
    if (locked) return;
    evt.preventDefault();
    drawing = true;
    const p = getPos(evt);
    currentStroke = { points: [p], color, width, eraser };
    strokes.push(currentStroke);
    drawStroke(currentStroke);
  }

  function move(evt) {
    if (!drawing || locked) return;
    evt.preventDefault();
    const p = getPos(evt);
    currentStroke.points.push(p);
    redraw();
  }

  function end(evt) {
    if (!drawing) return;
    drawing = false;
    if (options.onStroke) options.onStroke();
  }

  canvas.addEventListener('mousedown', start);
  canvas.addEventListener('mousemove', move);
  window.addEventListener('mouseup', end);
  canvas.addEventListener('touchstart', start, { passive: false });
  canvas.addEventListener('touchmove', move, { passive: false });
  canvas.addEventListener('touchend', end);

  window.addEventListener('resize', resize);
  resize();

  return {
    setColor(hex) { color = hex; eraser = false; },
    setEraser(on) { eraser = on; },
    setWidth(w) { width = w; },
    undo() {
      strokes.pop();
      redraw();
      if (options.onStroke) options.onStroke();
    },
    clear() {
      strokes = [];
      redraw();
      if (options.onStroke) options.onStroke();
    },
    setLocked(v) { locked = v; },
    getDataURL() { return canvas.toDataURL('image/png'); },
    isEmpty() { return strokes.length === 0; }
  };
}
