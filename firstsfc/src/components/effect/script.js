export function initPortfolioEffects() {
    // --- ALBUM DATA ---
    const albums = {
        'pets': ['/image/kel.jpg', '/image/pet2.jpg', '/image/tal.jpg'],
        'art': ['/image/draww.png'],
        'family': ['/image/family.jpg'],
        'hobbies': ['/image/shs.jpg'],
        'memories': ['/image/me.png']
    };

    let currentAlbum = [];
    let currentImgIndex = 0;

    // --- CURSOR FIREWORKS ---
    const clickCanvas = document.getElementById('click-canvas');
    if (clickCanvas) {
        const clickCtx = clickCanvas.getContext('2d');
        clickCanvas.width = window.innerWidth;
        clickCanvas.height = window.innerHeight;
        let clickParticles = [];

        window.addEventListener('mousedown', (e) => {
            for (let i = 0; i < 12; i++) {
                clickParticles.push({
                    x: e.clientX, y: e.clientY,
                    vx: (Math.random() - 0.5) * 8, vy: (Math.random() - 0.5) * 8,
                    life: 1, color: `hsl(${Math.random() * 360}, 100%, 60%)`
                });
            }
        });

        function animateParticles() {
            clickCtx.clearRect(0, 0, clickCanvas.width, clickCanvas.height);
            clickParticles.forEach((p, i) => {
                p.x += p.vx; p.y += p.vy; p.life -= 0.05;
                clickCtx.fillStyle = p.color;
                clickCtx.globalAlpha = p.life;
                clickCtx.beginPath(); clickCtx.arc(p.x, p.y, 3, 0, Math.PI * 2); clickCtx.fill();
                if(p.life <= 0) clickParticles.splice(i, 1);
            });
            requestAnimationFrame(animateParticles);
        }
        animateParticles();
    }

    // --- SLOT MACHINE LOGIC ---
    const reels = [
        document.getElementById('reel-1'), document.getElementById('reel-2'),
        document.getElementById('reel-3'), document.getElementById('reel-4'),
        document.getElementById('reel-5')
    ];
    const finalWord = "HELLO";

    if (reels[0]) {
        reels.forEach((reel, i) => {
            let count = 0;
            let interval = setInterval(() => {
                reel.innerText = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[Math.floor(Math.random() * 26)];
                count++;
                if (count > 20 + (i * 5)) {
                    clearInterval(interval);
                    reel.innerText = finalWord[i];
                    if (i === 4) {
                        document.getElementById('enter-btn').style.opacity = 1;
                        document.getElementById('enter-btn').style.pointerEvents = "auto";
                    }
                }
            }, 50);
        });
    }

    // --- LIGHTBOX LOGIC ---
    document.querySelectorAll('.polaroid').forEach(card => {
        card.onclick = () => {
            const key = card.getAttribute('data-album');
            if (albums[key]) {
                currentAlbum = albums[key];
                currentImgIndex = 0;
                document.getElementById('lightbox').style.display = "flex";
                document.getElementById('lightbox-img').src = currentAlbum[0];
            }
        };
    });
}