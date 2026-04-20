// DATA FOR PROJECTS
const projectData = {
    vivek: {
        title: "Project VIVEK",
        content: `
            <h4>Abstract</h4>
            <p>Justice delayed is not merely justice denied; it is justice eroded. India’s judiciary, burdened by an unprecedented backlog, stands at a moment where reform is no longer optional but inevitable.</p>
            <h4>Introduction</h4>
            <p>The Indian judiciary was designed to endure, not to hurry—yet delay has become its quiet undoing. Technology now enters this space not as a saviour, but as a question.</p>
            <h4>The Central Tension</h4>
            <p>Judicial systems answer to two masters: Correctness and Efficiency. VIVEK acts as counsel, not command, ensuring human judgement remains the final authority.</p>
            <div class="quote">"Justice moves slowly not from weakness, but from care." — DS Writers, IFQM 2025</div>
            <a href="https://www.linkedin.com/posts/dhaarmi-sharma_from-a-spark-of-an-idea-to-the-stage-at-activity-7375581143804416000-sxeQ" target="_blank" class="vid-link">Watch Presentation Video 🎥</a>
        `
    },
    vitalink: {
        title: "Vitalink HealthCare",
        content: `<h4>Overview</h4><p>A cross-platform app built with Flutter and Firebase. Features a 3D rotating logo and role-based dashboards for a seamless patient-doctor experience.</p>`
    },
    path: {
        title: "Path Navigator",
        content: `<h4>Overview</h4><p>A C-based navigation tool implementing Dijkstra’s Algorithm to find the shortest path in complex graph networks.</p>`
    }
};

window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    const avatar = document.getElementById('avatarWrapper');
    
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
            avatar.style.opacity = '1';
            setTimeout(() => {
                avatar.classList.add('shrink');
                startDenseSparks();
            }, 2000);
        }, 1000);
    }, 1500);

    // Avatar Click
    document.getElementById('avatarTrigger').addEventListener('click', (e) => {
        e.stopPropagation();
        document.getElementById('linksCard').classList.toggle('show');
    });
    document.addEventListener('click', () => {
        document.getElementById('linksCard').classList.remove('show');
    });

    // Mode Toggle
    document.getElementById('modeToggle').addEventListener('click', function() {
        document.body.classList.toggle('matrix-mode');
        this.innerHTML = document.body.classList.contains('matrix-mode') ? "Go Light ☀️" : "Go Dark 👾";
        if(document.body.classList.contains('matrix-mode')) initMatrix();
    });
});

// PANEL LOGIC
function openProject(key) {
    const data = projectData[key];
    document.getElementById('panelContent').innerHTML = `<h2>${data.title}</h2>${data.content}`;
    document.getElementById('projectPanel').classList.add('open');
}

function closeProject() {
    document.getElementById('projectPanel').classList.remove('open');
}

// SPARKS
function startDenseSparks() {
    const end = Date.now() + 1500;
    const interval = setInterval(() => {
        if (Date.now() > end) { clearInterval(interval); return; }
        const avatar = document.getElementById('avatarWrapper');
        const rect = avatar.getBoundingClientRect();
        for(let i=0; i<4; i++) createSpark(rect.left + rect.width/2, rect.top + rect.height/2);
    }, 40);
}

function createSpark(x, y) {
    const spark = document.createElement('div');
    spark.className = 'spark';
    document.body.appendChild(spark);
    const offX = (Math.random() - 0.5) * 60;
    const offY = (Math.random() - 0.5) * 60;
    spark.style.left = (x + offX) + 'px'; spark.style.top = (y + offY) + 'px';
    spark.style.background = ['#FFD700', '#FFFFFF', '#00ff41'][Math.floor(Math.random() * 3)];
    setTimeout(() => spark.remove(), 1000);
}

// MATRIX & THEME (Already optimized from previous versions)
function updateTheme() {
    const hour = new Date().getHours();
    const celestial = document.getElementById('celestialBody');
    document.body.classList.remove('morning', 'afternoon', 'evening', 'night');
    celestial.classList.remove('sun', 'moon');

    if (hour >= 5 && hour < 12) { document.body.classList.add('morning'); celestial.classList.add('sun'); celestial.style.top="40%"; }
    else if (hour >= 12 && hour < 17) { document.body.classList.add('afternoon'); celestial.classList.add('sun'); celestial.style.top="10%"; }
    else if (hour >= 17 && hour < 20) { document.body.classList.add('evening'); celestial.classList.add('sun'); celestial.style.top="60%"; }
    else { document.body.classList.add('night'); celestial.classList.add('moon'); celestial.style.top="20%"; }
}
updateTheme();
setInterval(updateTheme, 60000);

let matrixInterval;
function initMatrix() {
    if(matrixInterval) clearInterval(matrixInterval);
    const canvas = document.getElementById('matrixCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth; canvas.height = window.innerHeight;
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