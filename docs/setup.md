# Setup Guide - VI BOT Studio Dashboard

This guide will help you set up and run the VI BOT Studio Dashboard on your local machine.

## 📋 Prerequisites

### **System Requirements**
- **Operating System**: Windows 10+, macOS 10.14+, or Linux
- **Browser**: Modern browser with WebGL support
- **Memory**: Minimum 4GB RAM (8GB recommended)
- **Storage**: 50MB free space

### **Browser Compatibility**
- **Chrome**: Version 90 or higher
- **Firefox**: Version 88 or higher
- **Safari**: Version 14 or higher
- **Edge**: Version 90 or higher

## 🚀 Quick Setup

### **Method 1: Direct File Opening**
1. Download or clone the project files
2. Navigate to the project directory
3. Double-click `index.html` to open in your default browser

### **Method 2: Local Server (Recommended)**

#### **Using Python**
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

#### **Using Node.js**
```bash
# Install serve globally
npm install -g serve

# Serve the current directory
serve .

# Or serve with specific port
serve . -p 8000
```

#### **Using PHP**
```bash
php -S localhost:8000
```

#### **Using Live Server (VS Code Extension)**
1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

## 📁 Project Structure

```
dashbord-html/
├── index.html              # Main HTML file
├── styles.css              # CSS styles and themes
├── script.js               # JavaScript functionality
├── README.md               # Project documentation
├── assets/                 # Static assets
│   ├── favicon.png         # Website icon
│   ├── apple-touch-icon.png # iOS icon
│   └── preview.png         # Preview image
└── docs/                   # Documentation
    ├── setup.md            # This file
    ├── customization.md    # Customization guide
    └── deployment.md       # Deployment guide
```

## 🔧 Configuration

### **Environment Setup**

#### **1. File Permissions**
Ensure all files have proper read permissions:
```bash
# Linux/macOS
chmod 644 *.html *.css *.js
chmod 755 assets/ docs/
```

#### **2. CORS Issues**
If you encounter CORS issues, use a local server instead of opening files directly.

#### **3. WebGL Support**
Verify WebGL support in your browser:
1. Open browser developer tools (F12)
2. Go to Console tab
3. Type: `console.log(WebGLRenderingContext)`
4. Should return a function, not undefined

## 🎨 Theme Configuration

### **Default Theme**
The dashboard starts with the "Blood Red" theme. You can change themes by:

1. **Using the Theme Selector**
   - Click the theme dropdown in the top-right corner
   - Select from: Blood Red, Divine Gold, Icy Blue, Mystic Purple

2. **Keyboard Shortcut**
   - Press `T` to cycle through themes

3. **Programmatically**
   ```javascript
   // In browser console
   setTheme('blue') // Changes to Icy Blue theme
   ```

### **Theme Persistence**
The selected theme is automatically saved to localStorage and will persist across browser sessions.

## 🐛 Troubleshooting

### **Common Issues**

#### **1. 3D Background Not Loading**
**Symptoms**: Black screen or no 3D elements visible

**Solutions**:
- Check WebGL support in your browser
- Update graphics drivers
- Try a different browser
- Disable hardware acceleration if needed

#### **2. Performance Issues**
**Symptoms**: Laggy animations or slow scrolling

**Solutions**:
- Close other browser tabs
- Update browser to latest version
- Check system memory usage
- Reduce browser zoom level

#### **3. Theme Not Changing**
**Symptoms**: Theme selector not working

**Solutions**:
- Clear browser cache
- Check JavaScript console for errors
- Refresh the page
- Try incognito/private mode

#### **4. Mobile Issues**
**Symptoms**: Layout broken on mobile devices

**Solutions**:
- Ensure viewport meta tag is present
- Test on different mobile browsers
- Check responsive CSS rules

### **Debug Mode**

Enable debug mode by adding this to the browser console:
```javascript
// Enable debug logging
localStorage.setItem('debug', 'true')

// Reload page to see debug information
location.reload()
```

## 🔍 Development Tools

### **Browser Developer Tools**

#### **Chrome DevTools**
1. Press `F12` or `Ctrl+Shift+I`
2. Use Elements tab for CSS debugging
3. Use Console tab for JavaScript debugging
4. Use Network tab for resource loading issues

#### **Firefox Developer Tools**
1. Press `F12` or `Ctrl+Shift+I`
2. Similar functionality to Chrome DevTools
3. Additional WebGL debugging tools

### **Performance Monitoring**

#### **FPS Monitoring**
```javascript
// Add to browser console
let lastTime = performance.now()
let frameCount = 0

function checkFPS() {
  frameCount++
  const currentTime = performance.now()
  
  if (currentTime - lastTime >= 1000) {
    console.log(`FPS: ${frameCount}`)
    frameCount = 0
    lastTime = currentTime
  }
  
  requestAnimationFrame(checkFPS)
}

checkFPS()
```

#### **Memory Usage**
```javascript
// Check memory usage (Chrome only)
console.log(performance.memory)
```

## 📱 Mobile Testing

### **Responsive Design Testing**

1. **Browser DevTools**
   - Open developer tools
   - Click device toggle button
   - Select different device sizes

2. **Real Device Testing**
   - Use local network IP to access from mobile
   - Test on actual devices for best results

### **Mobile Optimization Tips**

- **Touch Targets**: Ensure buttons are at least 44px
- **Font Sizes**: Minimum 16px for readable text
- **Performance**: Optimize for slower mobile processors
- **Battery**: Minimize background animations

## 🔒 Security Considerations

### **Local Development**
- No sensitive data is transmitted
- All processing happens client-side
- No external API calls (except Three.js CDN)

### **Production Deployment**
- Use HTTPS for production
- Implement Content Security Policy
- Regular security updates
- Monitor for vulnerabilities

## 📊 Performance Optimization

### **Loading Performance**
- **Minify CSS/JS**: Use build tools for production
- **Optimize Images**: Compress PNG/JPG files
- **CDN Usage**: Use CDN for external libraries
- **Caching**: Implement proper cache headers

### **Runtime Performance**
- **Animation Optimization**: Use `transform` and `opacity`
- **Memory Management**: Dispose of Three.js objects
- **Event Throttling**: Limit scroll/mouse events
- **Lazy Loading**: Load content as needed

## 🧪 Testing

### **Manual Testing Checklist**

- [ ] **Theme Switching**: All themes work correctly
- [ ] **3D Background**: Animations are smooth
- [ ] **Responsive Design**: Works on all screen sizes
- [ ] **Accessibility**: Keyboard navigation works
- [ ] **Performance**: No lag or stuttering
- [ ] **Cross-browser**: Works in all target browsers

### **Automated Testing**

Consider implementing automated tests using:
- **Jest**: JavaScript unit testing
- **Cypress**: End-to-end testing
- **Lighthouse**: Performance auditing
- **axe-core**: Accessibility testing

## 📈 Monitoring

### **Error Tracking**
```javascript
// Add error tracking
window.addEventListener('error', (e) => {
  console.error('Application Error:', e.error)
  // Send to error tracking service
})
```

### **Performance Monitoring**
```javascript
// Monitor key metrics
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    console.log(`${entry.name}: ${entry.startTime}ms`)
  }
})

observer.observe({ entryTypes: ['measure'] })
```

## 🚀 Next Steps

After successful setup:

1. **Customization**: See `docs/customization.md`
2. **Deployment**: See `docs/deployment.md`
3. **Development**: Start modifying the code
4. **Contributing**: Read the main README.md

## 📞 Support

If you encounter issues:

1. **Check this guide** for common solutions
2. **Search existing issues** on GitHub
3. **Create a new issue** with detailed information
4. **Join our community** for help

---

*Last updated: January 2025*
