# 🎮 D-Pad Navigation Library

<div align="center">

[![Build Status](https://github.com/Inside4ndroid/js-dpad-navigation/actions/workflows/build.yml/badge.svg)](https://github.com/Inside4ndroid/js-dpad-navigation/actions/workflows/build.yml)
[![npm version](https://img.shields.io/npm/v/@inside4ndroid/js-dpad-nav.svg)](https://www.npmjs.com/package/@inside4ndroid/js-dpad-nav)
[![npm downloads](https://img.shields.io/npm/dm/@inside4ndroid/js-dpad-nav.svg)](https://www.npmjs.com/package/@inside4ndroid/js-dpad-nav)
[![License](https://img.shields.io/npm/l/@inside4ndroid/js-dpad-nav.svg)](https://github.com/Inside4ndroid/js-dpad-navigation/blob/master/LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

**A lightweight, zero-dependency TypeScript library for adding D-Pad/gamepad navigation to web applications**

[Installation](#-installation) • [Quick Start](#-quick-start) • [Documentation](#-documentation) • [Examples](#-examples) • [API](#-api-reference)

![D-Pad Navigation Demo](http://i.imgur.com/1LcHG7j.png)

</div>

---

## ✨ Features

- 🎯 **Zero Dependencies** - Lightweight and fast
- 📦 **TypeScript Support** - Full type definitions included
- 🎮 **Easy Integration** - Drop-in solution for D-Pad navigation
- 🐛 **Built-in Debugger** - Visual debugging tools included
- 🌐 **Universal** - Works with vanilla JS, React, Vue, and other frameworks
- 🔧 **Flexible API** - Use as CDN, npm module, or standalone scripts
- ♿ **Accessible** - Built on top of native focus management

## 📦 Installation

### Via npm (Recommended)

```bash
npm install @inside4ndroid/js-dpad-nav
```

### Via CDN

```html
<!-- Helper scripts (easiest way to get started) -->
<script src="https://unpkg.com/@inside4ndroid/js-dpad-nav@latest/build/helper/dpad.js" async defer></script>
<script src="https://unpkg.com/@inside4ndroid/js-dpad-nav@latest/build/helper/dpad-debugger.js" async defer></script>
```

## 🚀 Quick Start

### 1. Mark Your Focusable Elements

Add the `dpad-focusable` class and `tabindex` to any element you want to be navigable:

```html
<div class="dpad-focusable" tabindex="0">Menu Item 1</div>
<div class="dpad-focusable" tabindex="0">Menu Item 2</div>
<div class="dpad-focusable" tabindex="0">Menu Item 3</div>
```

### 2. Add Focus Styles

Style your elements when they receive focus:

```css
.dpad-focusable:focus {
  outline: none;
  background-color: #3498db;
  transform: scale(1.05);
  transition: all 0.2s ease;
}
```

### 3. Initialize the Library

#### Using Helpers (Automatic Setup)

The easiest way - just include the helper scripts and everything works automatically:

```html
<script src="https://unpkg.com/@inside4ndroid/js-dpad-nav@latest/build/helper/dpad.js" async defer></script>
<script src="https://unpkg.com/@inside4ndroid/js-dpad-nav@latest/build/helper/dpad-debugger.js" async defer></script>
```

Access the controllers via:
```javascript
window.dpad          // DpadController instance
window.dpaddebug     // DebugController instance
```

#### Using as an npm Module

```javascript
import { DpadController, DebugController } from '@inside4ndroid/js-dpad-nav';

// Initialize the controller
const dpad = new DpadController();
dpad.update();

// Enable debugging (optional)
const debug = new DebugController(dpad);
debug.setDebugMode(true);
```

#### Using CommonJS

```javascript
const { DpadController, DebugController } = require('@inside4ndroid/js-dpad-nav');

const dpad = new DpadController();
dpad.update();
```

That's it! Your app now supports D-Pad navigation using arrow keys. 🎉

## 📖 Documentation

### Key Concepts

**Focusable Elements**: Any DOM element with the class `dpad-focusable` and a `tabindex` attribute can be navigated via D-Pad.

**Navigation**: The library automatically calculates the nearest focusable element in each direction (up, down, left, right) based on geometric positioning.

**Dynamic Content**: Call `dpad.update()` whenever your DOM changes to recalculate navigation paths.

## 🎯 Examples

### Basic Grid Navigation

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    .grid {
      display: grid;
      grid-template-columns: repeat(3, 150px);
      gap: 20px;
    }
    .grid-item {
      padding: 40px;
      background: #ecf0f1;
      text-align: center;
      cursor: pointer;
    }
    .grid-item:focus {
      outline: none;
      background: #3498db;
      color: white;
      transform: scale(1.1);
      transition: all 0.2s ease;
    }
  </style>
</head>
<body>
  <div class="grid">
    <div class="grid-item dpad-focusable" tabindex="0">Item 1</div>
    <div class="grid-item dpad-focusable" tabindex="0">Item 2</div>
    <div class="grid-item dpad-focusable" tabindex="0">Item 3</div>
    <div class="grid-item dpad-focusable" tabindex="0">Item 4</div>
    <div class="grid-item dpad-focusable" tabindex="0">Item 5</div>
    <div class="grid-item dpad-focusable" tabindex="0">Item 6</div>
  </div>

  <script src="https://unpkg.com/@inside4ndroid/js-dpad-nav@latest/build/helper/dpad.js"></script>
  <script src="https://unpkg.com/@inside4ndroid/js-dpad-nav@latest/build/helper/dpad-debugger.js"></script>
</body>
</html>
```

### With React

```jsx
import { useEffect } from 'react';
import { DpadController } from '@inside4ndroid/js-dpad-nav';

function App() {
  useEffect(() => {
    const dpad = new DpadController();
    dpad.update();

    // Update when component re-renders
    return () => dpad.disable();
  }, []);

  return (
    <div className="menu">
      <button className="dpad-focusable" tabIndex={0}>Home</button>
      <button className="dpad-focusable" tabIndex={0}>About</button>
      <button className="dpad-focusable" tabIndex={0}>Contact</button>
    </div>
  );
}
```

### Dynamic Content

```javascript
const dpad = new DpadController();
dpad.update();

// When adding new elements dynamically
function addMenuItem(text) {
  const item = document.createElement('div');
  item.className = 'dpad-focusable menu-item';
  item.tabIndex = 0;
  item.textContent = text;
  document.querySelector('.menu').appendChild(item);
  
  // Update navigation paths
  dpad.update();
}
```

## 🔧 Advanced Usage

### Self-Hosting Helper Files

If you prefer to host the files yourself:

```bash
npm install @inside4ndroid/js-dpad-nav
cp -r ./node_modules/@inside4ndroid/js-dpad-nav/build/helper ./public/js/
```

```html
<script src="/js/helper/dpad.js"></script>
<script src="/js/helper/dpad-debugger.js"></script>
```

### Using Browser Bundles via CDN

For direct access to the classes:

```html
<script src="https://unpkg.com/@inside4ndroid/js-dpad-nav@latest/build/browser/index.js"></script>
<script>
  const dpad = new gauntface.dpad.DpadController();
  dpad.update();
</script>
```

## 🎮 API Reference

### DpadController

Main controller for D-Pad navigation.

#### Constructor

```typescript
new DpadController()
```

#### Methods

| Method | Description | Returns |
|--------|-------------|---------|
| `enable()` | Enables D-Pad navigation (enabled by default) | `void` |
| `disable()` | Disables D-Pad navigation | `void` |
| `update()` | Scans DOM for focusable elements and calculates navigation paths | `void` |
| `findFocusableItems()` | Finds all elements with `.dpad-focusable` class | `void` |
| `setCurrentFocusItem(index: number)` | Programmatically focus an item by index | `void` |
| `getFocusableItems()` | Returns array of all focusable items | `FocusableItem[]` |
| `getFocusableItem(index: number)` | Get a specific focusable item | `FocusableItem \| null` |
| `moveFocus(direction: Point)` | Move focus in a direction | `void` |

#### Keyboard Controls

| Key | Action |
|-----|--------|
| ⬆️ Arrow Up | Move focus up |
| ⬇️ Arrow Down | Move focus down |
| ⬅️ Arrow Left | Move focus left |
| ➡️ Arrow Right | Move focus right |
| ⏎ Enter / Space | Trigger click on focused element |

### DebugController

Visual debugging tool to see navigation paths.

#### Constructor

```typescript
new DebugController(dpad: DpadController)
```

#### Methods

| Method | Description | Returns |
|--------|-------------|---------|
| `setDebugMode(enabled: boolean)` | Enable/disable debug mode | `void` |
| `toggleDebugMode()` | Toggle debug mode on/off | `void` |
| `updateDisplay()` | Refresh debug visualization | `void` |

#### Debug Mode

When enabled, colored lines show the navigation path from each element:

![Debug Mode](http://i.imgur.com/7PT6tAa.png)

```javascript
// Toggle debug mode
window.dpaddebug.toggleDebugMode();

// Or programmatically
const debug = new DebugController(dpad);
debug.setDebugMode(true);
```

## 📡 Events

The library triggers standard DOM events, making it easy to integrate with existing code:

```javascript
// Listen for focus events
element.addEventListener('focus', (e) => {
  console.log('Element focused:', e.target);
});

// Listen for click events (triggered by Enter/Space)
element.addEventListener('click', (e) => {
  console.log('Element clicked:', e.target);
});
```

## 🎨 Styling Tips

### Modern Focus Styles

```css
.dpad-focusable {
  position: relative;
  transition: all 0.2s ease;
}

.dpad-focusable:focus {
  outline: none;
  transform: scale(1.05);
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.5);
  z-index: 10;
}
```

### Glow Effect

```css
.dpad-focusable:focus {
  outline: none;
  box-shadow: 0 0 20px rgba(52, 152, 219, 0.8);
  filter: brightness(1.2);
}
```

### Border Highlight

```css
.dpad-focusable:focus {
  outline: none;
  border: 3px solid #3498db;
  border-radius: 8px;
}
```

## 💡 Tips & Best Practices

- ✅ **Always include `tabindex`** - Required for elements to receive focus
- ✅ **Use `tabindex="0"`** - Makes elements focusable in natural tab order
- ✅ **Call `update()` after DOM changes** - Ensures navigation paths are current
- ✅ **Test with keyboard first** - Use Tab key before adding D-Pad library
- ✅ **Style `:focus` state** - Visual feedback is crucial for navigation
- ⚠️ **Avoid `tabindex="-1"`** - Elements won't be focusable by D-Pad
- ⚠️ **Hidden elements** - Elements with `display: none` or `visibility: hidden` are skipped

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the Apache-2.0 License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Original concept and implementation by [gauntface](https://github.com/gauntface)
- Modernized and maintained by [Inside4ndroid](https://github.com/Inside4ndroid)

## 📞 Support

- 📫 [Report Issues](https://github.com/Inside4ndroid/js-dpad-navigation/issues)
- 📦 [npm Package](https://www.npmjs.com/package/@inside4ndroid/js-dpad-nav)
- 💬 [Discussions](https://github.com/Inside4ndroid/js-dpad-navigation/discussions)

---

<div align="center">

Made with ❤️ for web developers building TV apps, kiosks, and accessible interfaces

**[⬆ back to top](#-d-pad-navigation-library)**

</div>

