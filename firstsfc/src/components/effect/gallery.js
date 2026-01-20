import * as THREE from 'three';
import gsap from 'gsap';

export function initGallery() {
    const images = [
        { url: '/image/pet2.jpg', title: 'Happiness', artist: 'MY PETS' },
        { url: '/image/draww.png', title: 'Creativity', artist: 'ARTWORKS' },
        { url: '/image/family.jpg', title: 'Support', artist: 'FAMILY' },
        { url: '/image/kel.jpg', title: 'Twinkel', artist: 'FUR BABY' },
        { url: '/image/shs.jpg', title: 'Memories', artist: 'SCHOOL DAYS' },
        { url: '/image/tal.jpg', title: 'Talia', artist: 'COMPANION' }
    ];

    const container = document.getElementById('art-gallery-container');
    const titleEl = document.getElementById('art-title');
    const artistEl = document.getElementById('art-artist');

    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    container.appendChild(renderer.domElement);

    const loader = new THREE.TextureLoader();
    const textures = images.map(img => loader.load(img.url));

    const vertexShader = `varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`;
    const fragmentShader = `
        varying vec2 vUv;
        uniform sampler2D texture1;
        uniform sampler2D texture2;
        uniform float dispFactor;
        void main() {
            vec2 uv = vUv;
            gl_FragColor = mix(texture2D(texture1, uv), texture2D(texture2, uv), dispFactor);
        }
    `;

    const material = new THREE.ShaderMaterial({
        uniforms: {
            dispFactor: { value: 0.0 },
            texture1: { value: textures[0] },
            texture2: { value: textures[1] }
        },
        vertexShader,
        fragmentShader,
        transparent: true
    });

    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(mesh);

    let currentIdx = 0;
    function nextSlide() {
        const nextIdx = (currentIdx + 1) % images.length;
        material.uniforms.texture2.value = textures[nextIdx];
        gsap.to(material.uniforms.dispFactor, {
            value: 1,
            duration: 1.2,
            onComplete: () => {
                material.uniforms.texture1.value = textures[nextIdx];
                material.uniforms.dispFactor.value = 0;
                currentIdx = nextIdx;
            }
        });
        if(titleEl) titleEl.innerText = images[nextIdx].title;
        if(artistEl) artistEl.innerText = images[nextIdx].artist;
    }

    setInterval(nextSlide, 5000);
    container.addEventListener('click', nextSlide);

    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
    animate();
}