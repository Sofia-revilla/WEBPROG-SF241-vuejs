<template>
  <div :class="['app-wrapper', { 'locked': isLocked }]">
    <div class="cursor-dot" data-cursor-dot></div>
    <div class="cursor-outline" data-cursor-outline></div>
    <canvas id="click-canvas"></canvas>

    <div id="heart-nav-toggle" class="heart-fab sfx-trigger" @click="toggleSideNav">
        <img src="https://i.pinimg.com/originals/6a/71/c8/6a71c8522afd22f20c4e78f96cf0b150.gif" alt="Heart Nav">
    </div>

    <div id="side-nav" :class="{ 'active': isSideNavActive }">
        <span class="close-nav" @click="toggleSideNav">&times;</span>
        <h3>Menu</h3>
        <a href="#" @click.prevent="scrollToSection('hero')">Home</a>
        <a href="#" @click.prevent="scrollToSection('resume-section')">Resume</a>
        <a href="#" @click.prevent="scrollToSection('projects')">Projects</a>
        <a href="#" @click.prevent="scrollToSection('gallery-section')">Life Gallery</a>
        <div class="nav-contact-bonus">
            <p><i class="bi bi-envelope"></i> sofia.revilla@example.com</p>
        </div>
    </div>

    <div v-if="showWelcome" id="welcome-screen">
        <div class="slot-machine-container">
            <div class="slot-window">
                <div class="slot-reel" id="reel-1">?</div>
                <div class="slot-reel" id="reel-2">?</div>
                <div class="slot-reel" id="reel-3">?</div>
                <div class="slot-reel" id="reel-4">?</div>
                <div class="slot-reel" id="reel-5">?</div>
            </div>
            <div id="slot-sub" class="slot-sub">THERE</div>
            <button id="enter-btn" @click="enterProfile" style="opacity: 0; pointer-events: none;">ENTER PROFILE</button>
        </div>
    </div>

    <div class="app-container">
        <nav class="nav-bar">
            <div class="nav-left-icons">
                <a href="https://www.linkedin.com/in/ma-sofia-anne-revilla-" target="_blank" class="icon-box"><i class="bi bi-linkedin"></i></a>
                <div class="icon-box" @click="toggleTheme"><i class="bi bi-moon"></i></div>
                <a href="#" class="btn-pill btn-fill" @click.prevent="openModal('References', 'External links...')">REFERENCES</a>
            </div>
            <div class="nav-menu"><span class="active">BSCS-SF Student Profile</span></div>
            <div class="nav-auth-buttons">
                <button class="btn-pill btn-outline" @click="openModal('Contact', 'Email: sofia.revilla@example.com')">Contact Me</button>
                <a href="https://github.com/Sofia-revilla" target="_blank" class="btn-pill btn-fill">GitHub</a>
            </div>
        </nav>

        <section class="hero-banner" id="hero">
            <div class="hero-text">
                <h1>Ma. Sofia Anne</h1>
                <p><strong>Future Military Cyber Specialist & Veterinarian</strong></p>
                <button id="weakness-btn" class="btn-pill btn-outline">View Weakness ⚠️</button>
            </div>
            <div class="hero-img-wrapper">
                <img src="/image/me.png" alt="Active" class="char-light">
                <img src="/image/mesleep.png" alt="Sleeping" class="char-dark">
            </div>
        </section>

        <div class="dashboard-grid">
            <div id="vue-capabilities-app" class="capabilities-display">
                <div class="section-header" style="color: white;">Capabilities</div>
                <div class="scrolling-wrapper">
                    <div class="scroll-content" :style="{ transform: 'translateY(' + scrollY + 'px)' }">
                        <div v-for="(item, index) in capabilities" :key="index" class="cap-item">
                            <div class="cap-icon-box">{{ item.icon }}</div>
                            <div class="cap-info">
                                <h4>{{ item.title }}</h4>
                                <small>{{ item.desc }}</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-gallery-wide centered-gallery" id="gallery-section" style="margin-top: 50px;">
            <div class="section-header">Life Gallery</div>
            <div id="art-gallery-container" class="art-container landscape-art">
                <div class="art-ui">
                    <h2 id="art-title">Loading...</h2>
                    <p id="art-artist">MEMORIES</p>
                </div>
            </div>
        </div>

        <div id="lightbox" class="lightbox">
            <span class="close-btn">&times;</span>
            <div class="lightbox-nav prev-btn"><i class="bi bi-chevron-left"></i></div>
            <img class="lightbox-content" id="lightbox-img">
            <div class="lightbox-nav next-btn"><i class="bi bi-chevron-right"></i></div>
            <div id="caption"></div>
            <div id="album-counter">1 / 1</div>
        </div>
    </div>

    <div v-if="activeModal" class="modal-overlay" style="display: flex;">
        <div class="modal-content">
            <span class="close-modal" @click="activeModal = null">&times;</span>
            <h2>{{ modalTitle }}</h2>
            <div v-html="modalBody"></div>
        </div>
    </div>
  </div>
</template>

<script>
// Import logic functions from your effect folder
import { initGallery } from './effect/gallery.js';
import { initPortfolioEffects } from './effect/script.js';

export default {
  name: 'PersonalProfile',
  data() {
    return {
      isLocked: true,
      showWelcome: true,
      isSideNavActive: false,
      activeModal: false,
      modalTitle: '',
      modalBody: '',
      scrollY: 0,
      capabilities: [
        { title: 'Web Development', desc: 'HTML, CSS, JS, Vue', icon: '💻' },
        { title: 'Cyber Security', desc: 'Forensics, Linux', icon: '🔐' },
        { title: 'Database Mgmt', desc: 'MySQL, PHP', icon: '🗄️' },
        { title: 'Creative Arts', desc: 'Photoshop, Procreate', icon: '🎨' },
        { title: 'Video Editing', desc: 'Premiere, CapCut', icon: '🎬' },
        { title: 'Hardware', desc: 'Arduino, Networking', icon: '🔌' }
      ]
    }
  },
  mounted() {
    // Start effects after DOM is ready
    initGallery();
    initPortfolioEffects();
    this.startScrollAnimation();
  },
  methods: {
    enterProfile() {
      this.showWelcome = false;
      this.isLocked = false;
    },
    toggleSideNav() {
      this.isSideNavActive = !this.isSideNavActive;
    },
    scrollToSection(id) {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      this.isSideNavActive = false;
    },
    openModal(title, body) {
      this.modalTitle = title;
      this.modalBody = body;
      this.activeModal = true;
    },
    toggleTheme() {
      document.body.classList.toggle('dark-mode');
    },
    startScrollAnimation() {
      setInterval(() => {
        this.scrollY -= 0.8;
        if (this.scrollY < -300) this.scrollY = 0;
      }, 16);
    }
  }
}
</script>

<style src="./css/design.css"></style>
<style src="./css/gallery.css"></style>