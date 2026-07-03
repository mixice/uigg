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
import { Uigg, Pop, Tab, Menu, Swiper } from 'uigg'
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
    <link rel="stylesheet" href="lib/uigg.css">
    <link rel="stylesheet" href="styles/styles.css">
    <script type="module" src="lib/uigg.js"></script>
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
├── lib/
│   ├── uigg.js             # UIGG core JavaScript (v3.1, ES module)
│   ├── uigg.css            # UIGG core stylesheet
│   ├── ico/
│   │   ├── ico.css         # Icon font stylesheet
│   │   ├── ico.js          # Icon browser JS
│   │   ├── ico.json        # Icon metadata
│   │   ├── ico.woff2       # Icon font file
│   │   └── *.svg           # Individual icon SVGs
│   ├── editor/             # TinyMCE rich text editor
│   ├── font/               # Web fonts
│   ├── images/             # Placeholder images
│   └── media/              # Audio effect files
├── lang/
│   ├── en.json             # English language file
│   └── zh.json             # Chinese language file
├── styles/
│   └── styles.css          # Project custom styles
├── images/
│   └── ico.svg             # Favicon / logo
└── document/               # Documentation HTML pages
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

Layout utilities include `.flex`, `.flex-auto`, `.flex-column`, `.center`, `.clear`, `.hide`, `.show`, `.single` (text ellipsis), `.float-left`, `.float-right`, `.wide` / `.wide-10` through `.wide-90` (percentage widths), `.only-web` / `.only-mob` (responsive visibility), and absolute/fixed positioning helpers (`.absolute-1` through `.absolute-9`, `.fixed-1` through `.fixed-9`). Object-fit helpers: `[cover]` / `.cover`, `[contain]` / `.contain`. Blend/mix helpers: `.mix-mono`, `.mix-abrazine` (backdrop blur), `.mix-multiply`, `.mix-screen`.

---

## Components

UIGG provides 40+ built-in components. Each component uses semantic custom HTML elements and is automatically initialized on page load.

### Core Components

| Component | Tag / Class | Description |
|-----------|-------------|-------------|
| **Button** | `.btn` | Buttons with variants: empty, colored, disabled, icon, flex group (`btn-flex`), submit (`btn-submit`) |
| **Form** | `.form` | Complete form system with `<item>` / `<alia>` / `<cont>` / `<hint>` structure. Supports inputs, selects, textareas, choice, scaler, progress, range, date/time, color picker. Form API: `getData()`, `setData()`, `reset()`, `validate()` |
| **Table** | `.table` | Styled tables with thead/tbody/tfoot, sticky headers, zebra striping |
| **Tab** | `<tab>` | Tab switching with `<tab-list>` and `<tab-group>` |
| **Pop** | `<pop>` | Modal dialogs: center (`<pop-main>`), sider (`<pop-sider>` with `[right]`), choice (`<pop-choice>` with `[top]`) |
| **Alert** | `alert()` / `confirm()` / `prompt()` | Native alert/confirm/prompt replacement with Promise support |
| **Menu** | `<menu>` | Navigation menus with dropdown groups. Mobile: hamburger toggle |
| **Fold** | `<fold>` | Accordion / collapsible sections with `<fold-title>` and `<fold-cont>` |
| **Drop** | `<drop>` | Multi-level dropdown selectors with nested `<drop-list>` |
| **Choice** | `<choice>` | Custom select component with dropdown `<choice-list>`. Works seamlessly inside `.form` items |
| **Scaler** | `<scaler>` | Numeric stepper with `-` / `+` buttons, configurable via `min` / `max` / `step` attributes |
| **Rate** | `<rate>` | Star rating (editable), supports `[heart]`, `[thumb]`, `[circle]` variants. `getData()` returns current rating |
| **Progress** | `<progress>` | Native progress bar with CSS-driven color via `--progress-color`. Circle variant with `[circle]` attribute (uses `--progress-value` and `--progress-size`) |

### Interaction Components

| Component | Tag / Class | Description |
|-----------|-------------|-------------|
| **Toggle** | `<o>` | 26+ toggle types: radio, checkbox, favorite, star, visibility, password, mic, volume, toggle, etc. `el.getData()` / `el.setData(v)` read/write boolean values |
| **Drag** | `[drag]` | Drag-and-drop sort for `<li>` items within a container. Pointer Events based (mobile + desktop). `[ignore]` to exclude elements. Optional handle selector. Fires `sort` custom event |
| **Hop** | `<hop>` | Popover link containers with `<hop-cont>`. Supports `[right]` positioning |
| **Tip** | `tip()` | Toast notifications (green/red/orange/white/black types) |
| **Notify** | `notify()` | Notification toast system with sound, auto-dismiss, and positioning (`top`/`bottom`) |
| **Clue** | `[clue]` | Hover tooltips via `clue` attribute. Supports `[bottom]`, `[left]`, `[right]` directions |
| **Copy** | `[copy-btn]` | Clipboard copy on click. Copies text from `copy` attribute or parent text content |
| **Touch** | `touch(el, dir, callback)` | Swipe gesture detection (`up`/`down`/`left`/`right`/`all`) with configurable threshold |
| **Swiper** | `<swiper>` | Built-in carousel/slider. Supports standard, `[vertical]`, `[fade]`, `[thumb]` modes. Configurable via `view` attribute. Arrow/dot navigation. Hash/linking support |

### Display Components

| Component | Tag / Class | Description |
|-----------|-------------|-------------|
| **Anime** | `.anime-*` | 35+ CSS animations: fade, bounce, flip, zoom, shrink, rotate, spasm, beat. `.infinite` / `.alternate` / `.reverse` modifiers |
| **Step** | `<step>` | Step progress indicator. Supports `[column]` variant for vertical layout |
| **Crumb** | `<crumb>` | Breadcrumb navigation |
| **Page** | `<page>` | Pagination controls with prev/next, page input, and disabled states |
| **Empty** | `<empty>` | Empty state placeholder. `.default` variant uses `data-empty` attribute |
| **Horn** | `<n>` | Floating badge / corner mark. Supports `[left]` positioning. Clickable with `.ico` |
| **Notice** | `<notice>` | Scrolling announcement bar with pause-on-hover |
| **Title** | `.title` / `.title-flex` | Section title decorators |
| **Countdown** | `<countdown>` | Countdown timer via `Uigg.countdown(date)`. Displays days/hours/minutes/seconds |
| **Reminder** | `<reminder>` | Reminder / info block with border |
| **Load** | `<load>` | Auto-dismissing page loader (disappears when `Uigg.init()` completes) |
| **Top** | `.top` | Back-to-top floating button |
| **Images** | `<images>` | Image upload component with thumbnail preview, multi-file support, delete buttons. `<images name="xxx">` integrates with Form API (`getData()` returns `[File, ..., 'url', ...]`). Drag-sort support |

### Media Components

| Component | Tag / Class | Description |
|-----------|-------------|-------------|
| **Music** | `<music>` | Background music player with WeChat autoplay support. Animated rotating disc |
| **Audio** | `initAudio()` | Sound effect triggers via class names (`audio-*`) |
| **Fullscreen** | `initFullscreen()` | Fullscreen toggle button via `.fullscreen` class |

### Mobile Terminal

| Component | Tag / Class | Description |
|-----------|-------------|-------------|
| **Name** | `<name>` | Mobile page header with back button (`<hop>`), logo (`<name-logo>`), and search (`<name-search>`) |
| **Nav** | `<nav>` | Bottom navigation bar. `[uigg]` variant enables curved style with central action button |
| **Space** | `<space>` | Spacing element for bottom nav clearance (auto-displayed on mobile) |

### Form System

UIGG forms use a structured layout:

```html
<form class="form">
    <item>
        <alia>Label</alia>
        <cont>
            <input name="field1" placeholder="Enter value">
        </cont>
        <hint>Help text</hint>
    </item>
    <item class="resolve">
        <o class="checkbox active" name="agree"></o>
        <alia>I agree to terms</alia>
    </item>
    <item>
        <cont>
            <button class="btn btn-submit" type="submit">Submit</button>
        </cont>
    </item>
</form>
```

| Element | Role |
|---------|------|
| `<item>` | Form row container (flex). Add `.error` class for validation error state |
| `<alia>` | Label area (120px on desktop, full-width on mobile) |
| `<cont>` | Control area (flex container, wraps controls) |
| `<hint>` | Help text / validation message |
| `.resolve` | For checkbox/radio agreements and button groups (no `<cont>` needed) |

**Form API** (via `Uigg.form(formElement)` or `formController(formElement)`):

| Method | Description |
|--------|-------------|
| `getData()` | Collect all named form values into a JSON object. Supports `<choice>`, `<scaler>`, `<o>`, `<images>`, TinyMCE editors |
| `setData(obj)` | Populate form fields from a data object |
| `reset()` | Reset all fields to their initial/default values |
| `validate()` | Run HTML5 constraint validation. Returns `boolean`. Adds `.error` class to invalid `<item>` elements |
| `submit(method, url, callback)` | Validate, collect data, and submit via fetch or form POST |

---

## Drag Sort

The `[drag]` attribute enables drag-and-drop reordering of `<li>` items within any container. Built with Pointer Events for full mobile + desktop support.

```html
<!-- Full-row draggable -->
<ul drag>
    <li>Item A <button ignore>Delete</button></li>
    <li>Item B</li>
    <li>Item C</li>
</ul>

<!-- Handle-only dragging -->
<ol drag=".handle">
    <li><span class="handle">⠿</span> Item A</li>
    <li><span class="handle">⠿</span> Item B</li>
</ol>
```

- `[drag]` — make all `<li>` children draggable
- `[drag=".selector"]` — restrict drag initiation to elements matching the handle selector
- `[ignore]` — mark child elements (buttons, inputs) that should NOT trigger drag
- `sort` event — fires after reorder completes. Access sorted children via `e.target.children`

```js
document.querySelector('[drag]').addEventListener('sort', e => {
    const order = [...e.target.children].map(li => li.dataset.id)
    console.log('New order:', order)
})
```

- **Multiple instances**: each `[drag]` container operates independently
- **Form integration**: `<images>` uses `[drag]` internally for thumbnail reordering
- **CSS**: `.drag-float` (floating ghost), `.drag-hole` (dashed placeholder), `[drag] li { cursor: move }`

---

### Utility Functions

| Function | Description |
|----------|-------------|
| `$` / `$$` | Query shorthand (`document.querySelector` / `querySelectorAll`), also exposed as `Uigg.$` / `Uigg.$$` |
| `setCookie(name, value, hours)` | Set a browser cookie |
| `getCookie(name)` | Read a browser cookie |
| `disable()` | Disable right-click, select, drag, copy, cut, and dev tools shortcuts |
| `tip(text, type)` | Show a centered toast notification |
| `notify(text, align, time)` | Show a notification with sound |
| `alert(message)` | Custom alert dialog |
| `confirm(message)` | Custom confirm dialog (returns Promise) |
| `prompt(message, default)` | Custom prompt dialog (returns Promise) |
| `countdown(date)` | Start a countdown timer on `<countdown>` elements |
| `touch(el, dir, callback, threshold)` | Swipe gesture detection |
| `alone(el)` | Split text content into individual `<z>` wrap elements |
| `mobile(bool)` | Enable/disable forced mobile mode |
| `isMobileView()` | Check if currently in mobile viewport |
| `notifyRemove(el)` | Programmatically dismiss a notification |
| `initLang()` | Manually trigger language file reload |

### Uigg Global API

All utilities are accessible via the `Uigg` object (also attached to `window.Uigg`):

```js
// Notifications & dialogs
Uigg.tip('Hello!')
Uigg.notify('New message', 'top', 5000)
Uigg.alert('Notice')
Uigg.confirm('Are you sure?').then(result => console.log(result))
Uigg.prompt('Enter name:').then(value => console.log(value))

// Form
Uigg.form(formEl).getData()     // collect form data
Uigg.form(formEl).setData(obj)  // populate form
Uigg.form(formEl).reset()       // reset to defaults
Uigg.form(formEl).validate()    // validate
Uigg.form(formEl).submit('POST', '/api', callback)

// Events & utilities
Uigg.touch(el, 'left', callback)
Uigg.countdown('2026-12-31')
Uigg.mobile(true)
Uigg.alone(document.querySelectorAll('h1'))
Uigg.disable()

// State
Uigg.isMobileView()
Uigg.setCookie('key', 'val', 24)
Uigg.getCookie('key')
Uigg.lang('some.key')  // get localized string
```

---

## Color System

UIGG includes a comprehensive CSS custom property color system defined in `:root`.

### Grayscale

`--fff` (#fff), `--f7` (#f7f7f7), `--eee`, `--ddd`, `--ccc`, `--bbb`, `--999`, `--666`, `--333`, `--222`, `--111`, `--000` (#000)

### Accent Colors

`--brown` (#8d1313), `--red` (#ff3b52), `--pink` (#ff3ea6), `--purple` (#d844d8), `--sapphire` (#6c62f9, **default theme color**), `--blue` (#2e6efd), `--cyan` (#0df0f0), `--green` (#47DCA1), `--lime` (#af0), `--yellow` (#fe0), `--orange` (#fb0), `--tomato` (#f60)

### Transparency

9-level black transparency: `--000-1` through `--000-9` (rgba 0.1 to 0.9, via `color-mix`)
9-level white transparency: `--fff-1` through `--fff-9` (rgba 0.1 to 0.9, via `color-mix`)

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
