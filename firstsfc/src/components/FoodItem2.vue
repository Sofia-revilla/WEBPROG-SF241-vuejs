<template>
  <div :class="['app-wrapper', { 'locked': isLocked }]">
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
          <a href="#" class="btn-pill btn-fill" @click.prevent="openModal('References', 'Links to GitHub and Resume.')" style="margin-left: 10px; font-size: 0.8rem;">REFERENCES</a>
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
        </div>
        <div class="hero-img-wrapper">
          <img src="/image/me.png" alt="Profile" class="char-light">
        </div>
      </section>

      <div class="resume-section" id="resume-section">
        <button class="resume-toggle-btn" @click="toggleResume">
          <i class="bi bi-file-earmark-person"></i> VIEW FULL BIO & RESUME
        </button>
        
        <div :class="['resume-content', { 'active': isResumeOpen }]">
          <div class="paper-sheet">
            <div class="paper-header">
              <h2>CURRICULUM VITAE</h2>
              <p>MA. SOFIA ANNE C. REVILLA</p>
            </div>
            <div class="paper-grid">
              <div class="resume-item">
                <span class="resume-label">Profile</span>
                <span class="resume-value">
                  <strong>Age:</strong> 20 (April 26, 2005)<br>
                  <strong>School:</strong> Asia Pacific College<br>
                  <strong>Course:</strong> BSCS - Cybersecurity & Forensics
                </span>
              </div>
              <div class="resume-item full-width">
                <span class="resume-label">Experience</span>
                <div class="experience-box">
                  <strong>Head of Arts Committee (2 Years)</strong><br>
                  Clark Air Base Youth Club<br>
                  <em>Led artistic initiatives and managed events.</em>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="dashboard-grid">
        <div class="about-card" style="background: var(--card-white); padding: 40px; border-radius: var(--radius-lg);">
          <div class="section-header">About Me</div>
          <h3 style="color: var(--primary-blue); margin-bottom: 15px;">Aspiring Cyber Operations Specialist</h3>
          <p>Driven 2nd-year Computer Science student specializing in Cybersecurity & Forensics. I aim to merge military cyber defense with my passion for animal rescue.</p>
        </div>

        <div class="capabilities-display">
          <div class="section-header" style="color: white;">Capabilities</div>
          <div class="scrolling-wrapper">
            <div class="scroll-content">
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

      <div class="section-header" id="projects">Projects</div>
      <div class="projects-grid">
        <div class="project-card" @click="openModal('Face Track', 'Attendance face tracker for school used by LeanTech. Built with Python.')">
          <div class="p-icon"><i class="bi bi-person-bounding-box"></i></div>
          <h3>Face Track</h3>
          <p>Attendance System</p>
        </div>
        <div class="project-card" @click="openModal('TechZone DB', 'A Database Management System for Mr. Edison Co of TechZone.')">
          <div class="p-icon"><i class="bi bi-database"></i></div>
          <h3>TechZone DB</h3>
          <p>Database Management</p>
        </div>
        <div class="project-card" @click="openModal('Cyber Lab', 'Network Security Simulation and Packet Analysis project.')">
          <div class="p-icon"><i class="bi bi-shield-lock"></i></div>
          <h3>Cyber Lab</h3>
          <p>Security Simulation</p>
        </div>
      </div>

      <div class="dashboard-grid" style="margin-top: 40px;">
        <div class="col-info">
          <div class="section-header">Goals & Dreams</div>
          <div class="info-list">
            <div class="info-card">
              <div class="info-img">🐾</div>
              <div class="info-content"><h4>Dream</h4><p>Build a large animal rescue shelter.</p></div>
            </div>
            <div class="info-card">
              <div class="info-img">🛡️</div>
              <div class="info-content"><h4>Career</h4><p>Military Cyber Operations.</p></div>
            </div>
          </div>
        </div>
        <div class="col-info">
          <div class="section-header">Hobbies</div>
          <div class="info-list">
            <div class="info-card">
              <div class="info-img">🎨</div>
              <div class="info-content"><h4>Arts</h4><p>Drawing, Painting & Design.</p></div>
            </div>
            <div class="info-card">
              <div class="info-img">🔫</div>
              <div class="info-content"><h4>Range</h4><p>Target practice and shooting.</p></div>
            </div>
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
      isLocked: false,
      isSideNavActive: false,
      isResumeOpen: false,
      activeModal: false,
      modalTitle: '',
      modalBody: '',
      // Animation state removed
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
  methods: {
    toggleSideNav() {
      this.isSideNavActive = !this.isSideNavActive;
    },
    toggleResume() {
      this.isResumeOpen = !this.isResumeOpen;
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
  overflow-y: auto; /* Changed to auto to allow manual scrolling if needed */
}

.scroll-content {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.modal-overlay {
  position: fixed;
  top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0,0,0,0.8);
  z-index: 10005;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 40px;
  border-radius: 20px;
  max-width: 500px;
  position: relative;
  color: #333;
}

.dark-mode .modal-content {
  background: #242526;
  color: #e4e6eb;
}
</style>