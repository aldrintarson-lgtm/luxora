# LUXORA — Smart Travel Bag (Product Presentation Website)

> **"Travel smarter. Travel secure."**

A cinematic, fluid, scroll-driven, dark, Apple/Nothing-style product launch website engineered for a class presentation. Built with **Vite, React, TypeScript, Three.js (@react-three/fiber & @react-three/drei), Tailwind CSS v4, Lenis, and Lucide React**.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser.

### 3. Build for Production
```bash
npm run build
npm run preview
```

---

## 🎒 3D Model & Images Location

### 3D CAD STL Model: `/public/models/bag.stl`
- Place your 3D STL file at:
  ```
  public/models/bag.stl
  ```
- **Auto-centering & scaling**: The 3D viewer automatically calculates bounding boxes, centers the model at `(0, 0, 0)`, computes smooth vertex normals, and normalizes its scale.
- **Orientation Adjustment**: If your STL model was exported from CAD (SolidWorks, Fusion 360, Blender) sideways or upside down, open `src/config/luxora.ts` and adjust the rotation offset:
  ```typescript
  // in src/config/luxora.ts:
  model: {
    stlPath: '/models/bag.stl',
    rotationOffset: [0, 0, 0], // e.g. [-Math.PI / 2, 0, 0] or [0, Math.PI, 0]
    scaleMultiplier: 1.0,
  }
  ```
- **Missing File Error Handling**: If `bag.stl` is missing or fails to load, a friendly warning banner appears explaining where to place the file, while simultaneously rendering a precision procedural fallback model so your presentation never breaks.

### Design Sketches & R&D Renders: `/public/images/`
Place your imagery into `public/images/`:
- `public/images/sketch-1.jpg` — Industrial design concept sketch & orthographic blueprint.
- `public/images/sketch-2.jpg` — Mechanism detail blueprint (2FA lock, mobile stand, cup holder).
- `public/images/render-1.jpg` — Final 3D studio raytraced CGI render.

*(High-resolution production blueprints and studio renders are already pre-generated and included in `/public/images/`!)*

---

## 🖥️ Class Presenter Mode

The website is designed so each of the 7 sections fits neatly into one presentation slide:

| Key | Action |
| :--- | :--- |
| **`↓` / `→` / `PageDown`** | Smoothly advance to the **Next Section** |
| **`↑` / `←` / `PageUp`** | Smoothly return to the **Previous Section** |
| **`F`** | Toggle **Native Fullscreen** presentation mode |
| **`P`** | Toggle **Presenter Shortcuts HUD & Navigation Drawer** |
| **`Home` / `End`** | Jump directly to **Slide 1 (Hero)** or **Slide 7 (Team)** |

### Side Indicator Dots
- Interactive floating dots on the right edge track your current slide in real-time.
- Hover over any dot to view its section title, or click to jump directly.

---

## 📑 7-Section Page Architecture

1. **Navbar & Hero Overview** (`#hero`):
   - Glassmorphic navbar with auto-hide on scroll down and reveal on scroll up.
   - Large centered rotatable 3D model with soft studio lighting, ContactShadows, and `MeshPhysicalMaterial`.
   - 6 Live color swatches (Stealth Obsidian, Titanium Platinum, Cyber Violet, Electric Cobalt, Emerald Matrix, Sahara Dune).
   - "Auto-rotate" toggle and "Reset view" camera controls.
2. **Problem & Solution** (`#problem-solution`):
   - 4 Major Travel Pain Points: 26M+ lost bags, vulnerable 3-digit zipper locks, dead devices at gates, and clumsy handling.
   - Side-by-side comparison table: Conventional luggage vs. LUXORA Smart Ecosystem.
3. **Scroll-Driven 3D Feature Tour** (`#showcase`):
   - Sticky pinned 3D model with smooth camera moves targeting the relevant component for each feature:
     - Top OLED console & controls
     - 360° Hinomoto dual wheels
     - Retractable cup holder & mobile stand
     - Two-Factor NFC + PIN cryptographic lock
   - Step buttons (1 to 9) allowing presenters to click any feature directly.
4. **Bento Grid Architecture** (`#bento`):
   - Modern Bento-box layout showcasing all 9 features.
   - **Interactive 2FA Lock Simulation**: Tap virtual NFC card, enter 4-digit PIN (`1337`), and watch the electronic latch disengage.
   - **Interactive GPS Phone Mockup**: Simulated smartphone with radar sweep, coordinate telemetry, and proximity ping beacon.
5. **Studio Configurator** (`#customize`):
   - Live 3D model customizer with 6 colors and 4 panel finishes (Classic Matte, Brushed Carbon, Aerospace Aluminum, Nebula Prismatic).
   - Real-time spec calculation and live configuration label.
   - "Reserve Configuration" modal with celebratory confetti explosion!
6. **Design & R&D Process** (`#design-process`):
   - Interactive Before & After comparison slider between original CAD blueprint and final 3D render.
   - Gallery cards with zoom lightbox for technical blueprints.
7. **Team, Objective & Luxury Footer** (`#team`):
   - Prominent statement of the project's core objective.
   - Configurable team member cards.
   - Class presentation showcase attribution and luxury footer.

---

## ⚙️ Content Customization

All text content, product specifications, team members, colors, and camera presets are centralized in a single configuration file:
```
src/config/luxora.ts
```
To update the project details or edit the team members for your presentation, modify `src/config/luxora.ts`:
```typescript
team: [
  {
    name: 'Your Name',
    role: 'Lead Industrial Designer & CAD',
    bio: 'Architected the monocoque aerodynamic shell...',
    initials: 'YN',
  },
  // ...
]
```

---

## 🎨 Tech Stack
- **Framework**: React 19 + TypeScript + Vite 8
- **Styling**: Tailwind CSS v4 + Vanilla CSS Design Tokens
- **3D Graphics**: Three.js + `@react-three/fiber` + `@react-three/drei`
- **Scrolling**: Lenis Smooth Inertial Scrolling
- **Icons**: Lucide React
- **Confetti**: `canvas-confetti`
