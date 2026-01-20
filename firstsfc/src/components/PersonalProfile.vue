<template>
  <div :class="['app-wrapper', { 'locked': isLocked }]">
    <div class="cursor-dot" data-cursor-dot></div>
    <div class="cursor-outline" data-cursor-outline></div>
    <canvas id="click-canvas"></canvas>

    <div id="heart-nav-toggle" class="heart-fab" @click="toggleSideNav">
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

    <div class="app-container">
      <nav class="nav-bar">
        <div class="nav-left-icons">
          <a href="https://www.linkedin.com/in/ma-sofia-anne-revilla-" target="_blank" class="icon-box">
            <i class="bi bi-linkedin"></i>
          </a>
          <div class="icon-box" @click="toggleTheme"><i class="bi bi-moon"></i></div>
          <a href="#" class="btn-pill btn-fill" @click.prevent="openModal('References', 'External links loading...')" style="margin-left: 10px; font-size: 0.8rem;">REFERENCES</a>
        </div>
        <div class="nav-menu"><span class="active">BSCS-SF Student Profile</span></div>
        <div class="nav-auth-buttons">
          <button class="btn-pill btn-outline" @click="openModal('Contact Me', 'Email: sofia.revilla@example.com')">Contact Me</button>
          <a href="https://github.com/Sofia-revilla" target="_blank" class="btn-pill btn-fill">GitHub</a>
        </div>
      </nav>

      <section class="hero-banner" id="hero">
        <div class="hero-text">
          <h1>Ma. Sofia Anne</h1>
          <p><strong>Future Military Cyber Specialist & Veterinarian</strong><br>
          "Practicality over passion, but passion always finds a way."</p>
          <button class="btn-pill btn-outline" style="margin-top:10px;">View Weakness ⚠️</button>
        </div>
        <div class="hero-img-wrapper">
          <img src="/image/me.png" alt="Active" class="char-light">
          <img src="/image/mesleep.png" alt="Sleeping" class="char-dark">
        </div>
      </section>

      <div class="dashboard-grid" style="margin-bottom: 40px;">
        <div class="about-card" style="background: var(--card-white); padding: 40px; border-radius: var(--radius-lg);">
          <div class="section-header">About Me</div>
          <h3 style="color: var(--primary-blue); margin-bottom: 15px;">Aspiring Cyber Operations Specialist</h3>
          <p style="line-height: 1.8;">
            Driven 2nd-year Computer Science student specializing in Cybersecurity & Forensics at Asia Pacific College. 
            My career path is defined by a unique duality: the precision of military cyber defense and the compassion of veterinary medicine.
          </p>
        </div>

        <div class="capabilities-display">
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
        <div class="project-card" @click="openModal('Face Track', 'Attendance tracker built with Python and OpenCV.')">
          <div class="p-icon"><i class="bi bi-person-bounding-box"></i></div>
          <h3>Face Track</h3>
          <p>Attendance System</p>
        </div>
        <div class="project-card" @click="openModal('TechZone DB', 'A complete Database Management System for inventory.')">
          <div class="p-icon"><i class="bi bi-database"></i></div>
          <h3>TechZone DB</h3>
          <p>Database Management</p>
        </div>
      </div>

      <div class="col-gallery-wide centered-gallery" id="gallery-section" style="margin-top: 50px;">
        <div class="section-header">Life Gallery</div>
        <div class="art-container landscape-art" style="display: flex; align-items: center; justify-content: center; background: #222;">
          <div class="art-ui" style="position: static; text-align: center;">
            <h2 style="color: white;">Gallery Preview</h2>
            <p style="color: var(--primary-blue);">JS EFFECTS DISABLED</p>
          </div>
        </div>
      </div>
    </div>

    <div v-if="activeModal" class="modal-overlay" style="display: flex;">
      <div class="modal-content">
        <span class="close-modal" @click="activeModal = false">&times;</span>
        <h2>{{ modalTitle }}</h2>
        <div v-html="modalBody"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PersonalProfile',
  data() {
    return {
      isLocked: false, // Set to false to bypass welcome lock
      showWelcome: false, // Set to false to bypass intro
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
    this.startScrollAnimation();
  },
  methods: {
    startScrollAnimation() {
      // Keep the Vue-based scrolling for the capabilities list
      setInterval(() => {
        this.scrollY -= 0.8;
        if (this.scrollY < -540) {
          this.scrollY = 0;
        }
      }, 16);
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
      document.body.classList.toggle('dark-mode');
    }
  }
}
</script>

<style src="./css/design.css"></style>
<style src="./css/gallery.css"></style>

<style scoped>
/* Ensure your mouse is visible since the JS cursor is removed */
:deep(*) {
  cursor: auto !important;
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

.scrolling-wrapper {
  height: 100%;
  overflow: hidden;
}

.scroll-content {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.about-card p {
  color: var(--text-main);
}
</style>