window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    const avatar = document.getElementById('avatarWrapper');
    const toggleBtn = document.getElementById('modeToggle');
    const card = document.getElementById('linksCard');
    
    // 1. Loading Sequence
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
            avatar.style.opacity = '1';
            
            // Start Shrink + Sparks
            setTimeout(() => {
                avatar.classList.add('shrink');
                startDenseSparks();
            }, 2000);
        }, 1000);
    }, 1500);

    // 2. Click Link Toggle
    document.getElementById('avatarTrigger').addEventListener('click', (e) => {
        e.stopPropagation();
        card.classList.toggle('show');
    });
    document.addEventListener('click', () => card.classList.remove('show'));

    // 3. Mode Toggle
    toggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('matrix-mode');
        if (document.body.classList.contains('matrix-mode')) {
            toggleBtn.innerHTML = "Go Light ☀️";
            initMatrix();
        } else {
            toggleBtn.innerHTML = "Go Dark 👾";
        }
    });
});

// --- SPARKS ---
function startDenseSparks() {
    const end = Date.now() + 1500;
    const interval = setInterval(() => {
        if (Date.now() > end) { clearInterval(interval); return; }
        const avatar = document.getElementById('avatarWrapper');
        const rect = avatar.getBoundingClientRect();
        for(let i=0; i<4; i++) {
            createSpark(rect.left + rect.width/2, rect.top + rect.height/2);
        }
    }, 40);
}

function createSpark(x, y) {
    const spark = document.createElement('div');
    spark.className = 'spark';
    document.body.appendChild(spark);
    const offX = (Math.random() - 0.5) * 60;
    const offY = (Math.random() - 0.5) * 60;
    spark.style.left = (x + offX) + 'px';
    spark.style.top = (y + offY) + 'px';
    spark.style.background = ['#FFD700', '#FFFFFF', '#00ff41'][Math.floor(Math.random() * 3)];
    setTimeout(() => spark.remove(), 1000);
}

// --- MATRIX ---
let matrixInterval;
function initMatrix() {
    if(matrixInterval) clearInterval(matrixInterval);
    const canvas = document.getElementById('matrixCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const letters = "010101010111001";
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const drops = [];
    for (let i = 0; i < columns; i++) drops[i] = 1;

    function draw() {
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#00ff41";
        ctx.font = fontSize + "px monospace";
        for (let i = 0; i < drops.length; i++) {
            const text = letters.charAt(Math.floor(Math.random() * letters.length));
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
            drops[i]++;
        }
    }
    matrixInterval = setInterval(draw, 33);
}

// --- THEME & MOON SWAP ---
function updateTheme() {
    const hour = new Date().getHours();
    const body = document.body;
    const celestial = document.getElementById('celestialBody');

    body.classList.remove('morning', 'afternoon', 'evening', 'night');
    celestial.classList.remove('sun', 'moon');

    let celestialPos;

    if (hour >= 5 && hour < 12) {
        body.classList.add('morning');
        celestial.classList.add('sun');
        celestialPos = 40;
    } else if (hour >= 12 && hour < 17) {
        body.classList.add('afternoon');
        celestial.classList.add('sun');
        celestialPos = 10;
    } else if (hour >= 17 && hour < 20) {
        body.classList.add('evening');
        celestial.classList.add('sun');
        celestialPos = 60;
    } else {
        body.classList.add('night');
        celestial.classList.add('moon'); // Swaps to Moon
        celestialPos = 20;
    }

    celestial.style.top = celestialPos + "%";
}
updateTheme();
setInterval(updateTheme, 60000); // Check every minute