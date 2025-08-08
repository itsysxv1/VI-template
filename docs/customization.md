# Customization Guide - VI BOT Studio Dashboard

This guide will help you customize the VI BOT Studio Dashboard to match your brand and requirements.

## 🎨 Theme Customization

### **Adding New Themes**

#### **1. Create CSS Theme Variables**

Add your theme to `styles.css`:

```css
/* Custom Theme Example */
.theme-custom {
  --primary: #your-primary-color;
  --secondary: #your-secondary-color;
  --accent: #your-accent-color;
  --bg: rgba(0,0,0,0.98);
  --text: #ffffff;
  --card: rgba(255,255,255,0.06);
  --border: rgba(255,255,255,0.12);
}
```

#### **2. Update JavaScript Theme Names**

Add your theme to the `THEME_NAMES` object in `script.js`:

```javascript
const THEME_NAMES = {
  red: 'Blood Red',
  gold: 'Divine Gold', 
  blue: 'Icy Blue',
  purple: 'Mystic Purple',
  custom: 'Your Custom Theme' // Add your theme here
}
```

#### **3. Add Theme Option to HTML**

Add a button to the theme dropdown in `index.html`:

```html
<button type="button" class="theme-option" data-theme="custom" role="menuitem">
  <div class="theme-color custom"></div>
  <span>Your Custom Theme</span>
</button>
```

#### **4. Add Theme Color Preview**

Add the color preview style:

```css
.theme-color.custom { background: #your-primary-color; }
```

### **Theme Color Guidelines**

#### **Color Harmony**
- **Primary**: Main brand color (use for buttons, highlights)
- **Secondary**: Supporting color (use for text, icons)
- **Accent**: Emphasis color (use sparingly for special elements)
- **Background**: Dark theme base (keep dark for contrast)

#### **Accessibility Considerations**
```css
/* Ensure sufficient contrast ratios */
.theme-accessible {
  --primary: #ff6b6b;    /* High contrast red */
  --secondary: #4ecdc4;  /* High contrast cyan */
  --accent: #45b7d1;     /* High contrast blue */
  --text: #ffffff;        /* White text on dark background */
}
```

### **Advanced Theme Features**

#### **Gradient Themes**
```css
.theme-gradient {
  --primary: #667eea;
  --secondary: #764ba2;
  --accent: #f093fb;
  --bg: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

#### **Animated Themes**
```css
.theme-animated {
  --primary: #ff6b6b;
  --secondary: #4ecdc4;
  --accent: #45b7d1;
  animation: themePulse 4s ease-in-out infinite;
}

@keyframes themePulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.8; }
}
```

## 🎭 3D Background Customization

### **Modifying 3D Objects**

#### **Change Object Count**
```javascript
// In script.js, modify the loop count
for (let i = 0; i < 50; i++) { // Change from 30 to 50
```

#### **Add New Geometry Types**
```javascript
// Add new geometry types to the switch statement
const geo = i % 6 === 0
  ? new THREE.IcosahedronGeometry(1.5 + Math.random() * 1.5, 1)
  : i % 6 === 1
  ? new THREE.TorusKnotGeometry(1.1 + Math.random(), 0.25, 64, 8)
  : i % 6 === 2
  ? new THREE.BoxGeometry(1.4 + Math.random(), 1.4 + Math.random(), 1.4 + Math.random())
  : i % 6 === 3
  ? new THREE.OctahedronGeometry(1.2 + Math.random() * 1.2)
  : i % 6 === 4
  ? new THREE.DodecahedronGeometry(1.3 + Math.random() * 1.2)
  : new THREE.SphereGeometry(1.0 + Math.random(), 16, 16) // New sphere geometry
```

#### **Custom Animation Patterns**
```javascript
// Modify animation behavior
mesh.userData = { 
  speed: 0.3 + Math.random() * 0.6,
  amp: 1 + Math.random() * 1.5,
  baseY: mesh.position.y,
  rotationSpeed: 0.001 + Math.random() * 0.002,
  // Add custom animation properties
  customRotation: Math.random() * Math.PI * 2,
  pulseSpeed: 0.5 + Math.random() * 0.5
}
```

### **Adding Custom 3D Models**

#### **Load External 3D Models**
```javascript
// Add to initThree() function
const loader = new THREE.GLTFLoader()
loader.load('path/to/your/model.gltf', (gltf) => {
  const model = gltf.scene
  model.scale.set(0.5, 0.5, 0.5)
  model.position.set(0, 0, -10)
  scene.add(model)
})
```

#### **Create Custom Geometries**
```javascript
// Create custom geometry
const customGeometry = new THREE.BufferGeometry()
const vertices = new Float32Array([
  -1, -1, 0,
  1, -1, 0,
  0, 1, 0
])
customGeometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
customGeometry.computeVertexNormals()

const customMaterial = new THREE.MeshPhongMaterial({ 
  color: colorToThree('--primary'),
  wireframe: true 
})

const customMesh = new THREE.Mesh(customGeometry, customMaterial)
scene.add(customMesh)
```

## 📱 Layout Customization

### **Modifying Section Layout**

#### **Change Grid Layouts**
```css
/* Modify features grid */
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); /* Change from 300px */
  gap: 1.5rem; /* Change from 2rem */
}

/* Modify statistics grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); /* Change from 200px */
  gap: 1rem; /* Change from 2rem */
}
```

#### **Add New Sections**
```html
<!-- Add new section to index.html -->
<section id="new-section" class="new-section" aria-labelledby="new-section-title">
  <h2 class="section-title" id="new-section-title">New Section</h2>
  <div class="new-section-content">
    <!-- Your content here -->
  </div>
</section>
```

```css
/* Add corresponding CSS */
.new-section {
  padding: 4rem 0;
}

.new-section-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}
```

### **Responsive Design Modifications**

#### **Custom Breakpoints**
```css
/* Add custom breakpoints */
@media (max-width: 1200px) {
  .main-content {
    padding: 1.5rem;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
}
```

#### **Mobile-First Approach**
```css
/* Start with mobile styles */
.feature-card {
  padding: 1rem;
  margin-bottom: 1rem;
}

/* Add tablet styles */
@media (min-width: 768px) {
  .feature-card {
    padding: 1.5rem;
    margin-bottom: 0;
  }
}

/* Add desktop styles */
@media (min-width: 1024px) {
  .feature-card {
    padding: 2rem;
  }
}
```

## 🎯 Content Customization

### **Modifying Hero Section**

#### **Change Hero Title**
```html
<!-- In index.html -->
<h1 class="hero-title" id="hero-title">
  <span class="letter-shine" aria-hidden="true">Y</span>
  <span class="letter-shine" aria-hidden="true">O</span>
  <span class="letter-shine" aria-hidden="true">U</span>
  <span class="letter-shine" aria-hidden="true">R</span>
  <span class="letter-shine" aria-hidden="true">&nbsp;</span>
  <span class="letter-shine" aria-hidden="true">B</span>
  <span class="letter-shine" aria-hidden="true">R</span>
  <span class="letter-shine" aria-hidden="true">A</span>
  <span class="letter-shine" aria-hidden="true">N</span>
  <span class="letter-shine" aria-hidden="true">D</span>
</h1>
```

#### **Update Hero Subtitle**
```html
<p class="hero-subtitle">Your Custom Subtitle Here</p>
```

#### **Modify Technology Badges**
```html
<div class="hero-badges" role="group" aria-label="Technologies used">
  <span class="badge">Your Tech 1</span>
  <span class="badge">Your Tech 2</span>
  <span class="badge">Your Tech 3</span>
</div>
```

### **Customizing Features Section**

#### **Add New Feature Cards**
```html
<div class="feature-card" tabindex="0">
  <div class="feature-icon" aria-hidden="true">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <!-- Your custom SVG path -->
      <path d="M12 2L2 7l10 5 10-5-10-5z"/>
    </svg>
  </div>
  <h3>Your Feature Title</h3>
  <p>Your feature description goes here.</p>
</div>
```

#### **Custom Feature Icons**
```html
<!-- Use custom SVG icons -->
<div class="feature-icon" aria-hidden="true">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <!-- Replace with your custom SVG path -->
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 6v6l4 2"/>
  </svg>
</div>
```

### **Statistics Customization**

#### **Update Statistics Data**
```html
<div class="stat-card">
  <div class="stat-number" data-target="15000" aria-label="Your Metric">0</div>
  <div class="stat-label">Your Metric Name</div>
</div>
```

#### **Add Dynamic Statistics**
```javascript
// Add to script.js
function updateStatistics() {
  // Fetch data from API or update manually
  const stats = {
    users: 15000,
    downloads: 50000,
    rating: 4.8
  }
  
  // Update DOM elements
  document.querySelector('[data-target="15000"]').dataset.target = stats.users
  document.querySelector('[data-target="50000"]').dataset.target = stats.downloads
  document.querySelector('[data-target="4.8"]').dataset.target = stats.rating
}
```

## 🔧 Advanced Customization

### **Adding Custom Animations**

#### **CSS Animations**
```css
/* Add custom keyframe animations */
@keyframes customFloat {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.custom-animation {
  animation: customFloat 3s ease-in-out infinite;
}
```

#### **JavaScript Animations**
```javascript
// Add custom JavaScript animations
function customAnimation() {
  const elements = document.querySelectorAll('.custom-animation')
  
  elements.forEach((el, index) => {
    el.style.animationDelay = `${index * 0.1}s`
  })
}

// Call on page load
document.addEventListener('DOMContentLoaded', customAnimation)
```

### **Adding Interactive Elements**

#### **Custom Buttons**
```html
<button class="custom-btn" onclick="customFunction()">
  <span class="btn-text">Custom Button</span>
  <span class="btn-icon">→</span>
</button>
```

```css
.custom-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: linear-gradient(45deg, var(--primary), var(--secondary));
  border: none;
  border-radius: 0.75rem;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.custom-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.2);
}
```

#### **Modal System**
```html
<!-- Add modal structure -->
<div id="custom-modal" class="modal">
  <div class="modal-content">
    <span class="close">&times;</span>
    <h2>Custom Modal</h2>
    <p>Your modal content here.</p>
  </div>
</div>
```

```css
.modal {
  display: none;
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.8);
}

.modal-content {
  background: var(--card);
  margin: 15% auto;
  padding: 2rem;
  border: 1px solid var(--border);
  border-radius: 1rem;
  width: 80%;
  max-width: 500px;
}
```

```javascript
// Add modal functionality
function openModal() {
  document.getElementById('custom-modal').style.display = 'block'
}

function closeModal() {
  document.getElementById('custom-modal').style.display = 'none'
}

// Close modal when clicking outside
window.onclick = function(event) {
  const modal = document.getElementById('custom-modal')
  if (event.target === modal) {
    closeModal()
  }
}
```

### **Performance Optimizations**

#### **Lazy Loading**
```javascript
// Implement lazy loading for images
const images = document.querySelectorAll('img[data-src]')

const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target
      img.src = img.dataset.src
      img.classList.remove('lazy')
      observer.unobserve(img)
    }
  })
})

images.forEach(img => imageObserver.observe(img))
```

#### **Code Splitting**
```javascript
// Load features on demand
async function loadFeature() {
  const module = await import('./feature.js')
  module.init()
}

// Load when needed
document.getElementById('feature-btn').addEventListener('click', loadFeature)
```

## 🎨 Brand Integration

### **Logo Customization**

#### **Replace Logo**
```html
<!-- Replace the logo text -->
<div class="logo-shine" aria-label="Your Brand">YOUR BRAND</div>
```

#### **Add Logo Image**
```html
<div class="brand">
  <img src="assets/your-logo.png" alt="Your Brand" class="logo-image">
  <div class="logo-shine" aria-label="Your Brand">YOUR BRAND</div>
</div>
```

```css
.logo-image {
  height: 2rem;
  margin-right: 1rem;
}
```

### **Color Scheme Integration**

#### **Brand Color Palette**
```css
/* Use your brand colors */
:root {
  --brand-primary: #your-primary-color;
  --brand-secondary: #your-secondary-color;
  --brand-accent: #your-accent-color;
}

/* Apply to existing themes */
.theme-brand {
  --primary: var(--brand-primary);
  --secondary: var(--brand-secondary);
  --accent: var(--brand-accent);
}
```

### **Typography Customization**

#### **Custom Fonts**
```css
/* Import custom fonts */
@import url('https://fonts.googleapis.com/css2?family=Your+Font:wght@400;700&display=swap');

/* Apply custom font */
:root {
  --font-primary: 'Your Font', sans-serif;
  --font-secondary: 'Inter', sans-serif;
}

body {
  font-family: var(--font-primary);
}

.special-text {
  font-family: var(--font-secondary);
}
```

## 🔧 Development Workflow

### **Local Development Setup**

1. **Create Development Branch**
   ```bash
   git checkout -b feature/customization
   ```

2. **Make Changes**
   - Edit files as needed
   - Test in multiple browsers
   - Validate accessibility

3. **Test Changes**
   ```bash
   # Start local server
   python -m http.server 8000
   
   # Open in browser
   open http://localhost:8000
   ```

4. **Commit Changes**
   ```bash
   git add .
   git commit -m "Add custom theme and branding"
   git push origin feature/customization
   ```

### **Version Control Best Practices**

- **Feature Branches**: Create separate branches for each customization
- **Descriptive Commits**: Use clear commit messages
- **Code Review**: Review changes before merging
- **Documentation**: Update docs when adding features

## 📊 Testing Customizations

### **Cross-browser Testing**
- Test in Chrome, Firefox, Safari, Edge
- Check mobile browsers
- Verify accessibility features

### **Performance Testing**
```javascript
// Add performance monitoring
const startTime = performance.now()

// Your customization code here

const endTime = performance.now()
console.log(`Customization took ${endTime - startTime} milliseconds`)
```

### **Accessibility Testing**
- Use screen readers
- Test keyboard navigation
- Check color contrast ratios
- Validate ARIA labels

## 🚀 Deployment Considerations

### **Production Optimizations**
- Minify CSS and JavaScript
- Optimize images
- Enable gzip compression
- Set proper cache headers

### **Environment Variables**
```javascript
// Use environment-specific configurations
const config = {
  development: {
    debug: true,
    apiUrl: 'http://localhost:3000'
  },
  production: {
    debug: false,
    apiUrl: 'https://api.yoursite.com'
  }
}
```

## 📞 Support and Resources

### **Getting Help**
- Check the main README.md
- Review existing issues on GitHub
- Join community discussions
- Contact the development team

### **Additional Resources**
- [CSS Custom Properties Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [Three.js Documentation](https://threejs.org/docs/)
- [Web Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Performance Best Practices](https://web.dev/performance/)

---

*Last updated: January 2025*
