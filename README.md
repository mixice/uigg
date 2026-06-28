# UIGG

[![](https://data.jsdelivr.com/v1/package/npm/uigg/badge)](https://www.jsdelivr.com/package/npm/uigg)
[![license](https://img.shields.io/github/license/mixice/uigg)](LICENSE)

UIGG is a lightweight, responsive front-end UI framework designed for rapid prototyping. It provides a rich set of CSS components, custom HTML elements, a built-in icon library, and native JavaScript utilities — all out of the box.

**Official website:** [ui.gg](https://ui.gg/) · **Icon Library:** [uigg ico](https://ui.gg/ico.php) · **Author:** [mixice.com](http://mixice.com/)

---

## Table of Contents

- [Features](#features)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Responsive Design](#responsive-design)
- [Components](#components)
- [Color System](#color-system)
- [Icon Library](#icon-library)
- [Internationalization](#internationalization)
- [CDN & External Libraries](#cdn--external-libraries)
- [Browser Support](#browser-support)
- [License](#license)

---

## Features

- **Lightweight & fast** — minimal footprint with maximum utility
- **No dependencies** — pure vanilla JavaScript, zero external runtime requirements
- **ES Module native** — supports `import` / `export`, loaded via `type="module"`
- **Responsive by default** — rem-based responsive layout with automatic mobile adaptation
- **Custom semantic elements** — uses intuitive custom HTML tags (`<pop>`, `<tab>`, `<fold>`, `<nav>`, `<menu>`, `<chat>`, etc.)
- **Rich component library** — 40+ built-in UI components covering forms, navigation, modals, animations, and more
- **Built-in icon font** — hundreds of beautifully crafted icons via the UIGG icon library
- **i18n support** — multi-language system using JSON language files and cookie-based language switching
- **Animation system** — comprehensive CSS animation classes (fade, bounce, flip, zoom, shrink, and more)
- **Color presets** — a complete CSS custom property color system with grays, accent colors, and transparency levels
- **Mobile terminal components** — dedicated mobile UI patterns (page name header, bottom navigation, music player)
- **Admin template** — includes a ready-to-use admin panel with login page
- **Uigg global API** — unified `Uigg` object exposing all utilities (`Uigg.tip()`, `Uigg.alert()`, `Uigg.touch()`, etc.)

---

## Quick Start

### Install via npm

```bash
npm i uigg
```

Import in your project:

```js
import 'uigg/uigg.css'   // styles
import 'uigg'             // javascript (ES module)
```

Or import specific exports:

```js
import { Uigg, Pop, Tab, Menu } from 'uigg'
```

### Install via CDN

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/uigg/uigg.min.css">
<script type="module" src="https://cdn.jsdelivr.net/npm/uigg"></script>
```

### Install via unpkg

```
https://unpkg.com/uigg
```

### Clone from GitHub

```bash
git clone https://github.com/mixice/uigg.git
```

### Download

Download the ZIP directly from the [official website](https://ui.gg/uigg.zip).

Design templates are also available: [Adobe XD](https://ui.gg/xd.zip) · [Figma](https://www.figma.com/@mixice)

### Basic HTML Template

```html
<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <title>My UIGG Project</title>
    <link rel="stylesheet" href="styles/uigg.css">
    <link rel="stylesheet" href="styles/styles.css">
    <script type="module" src="js/uigg.js"></script>
</head>
<body>
    <load></load>
    <section class="main">
        <!-- your content here -->
    </section>
</body>
</html>
```

---

## Project Structure

```
uigg/
├── index.html              # Entry HTML template
├── js/
│   └── uigg.js             # UIGG core JavaScript (v3.0, ES module)
├── styles/
│   ├── uigg.css            # UIGG core stylesheet
│   ├── styles.css           # Project custom styles
│   ├── admin.css            # Admin panel styles
│   └── ico/
│       ├── ico.css          # Icon font stylesheet
│       └── ico.woff2        # Icon font file
├── lang/
│   ├── en.json              # English language file
│   └── zh.json              # Chinese language file
├── images/
│   └── ico.svg              # Favicon / logo
├── admin/                   # Admin panel template
│   ├── login.html           # Admin login page
│   ├── index.html           # Admin dashboard
│   ├── admin.html           # Admin content page
│   ├── js/admin.js          # Admin JavaScript
│   └── styles/admin.css     # Admin styles
└── chat/                    # Chat interface template
    ├── index.html           # Chat page
    ├── js/chat.js           # Chat JavaScript
    └── styles/chat.css      # Chat styles
```

---

## Responsive Design

UIGG uses **rem** as its responsive unit. The base calculation rule is **100px = 1rem** at the 640px design width. The framework automatically scales font sizes and layout based on the viewport width using `ResizeObserver`.

### Layout Containers

| Class | Description |
|-------|-------------|
| `.main` | Content center, max-width 1300px (desktop) |
| `.mobile` | Content center, max-width 640px (mobile) |
| `.full` | 100% width and height |
| `.full-device` | 100vw width and 100vh height |
| `.block` | Full-width block with overflow hidden |

### Force Mobile Mode

```js
mobile(true)   // enable mobile mode
mobile(false)  // disable mobile mode
```

### Utility Classes

Layout utilities include `.flex`, `.flex-auto`, `.flex-column`, `.center`, `.clear`, `.hide`, `.show`, `.single` (text ellipsis), `.float-left`, `.float-right`, `.wide` / `.wide-10` through `.wide-90` (percentage widths), `.only-web` / `.only-mob` (responsive visibility), and absolute/fixed positioning helpers (`.absolute-1` through `.absolute-9`, `.fixed-1` through `.fixed-9`).

---

## Components

UIGG provides 40+ built-in components. Each component uses semantic custom HTML elements and is automatically initialized on page load.

### Core Components

| Component | Tag / Class | Description |
|-----------|-------------|-------------|
| **Button** | `.btn` | Buttons with variants: empty, colored, disabled, icon, flex group |
| **Form** | `.form` | Complete form system: inputs, selects, textareas, file upload, progress, range, date/time, color picker. Toggle/checkbox collected as boolean, unified `getData()` / `setData()` pipe |
| **Table** | `.table` | Styled tables with thead/tbody/tfoot |
| **Tab** | `<tab>` | Tab switching with `<tab-list>` and `<tab-cont>` |
| **Pop** | `<pop>` | Modal dialogs: center (`<pop-main>`), sider (`<pop-sider>`), choice (`<pop-choice>`) |
| **Alert** | `alert()` | Native alert/confirm/prompt replacement with Promise support |
| **Menu** | `<menu>` | Navigation menus with dropdown groups |
| **Fold** | `<fold>` | Accordion / collapsible sections |
| **Drop** | `<drop>` | Dropdown selectors with nested sub-menus |

### Interaction Components

| Component | Tag / Class | Description |
|-----------|-------------|-------------|
| **Toggle** | `<o>` | 26+ toggle types: checkbox, radio, favorite, star, visibility, password, mic, volume, toggle, etc. `el.getData()` / `el.setData(v)` read/write boolean values anywhere |
| **Rate** | `<rate>` | Star rating (editable), with heart/thumb/circular variants |
| **Scaler** | `<scaler>` | Numeric stepper with +/- buttons, configurable step/min/max |
| **Hop** | `<hop>` | Popover link containers |
| **Tip** | `tip()` | Toast notifications (ok/error/warning/info types) |
| **Notify** | `notify()` | Notification system with sound, auto-dismiss, and positioning |
| **Clue** | `[clue]` | Enhanced title tooltips with directional positioning |
| **Copy** | `[copy-btn]` | Clipboard copy (button-triggered or selection-based) |
| **Touch** | `.touch()` | Swipe gesture detection (up/down/left/right/all) |

### Display Components

| Component | Tag / Class | Description |
|-----------|-------------|-------------|
| **Anime** | `.anime-*` | 30+ CSS animations: fade, bounce, flip, zoom, shrink, rotate, spasm |
| **Step** | `<step>` | Step progress indicator |
| **Crumb** | `<crumb>` | Breadcrumb navigation |
| **Page** | `<page>` | Pagination controls |
| **Fold** | `<fold>` | Collapsible content groups |
| **Empty** | `<empty>` | Empty state placeholder |
| **Horn** | `<n>` | Floating badge / corner mark |
| **Notice** | `<notice>` | Scrolling announcement bar |
| **Title** | `.title` | Section title decorators |
| **Countdown** | `<countdown>` | Countdown timer (days/hours/minutes/seconds) |
| **Reminder** | `<reminder>` | Reminder placeholder |

### Media Components

| Component | Tag / Class | Description |
|-----------|-------------|-------------|
| **Music** | `<music>` | Background music player with WeChat autoplay support |
| **Audio** | `.audio-*` | 14 sound effect triggers (click-to-play) |
| **Recording** | `.recording` | Screen recording via MediaRecorder API |
| **Fullscreen** | `.fullscreen` | Fullscreen toggle button |

### Mobile Terminal

| Component | Tag / Class | Description |
|-----------|-------------|-------------|
| **Name** | `<name>` | Mobile page header with back button, logo, and search |
| **Nav** | `<nav>` | Bottom navigation bar (supports UIGG curved style) |

### Internal / External

| Component | Description |
|-----------|-------------|
| **Chat** | Full chat interface with message list, emoticons, file upload, and real-time messaging |
| **Admin** | Admin panel template with login, dashboard, and sidebar navigation |
| **Swiper** | Carousel/slider integration (banner, list, vertical, gallery, animate, hash, scrollbar, coverflow, parallax) |
| **Editor** | Rich text editor integration (based on TinyMCE) |

### Utility Functions

| Function | Description |
|----------|-------------|
| `setCookie(name, value, hours)` | Set a browser cookie |
| `getCookie(name)` | Read a browser cookie |
| `disable()` | Disable right-click, select, drag, copy, cut, and dev tools shortcuts |
| `tip(text, type)` | Show a centered toast notification |
| `notify(text, align, time)` | Show a notification with sound |
| `alert(message)` | Custom alert dialog |
| `confirm(message)` | Custom confirm dialog (returns Promise) |
| `prompt(message, default)` | Custom prompt dialog (returns Promise) |

### Uigg Global API

All utilities are accessible via the `Uigg` object (also attached to `window.Uigg`):

```js
Uigg.tip('Hello!')
Uigg.alert('Notice')
Uigg.confirm('Are you sure?').then(result => console.log(result))
Uigg.prompt('Enter name:').then(value => console.log(value))
Uigg.notify('New message', 'top', 5000)
Uigg.countdown('2026-12-31')
Uigg.mobile(true)
Uigg.touch(document.body, 'left', () => console.log('swiped left'))
Uigg.alone(document.querySelectorAll('h1'))
Uigg.isMobileView()
```

---

## Color System

UIGG includes a comprehensive CSS custom property color system defined in `:root`.

### Grayscale

`--fff` (#fff), `--f7` (#f7f7f7), `--eee`, `--ddd`, `--ccc`, `--bbb`, `--999`, `--666`, `--333`, `--222`, `--111`, `--000` (#000)

### Accent Colors

`--brown` (#8d1313), `--red` (#ff3b52), `--pink` (#ff3ea6), `--purple` (#d844d8), `--sapphire` (#6c62f9, **default theme color**), `--blue` (#2e6efd), `--cyan` (#0df0f0), `--green` (#47DCA1), `--lime` (#af0), `--yellow` (#fe0), `--orange` (#fb0), `--tomato` (#f60)

### Transparency

9-level black transparency: `--000-1` through `--000-9` (rgba 0.1 to 0.9)
9-level white transparency: `--fff-1` through `--fff-9` (rgba 0.1 to 0.9)

### Usage

Colors can be applied via CSS variables (`var(--red)`), color classes (`.co-red` for text, `.bg-red` for background), or combined on buttons (`.btn.bg-red`, `.btn.co-red`).

---

## Icon Library

UIGG ships with its own icon font library containing hundreds of icons for common UI actions, social brands, device types, and more.

```html
<i class="ico ico-search"></i>
<i class="ico ico-user"></i>
<i class="ico ico-home"></i>
```

Icons are available as CSS font icons, SVG files, and via the UIGG icon API.

- Browse all icons: [ui.gg/ico.php](https://ui.gg/ico.php)
- Download icon pack: [ui.gg/lib/ico/ico.zip](https://ui.gg/lib/ico/ico.zip)
- CDN: `https://cdn.jsdelivr.net/npm/uigg/ico/ico.min.css`

---

## Internationalization

UIGG has a built-in multi-language system using JSON files in the `lang/` directory.

### Setup

1. Create language JSON files (e.g., `lang/en.json`, `lang/zh.json`)
2. Add `lang-set` attributes to language-switching elements
3. Use `lang` attributes on translatable elements

```html
<!-- Switch language -->
<a lang-set="en">English</a>
<a lang-set="zh">中文</a>

<!-- Translatable elements -->
<h1 lang="lang-one"></h1>
<input lang-placeholder="lang-one">
<meta lang-content="lang-one">
```

Language preference is stored in a cookie (`lang`) and persists for 72 hours.

---

## CDN & External Libraries

UIGG integrates with several external libraries via CDN:

| Library | Official CDN | jsDelivr CDN |
|---------|-------------|--------------|
| UIGG CSS | `//ui.gg/lib/uigg.css` | `//cdn.jsdelivr.net/npm/uigg/uigg.min.css` |
| UIGG JS | `//ui.gg/lib/uigg.js` | `//cdn.jsdelivr.net/npm/uigg` |
| Swiper | `//ui.gg/lib/swiper-bundle.min.css/js` | `//cdn.jsdelivr.net/npm/swiper/swiper-bundle.min.css/js` |
| Editor | `//ui.gg/lib/editor/editor.js` | `//cdn.jsdelivr.net/npm/uigg/editor/editor.min.js` |
| Web Fonts | `//ui.gg/lib/font/font.css` | `//cdn.jsdelivr.net/npm/uigg/font/font.min.css` |

Additional library resources include emot icons (`/lib/emot/`), audio effects (`/lib/media/`), and placeholder images (`/lib/images/`).

---

## Browser Support

UIGG supports all modern browsers. Internet Explorer is **not supported** — the framework automatically detects IE and displays a browser upgrade prompt.

Supported browsers include Chrome, Firefox, Safari, Edge, and their mobile counterparts.

---

## License

UIGG is released under the [MIT License](https://opensource.org/licenses/MIT).
