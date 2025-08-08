/* ==========================================================================
   VI BOT Studio Dashboard - Main JavaScript
   ========================================================================== */

/* ==========================================================================
   Configuration Constants
   ========================================================================== */

// Theme management constants
const THEME_KEY = 'vi-bot-theme'
const DEFAULT_THEME = 'red'

// Theme configuration mapping
const THEME_NAMES = {
  red: 'Blood Red',
  gold: 'Divine Gold', 
  blue: 'Icy Blue',
  purple: 'Mystic Purple'
}

/* ==========================================================================
   Theme Management System
   ========================================================================== */

/**
 * Sets the active theme and updates the UI accordingly
 * @param {string} theme - The theme name to apply
 */
function setTheme(theme) {
  // Remove all existing theme classes
  document.documentElement.classList.remove('theme-red', 'theme-blue', 'theme-gold', 'theme-purple')
  
  // Add the new theme class
  document.documentElement.classList.add(`theme-${theme}`)
  
  // Save theme preference to localStorage
  localStorage.setItem(THEME_KEY, theme)
  
  // Update theme display elements
  updateThemeDisplay(theme)
  
  // Update active state in theme selector
  updateThemeSelectorActive(theme)
}

/**
 * Updates the theme display in the UI
 * @param {string} theme - The current theme name
 */
function updateThemeDisplay(theme) {
  const themeName = document.querySelector('.theme-name')
  const themePreview = document.querySelector('.theme-preview')
  
  if (themeName) {
    themeName.textContent = THEME_NAMES[theme] || theme
  }
  
  if (themePreview) {
    themePreview.style.background = `var(--primary)`
  }
}

/**
 * Updates the active state in the theme selector
 * @param {string} theme - The current theme name
 */
function updateThemeSelectorActive(theme) {
  document.querySelectorAll('.theme-option').forEach(el => {
    el.classList.toggle('active', el.dataset.theme === theme)
  })
}

/**
 * Initializes the theme system on page load
 */
function initTheme() {
  const saved = localStorage.getItem(THEME_KEY) || DEFAULT_THEME
  setTheme(saved)
}

/**
 * Initializes the theme selector event listeners
 */
function initThemeSelector() {
  document.querySelectorAll('.theme-option').forEach(btn => {
    btn.addEventListener('click', () => {
      const theme = btn.dataset.theme
      setTheme(theme)
      reTintThree() // Update 3D background colors
    })
  })
}

/* ==========================================================================
   Smooth Scrolling System
   ========================================================================== */

/**
 * Initializes smooth scrolling for anchor links
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href')
      const target = document.querySelector(id)
      
      if (!target) return
      
      e.preventDefault()
      target.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      })
    })
  })
}

/* ==========================================================================
   Statistics Animation System
   ========================================================================== */

/**
 * Animates statistics numbers with counting effect
 */
function animateStats() {
  const statNumbers = document.querySelectorAll('.stat-number')
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target
        const finalValue = parseFloat(target.dataset.target)
        const duration = 2000
        const startTime = performance.now()
        
        function updateNumber(currentTime) {
          const elapsed = currentTime - startTime
          const progress = Math.min(elapsed / duration, 1)
          
          // Easing function for smooth animation
          const easeOutQuart = 1 - Math.pow(1 - progress, 4)
          const currentValue = finalValue * easeOutQuart
          
          // Format number based on size
          if (finalValue >= 1000) {
            target.textContent = Math.floor(currentValue).toLocaleString()
          } else {
            target.textContent = currentValue.toFixed(1)
          }
          
          // Continue animation if not complete
          if (progress < 1) {
            requestAnimationFrame(updateNumber)
          }
        }
        
        requestAnimationFrame(updateNumber)
        observer.unobserve(target)
      }
    })
  }, { threshold: 0.5 })
  
  statNumbers.forEach(stat => observer.observe(stat))
}

/* ==========================================================================
   Documentation Navigation System
   ========================================================================== */

/**
 * Initializes the documentation navigation system
 */
function initDocumentation() {
  const docCards = document.querySelectorAll('.doc-card')
  const navButtons = document.querySelectorAll('.nav-btn')
  const docPages = document.getElementById('doc-pages')
  const backButtons = document.querySelectorAll('.doc-back-btn')
  
  /**
   * Opens a specific documentation page
   * @param {string} section - The section name to open
   */
  function openDocPage(section) {
    const page = document.getElementById(`${section}-page`)
    if (page) {
      // Hide main content
      document.querySelector('.app').style.display = 'none'
      
      // Show documentation pages container
      docPages.classList.add('active')
      
      // Hide all pages and show target page
      document.querySelectorAll('.doc-page').forEach(p => p.classList.remove('active'))
      page.classList.add('active')
      
      // Smooth scroll to top
      docPages.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }
  
  /**
   * Closes all documentation pages and returns to main dashboard
   */
  function closeDocPages() {
    docPages.classList.remove('active')
    document.querySelector('.app').style.display = 'block'
    document.querySelectorAll('.doc-page').forEach(p => p.classList.remove('active'))
  }
  
  // Add click handlers to documentation cards
  docCards.forEach(card => {
    card.addEventListener('click', () => {
      const section = card.dataset.section
      if (section) {
        openDocPage(section)
      }
    })
  })
  
  // Add click handlers to navigation buttons
  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const section = btn.dataset.section
      if (section) {
        openDocPage(section)
      }
    })
  })
  
  // Add click handlers to back buttons
  backButtons.forEach(btn => {
    btn.addEventListener('click', closeDocPages)
  })
  
  // Close documentation on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && docPages.classList.contains('active')) {
      closeDocPages()
    }
  })
}

/* ==========================================================================
   Three.js 3D Background System
   ========================================================================== */

// Three.js global variables
let scene, camera, renderer, group, clock
let composer, bloomPass, controls

/**
 * Converts CSS variable to hex color
 * @param {string} varName - CSS variable name
 * @returns {string} Hex color value
 */
function hexFromCss(varName) {
  const v = getComputedStyle(document.documentElement).getPropertyValue(varName).trim()
  const ctx = document.createElement('canvas').getContext('2d')
  ctx.fillStyle = v
  return ctx.fillStyle
}

/**
 * Converts CSS variable to Three.js Color object
 * @param {string} varName - CSS variable name
 * @returns {THREE.Color} Three.js Color object
 */
function colorToThree(varName) {
  return new THREE.Color(hexFromCss(varName))
}

/**
 * Initializes the Three.js 3D background
 */
function initThree() {
  const canvas = document.getElementById('bg3d')
  
  // Initialize renderer
  renderer = new THREE.WebGLRenderer({ 
    canvas, 
    antialias: true, 
    alpha: true 
  })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.2

  // Initialize scene and camera
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.set(0, 0, 28)

  clock = new THREE.Clock()

  // Add lighting
  const ambient = new THREE.AmbientLight(colorToThree('--primary'), 0.6)
  scene.add(ambient)

  const dir = new THREE.DirectionalLight(colorToThree('--secondary'), 0.8)
  dir.position.set(4, 6, 8)
  scene.add(dir)

  // Create main group for 3D objects
  group = new THREE.Group()
  scene.add(group)

  // Create materials for different object types
  const materialA = new THREE.MeshPhongMaterial({ 
    color: colorToThree('--primary'), 
    wireframe: true, 
    transparent: true, 
    opacity: 0.55 
  })
  const materialB = new THREE.MeshPhongMaterial({ 
    color: colorToThree('--secondary'), 
    wireframe: true, 
    transparent: true, 
    opacity: 0.4 
  })
  const materialC = new THREE.MeshPhongMaterial({ 
    color: colorToThree('--accent'), 
    wireframe: true, 
    transparent: true, 
    opacity: 0.5 
  })

  // Create various 3D geometries
  for (let i = 0; i < 30; i++) {
    const geo = i % 5 === 0
      ? new THREE.IcosahedronGeometry(1.5 + Math.random() * 1.5, 1)
      : i % 5 === 1
      ? new THREE.TorusKnotGeometry(1.1 + Math.random(), 0.25, 64, 8)
      : i % 5 === 2
      ? new THREE.BoxGeometry(1.4 + Math.random(), 1.4 + Math.random(), 1.4 + Math.random())
      : i % 5 === 3
      ? new THREE.OctahedronGeometry(1.2 + Math.random() * 1.2)
      : new THREE.DodecahedronGeometry(1.3 + Math.random() * 1.2)
    
    const mat = i % 5 === 0 ? materialA : i % 5 === 1 ? materialB : i % 5 === 2 ? materialC : i % 5 === 3 ? materialA : materialB
    const mesh = new THREE.Mesh(geo, mat)
    mesh.position.set((Math.random() - 0.5) * 60, (Math.random() - 0.5) * 35, (Math.random() - 0.5) * 50)
    mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI)
    mesh.userData = { 
      speed: 0.3 + Math.random() * 0.6, 
      amp: 1 + Math.random() * 1.5, 
      baseY: mesh.position.y,
      rotationSpeed: 0.001 + Math.random() * 0.002
    }
    group.add(mesh)
  }

  // Create star field
  const stars = new THREE.BufferGeometry()
  const count = 2000
  const positions = new Float32Array(count * 3)
  for (let i = 0; i < count * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 400
    positions[i + 1] = (Math.random() - 0.5) * 250
    positions[i + 2] = (Math.random() - 0.5) * 400
  }
  stars.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  const starMat = new THREE.PointsMaterial({ 
    size: 0.8, 
    color: colorToThree('--secondary'), 
    transparent: true, 
    opacity: 0.6 
  })
  const starPoints = new THREE.Points(stars, starMat)
  scene.add(starPoints)

  // Create animated rings
  const ringMat = new THREE.MeshBasicMaterial({ 
    color: colorToThree('--secondary'), 
    transparent: true, 
    opacity: 0.25 
  })
  for (let r = 10; r <= 30; r += 10) {
    const ringGeo = new THREE.RingGeometry(r, r + 0.15, 64)
    const ring = new THREE.Mesh(ringGeo, ringMat.clone())
    ring.rotation.x = Math.PI / 2
    ring.userData = { base: r, speed: 0.4 + Math.random() * 0.4 }
    scene.add(ring)
  }

  // Create central orb
  const orbGeo = new THREE.SphereGeometry(0.8, 16, 16)
  const orbMat = new THREE.MeshBasicMaterial({ color: colorToThree('--primary') })
  const orb = new THREE.Mesh(orbGeo, orbMat)
  orb.position.set(0, 0, -5)
  scene.add(orb)
  scene.userData.orb = orb

  // Load and create 3D text
  const loader = new THREE.FontLoader()
  loader.load('https://threejs.org/examples/fonts/helvetiker_bold.typeface.json', (font) => {
    const textGeo = new THREE.TextGeometry('VI BOT STUDIO', {
      font,
      size: 3.0,
      height: 1.0,
      curveSegments: 16,
      bevelEnabled: true,
      bevelThickness: 0.25,
      bevelSize: 0.15,
      bevelSegments: 6
    })
    textGeo.center()
    const textMat = new THREE.MeshStandardMaterial({
      color: colorToThree('--secondary'),
      metalness: 0.95,
      roughness: 0.15,
      envMapIntensity: 1.8,
      emissive: colorToThree('--secondary'),
      emissiveIntensity: 0.7
    })
    const textMesh = new THREE.Mesh(textGeo, textMat)
    textMesh.position.set(0, 10, -20)
    textMesh.rotation.x = -0.2
    scene.add(textMesh)
    scene.userData.textMesh = textMesh
  })

  // Setup post-processing effects
  composer = new THREE.EffectComposer(renderer)
  const renderPass = new THREE.RenderPass(scene, camera)
  bloomPass = new THREE.UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    1.2,
    0.8,
    0.95
  )
  composer.addPass(renderPass)
  composer.addPass(bloomPass)

  // Setup camera controls
  controls = new THREE.OrbitControls(camera, renderer.domElement)
  controls.enableZoom = false
  controls.enablePan = false
  controls.rotateSpeed = 0.15
  controls.minPolarAngle = Math.PI / 3
  controls.maxPolarAngle = Math.PI / 2

  // Add event listeners
  window.addEventListener('resize', onResize)
  window.addEventListener('mousemove', onMouse)
  window.addEventListener('click', onClick)
  
  // Start animation loop
  animate()
}

// Mouse position tracking
let mouseX = 0, mouseY = 0

/**
 * Handles mouse movement for interactive elements
 * @param {MouseEvent} e - Mouse event
 */
function onMouse(e) {
  const x = (e.clientX / window.innerWidth) * 2 - 1
  const y = (e.clientY / window.innerHeight) * 2 - 1
  mouseX = x
  mouseY = y
}

/**
 * Handles window resize events
 */
function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
  if (composer) {
    composer.setSize(window.innerWidth, window.innerHeight)
  }
}

/**
 * Main animation loop for Three.js scene
 */
function animate() {
  requestAnimationFrame(animate)
  const t = clock.getElapsedTime()
  
  // Animate 3D objects
  group.children.forEach((m, i) => {
    m.rotation.x += m.userData.rotationSpeed
    m.rotation.y += m.userData.rotationSpeed * 1.5
    m.position.y = m.userData.baseY + Math.sin(t * m.userData.speed + i) * m.userData.amp
  })
  
  // Animate rings
  scene.traverse(o => {
    if (o.geometry && o.geometry.type === 'RingGeometry') {
      o.material.opacity = 0.2 + 0.2 * (1 + Math.sin(t * (o.userData.speed || 0.5)))
      o.rotation.z = t * 0.2
    }
  })
  
  // Animate central orb with mouse interaction
  if (scene.userData.orb) {
    scene.userData.orb.position.x += ((mouseX * 8) - scene.userData.orb.position.x) * 0.12
    scene.userData.orb.position.y += ((-mouseY * 5) - scene.userData.orb.position.y) * 0.12
  }
  
  // Animate 3D text
  if (scene.userData.textMesh) {
    const tm = scene.userData.textMesh
    tm.rotation.y = Math.sin(t * 0.25) * 0.4
    if (tm.material && tm.material.emissiveIntensity !== undefined) {
      tm.material.emissiveIntensity = 0.6 + Math.sin(t * 2.5) * 0.4
    }
  }
  
  // Animate camera with mouse interaction
  camera.position.x += ((mouseX * 10) - camera.position.x) * 0.08
  camera.position.y += ((-mouseY * 5) - camera.position.y) * 0.08
  camera.lookAt(0, 0, 0)
  
  // Update controls and render
  controls && controls.update()
  if (composer) {
    composer.render()
  } else {
    renderer.render(scene, camera)
  }
}

/**
 * Updates Three.js colors when theme changes
 */
function reTintThree() {
  scene.traverse(obj => {
    if (obj.isLight) {
      if (obj.isAmbientLight) obj.color = colorToThree('--primary')
      if (obj.isDirectionalLight) obj.color = colorToThree('--secondary')
    }
    if (obj.material && obj.material.isMeshPhongMaterial) {
      if (obj.material.color) obj.material.color = colorToThree('--primary')
    }
    if (obj.material && obj.material.isPointsMaterial) {
      obj.material.color = colorToThree('--secondary')
    }
    if (obj.material && obj.material.isMeshStandardMaterial) {
      obj.material.color = colorToThree('--secondary')
      obj.material.emissive = colorToThree('--secondary')
      obj.material.needsUpdate = true
    }
  })
  
  // Update bloom effect intensity based on theme
  if (bloomPass) {
    const theme = localStorage.getItem(THEME_KEY) || DEFAULT_THEME
    const map = { red: 1.3, blue: 1.1, gold: 1.4, purple: 1.2 }
    bloomPass.strength = map[theme] || 1.2
  }
}

/* ==========================================================================
   Interactive Effects System
   ========================================================================== */

/**
 * Creates click ripple effect
 * @param {MouseEvent} e - Click event
 */
function onClick(e) {
  const ripple = document.createElement('span')
  ripple.className = 'pointer-events-none fixed w-10 h-10 rounded-full bg-white/20 blur-4'
  ripple.style.left = `${e.clientX - 20}px`
  ripple.style.top = `${e.clientY - 20}px`
  ripple.style.transition = 'transform 1000ms ease, opacity 1000ms ease'
  document.body.appendChild(ripple)
  
  requestAnimationFrame(() => {
    ripple.style.transform = 'scale(18)'
    ripple.style.opacity = '0'
  })
  
  setTimeout(() => ripple.remove(), 1050)
}

/* ==========================================================================
   Keyboard Shortcuts System
   ========================================================================== */

/**
 * Initializes keyboard shortcuts for theme cycling
 */
function initKeyboardThemeCycler() {
  const order = ['red', 'gold', 'blue', 'purple']
  
  document.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 't') {
      const cur = localStorage.getItem(THEME_KEY) || DEFAULT_THEME
      const idx = order.indexOf(cur)
      const next = order[(idx + 1) % order.length]
      setTheme(next)
      reTintThree()
    }
  })
}

/* ==========================================================================
   Runtime Utilities System
   ========================================================================== */

/**
 * Injects dynamic CSS utilities for enhanced styling
 */
function injectRuntimeUtilities() {
  const style = document.createElement('style')
  const shades = 150
  const blurs = 75
  const durations = 90
  const angles = 360
  const delays = 300
  let css = ''

  // Generate glow utilities
  for (let i = 1; i <= shades; i++) {
    const p = (i / shades) * 100
    css += `.glow-${i} { box-shadow: 0 0 ${10 + i}px color-mix(in srgb, var(--secondary) ${p}%, transparent); }\n`
    css += `.text-glow-${i} { text-shadow: 0 0 ${4 + i}px color-mix(in srgb, var(--secondary) ${p}%, transparent); }\n`
    css += `.bg-stripe-${i} { background-image: repeating-linear-gradient(135deg, color-mix(in srgb, var(--primary) ${p}%, transparent) 0 12px, transparent 12px 24px); }\n`
  }
  
  // Generate blur utilities
  for (let i = 1; i <= blurs; i++) {
    css += `.blur-${i} { filter: blur(${i * 0.8}px); }\n`
  }
  
  // Generate animation duration utilities
  for (let i = 1; i <= durations; i++) {
    css += `.anim-dur-${i} { animation-duration: ${i * 0.4}s !important; }\n`
  }
  
  // Generate angle utilities
  for (let i = 0; i < angles; i++) {
    css += `.bg-angle-${i} { background-image: linear-gradient(${i}deg, color-mix(in srgb, var(--primary) 40%, transparent), transparent); }\n`
  }
  
  // Generate animation delay utilities
  for (let i = 1; i <= delays; i++) {
    css += `.anim-delay-${i} { animation-delay: ${i * 0.08}s !important; }\n`
  }
  
  // Add sweep animation
  css += `@keyframes sweep { 0%{transform: translateX(-100%);}100%{transform: translateX(100%);} }\n`
  css += `.sweep::after { content:''; position:absolute; inset:0; transform: translateX(-100%); background: linear-gradient(90deg, transparent, #fff4, transparent); animation: sweep 5s infinite; }\n`

  style.textContent = css
  document.head.appendChild(style)
}

/* ==========================================================================
   Utility Functions
   ========================================================================== */

/**
 * Scrolls to a specific section
 * @param {string} sectionId - The section ID to scroll to
 */
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId)
  if (section) {
    section.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

/**
 * Opens the demo page
 */
function openDemo() {
  // Placeholder for demo functionality
  console.log('Opening demo...')
  alert('Demo functionality coming soon!')
}

/**
 * Downloads the application for the specified platform
 * @param {string} platform - The platform (windows, macos, linux)
 */
function downloadApp(platform) {
  // Placeholder for download functionality
  console.log(`Downloading for ${platform}...`)
  alert(`Download for ${platform} coming soon!`)
}

/**
 * Opens the source code repository
 */
function openSource() {
  window.open('https://github.com/itsysxv1', '_blank')
}

/**
 * Opens the API documentation
 */
function openApiDocs() {
  // Placeholder for API docs functionality
  console.log('Opening API docs...')
  alert('API documentation coming soon!')
}

/* ==========================================================================
   Application Initialization
   ========================================================================== */

/**
 * Main initialization function called when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', () => {
  // Initialize all systems
  initTheme()
  initThemeSelector()
  initSmoothScroll()
  initThree()
  initDocumentation()
  injectRuntimeUtilities()
  initKeyboardThemeCycler()
  animateStats()
  
  console.log('VI BOT Studio Dashboard initialized successfully!')
})
