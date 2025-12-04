const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");

let options = ["TSEAS", "INFANTIL", "INFORMÁTICA", "SANIDAD"];
let arc = (2 * Math.PI) / options.length;
let angle = 0;
let spinning = false;

// Lista de colores únicos aleatorios
let colors = [];

// Genera un color aleatorio por opción
function generateColors() {
  colors = options.map(() => {
    const r = Math.floor(Math.random() * 200 + 30);
    const g = Math.floor(Math.random() * 200 + 30);
    const b = Math.floor(Math.random() * 200 + 30);
    return `rgb(${r}, ${g}, ${b})`;
  });
}

// Dibujar rueda
function drawWheel() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  arc = (2 * Math.PI) / options.length;

  for (let i = 0; i < options.length; i++) {
    let start = arc * i + angle;

    // Color único por opción
    ctx.fillStyle = colors[i];

    ctx.beginPath();
    ctx.moveTo(250, 250);
    ctx.arc(250, 250, 250, start, start + arc);
    ctx.lineTo(250, 250);
    ctx.fill();

    // Texto
    ctx.save();
    ctx.translate(250, 250);
    ctx.rotate(start + arc / 2);
    ctx.textAlign = "right";
    ctx.fillStyle = "#000";
    ctx.font = "20px Arial";
    ctx.fillText(options[i], 230, 10);
    ctx.restore();
  }
}

// Animación del giro (rápida y corta)
function spinWheel() {
  if (spinning) return;
  spinning = true;

  let speed = Math.random() * 0.5 + 0.35; // velocidad inicial
  let slowdown = 0.96; // desaceleración

  function animate() {
    angle += speed;
    speed *= slowdown;

    drawWheel();

    if (speed > 0.01) {
      // termina pronto
      requestAnimationFrame(animate);
    } else {
      spinning = false;
      showResult();
    }
  }

  animate();
}

// Mostrar resultado según la flecha lateral
function showResult() {
  const normalizedAngle =
    (2 * Math.PI - (angle % (2 * Math.PI))) % (2 * Math.PI);
  const index = Math.floor(normalizedAngle / arc);
  alert("Resultado: " + options[index]);
}

// Botón girar
document.getElementById("spin").addEventListener("click", spinWheel);

// Botón actualizar opciones
document.getElementById("update").addEventListener("click", () => {
  options = document
    .getElementById("options")
    .value.split("\n")
    .map((o) => o.trim())
    .filter((o) => o.length > 0);

  generateColors();
  drawWheel();
});

// Inicializar colores y rueda al cargar
generateColors();
drawWheel();
