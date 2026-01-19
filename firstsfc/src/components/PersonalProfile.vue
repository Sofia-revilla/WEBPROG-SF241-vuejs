<template>
  <div :class="['app-wrapper', { 'locked': isLocked }]">
    <audio id="sfx-click" ref="sfxClick" src="@/assets/audio/typewriter-click.mp3" preload="auto"></audio>
    <audio id="sfx-pop" ref="sfxPop" src="@/assets/audio/firework.mp3" preload="auto"></audio>
    <audio id="bg-music" ref="bgMusic" src="@/assets/audio/down.mp3" loop></audio>

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
                <div class="slot-reel">H</div>
                <div class="slot-reel">E</div>
                <div class="slot-reel">L</div>
                <div class="slot-reel">L</div>
                <div class="slot-reel">O</div>
            </div>
            <div class="slot-sub">THERE</div>
            <button id="enter-btn" @click="enterProfile" style="opacity: 1; pointer-events: auto;">ENTER PROFILE</button>
        </div>
    </div>

    <div class="app-container">
        <nav class="nav-bar">
            <div class="nav-left-icons">
                <a href="https://www.linkedin.com/in/ma-sofia-anne-revilla-" target="_blank" class="icon-box sfx-trigger"><i class="bi bi-linkedin"></i></a>
                <div class="icon-box sfx-trigger" @click="toggleTheme"><i class="bi bi-moon"></i></div>
                <a href="#" class="btn-pill btn-fill sfx-trigger" @click.prevent="openModal('References', 'External links loading...')" style="margin-left: 10px; font-size: 0.8rem;">REFERENCES</a>
            </div>
            <div class="nav-menu"><span class="active">BSCS-SF Student Profile</span></div>
            <div class="nav-auth-buttons">
                <button class="btn-pill btn-outline sfx-trigger" @click="showContact = true">Contact Me</button>
                <a href="https://github.com/Sofia-revilla" target="_blank" class="btn-pill btn-fill sfx-trigger">GitHub</a>
            </div>
        </nav>

        <section class="hero-banner" id="hero">
            <div class="hero-text">
                <h1>Ma. Sofia Anne</h1>
                <p><strong>Future Military Cyber Specialist & Veterinarian</strong><br>
                "Practicality over passion, but passion always finds a way."</p>
                <button class="btn-pill btn-outline sfx-trigger" style="margin-top:10px;">View Weakness ⚠️</button>
            </div>
            <div class="hero-img-wrapper">
                <img src="@/components/gallery/me.png" alt="Active" class="char-light">
                <img src="@/components/gallery/mesleep.png" alt="Sleeping" class="char-dark">
            </div>
        </section>

        <div class="dashboard-grid" style="margin-bottom: 40px;">
            <div class="about-card">
                <div class="section-header">About Me</div>
                <h3 style="color: var(--primary-blue);">Aspiring Cyber Operations Specialist</h3>
                <p>Driven 2nd-year CS student at Asia Pacific College specializing in Cybersecurity & Forensics.</p>
            </div>

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
                        <div v-for="(item, index) in capabilities" :key="'dup'+index" class="cap-item">
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

        <div class="section-header" id="projects">Projects</div>
        <div class="projects-grid">
            <div class="project-card" @click="openModal('Face Track', 'Attendance tracker built with Python.')">
                <div class="p-icon"><i class="bi bi-person-bounding-box"></i></div>
                <h3>Face Track</h3>
                <p>Attendance System</p>
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
  </div>
</template>

<script>
import { gsap } from 'gsap';

/** * Importing custom JS effects from the 'effect' folder.
 */
import './effect/script.js';
import './effect/gallery.js';

export default {
  name: 'PersonalProfile',
  data() {
    return {
      isLocked: true,
      showWelcome: true,
      isSideNavActive: false,
      activeModal: null,
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
    this.initScroll();
  },
  methods: {
    initScroll() {
      setInterval(() => {
        this.scrollY -= 0.8; 
        if (this.scrollY < -540) {
          this.scrollY = 0;
        }
      }, 16); 
    },
    enterProfile() {
      this.showWelcome = false;
      this.isLocked = false;
      // Audio play requires user interaction
      if (this.$refs.bgMusic) {
        this.$refs.bgMusic.play().catch(e => console.log("Autoplay prevented"));
      }
    },
    toggleSideNav() {
      this.isSideNavActive = !this.isSideNavActive;
    },
    scrollToSection(id) {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        this.isSideNavActive = false;
      }
    },
    openModal(title, body) {
      this.modalTitle = title;
      this.modalBody = body;
      this.activeModal = true;
    },
    toggleTheme() {
       document.body.classList.toggle('dark-theme');
    }
  }
}
</script>

<style src="./css/design.css"></style>
<style src="./css/gallery.css"></style>

<style scoped>
.app-wrapper.locked {
  overflow: hidden;
  height: 100vh;
}
.capabilities-display {
  background: var(--primary-dark);
  padding: 30px;
  border-radius: var(--radius-lg);
  color: white;
  height: 350px;
  position: relative;
  overflow: hidden;
}
</style>