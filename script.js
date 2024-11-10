const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
let angle = 0;

function drawPetal(x, y, angle, length, width) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.ellipse(0, -length / 2, width, length, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'yellow';
    ctx.fill();
    ctx.restore();
}

function drawCenter(x, y, radius) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = 'brown';
    ctx.fill();
}

function drawSunflower() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const numPetals = 15;
    const petalLength = 50;
    const petalWidth = 9;
    const centerRadius = 40;

    for (let i = 0; i < numPetals; i++) {
        const petalAngle = (Math.PI * 2 / numPetals) * i + angle;
        drawPetal(centerX, centerY, petalAngle, petalLength, petalWidth);
    }

    drawCenter(centerX, centerY, centerRadius);

    angle += 0.01;
    requestAnimationFrame(drawSunflower);
}

drawSunflower();
function startCountdown() {
    const countdownElement = document.getElementById('countdown');

    function updateCountdown() {
        const now = new Date();

        let targetDate = new Date();
        targetDate.setDate(now.getDate() + ((1 + 7 - now.getDay()) % 7));
        targetDate.setHours(21, 35, 0, 0);

        if (targetDate < now) {
            targetDate.setDate(targetDate.getDate() + 7);
        }

        const diff = targetDate - now;

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        const dateText = `<span class="date">${days}d ${hours}h ${minutes}m ${seconds}s</span>`;
        countdownElement.innerHTML = `Falta ${dateText} para vernos el lunes a las 9:35pm`;
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

startCountdown();

