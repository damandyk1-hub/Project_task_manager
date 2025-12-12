# LMS Frontend Prototype Documentation

## 1. Overview

This document provides technical documentation for the Learning Management System (LMS) Frontend Prototype. This application is a Single Page Application (SPA) designed to serve as a landing and course catalog interface for an educational platform. It is built using the React ecosystem and leverages modern build tools for optimized performance and developer experience.

## 2. Technical Specifications

### 2.1 Core Stack
*   **Runtime Environment**: Node.js (v18.0.0 or higher recommended)
*   **Framework**: React v19.x
*   **Build System**: Vite v7.x
*   **Language**: JavaScript (ESNext)
*   **Styling**: CSS3 (Custom Properties), Bootstrap v5.3 (Grid System & Utilities)

### 2.2 Key Dependencies
*   `react`: Core UI library.
*   `react-dom`: DOM rendering entry point.
*   `react-bootstrap`: React component wrappers for Bootstrap.
*   `bootstrap-icons`: SVG icon library.
*   `vite`: Next-generation frontend tooling.

## 3. Getting Started

### 3.1 Prerequisites
Ensure the following are installed on the development machine:
*   **Node.js**: [Download](https://nodejs.org/) (LTS version recommended).
*   **NPM**: Included with Node.js.

### 3.2 Installation
1.  Navigate to the project root directory.
2.  Install project dependencies:
    ```bash
    npm install
    ```

### 3.3 Development Server
To start the local development server with Hot Module Replacement (HMR):
```bash
npm run dev
```
The application will be accessible at `http://localhost:5173` by default.

## 4. System Architecture

### 4.1 Design Pattern
The application follows a **Component-Based Architecture**. The UI is decomposed into independent, reusable pieces (components), each responsible for a specific part of the interface. Data flows unidirectionally (top-down) via props, while state is managed locally within components or lifted to common ancestors when necessary.

### 4.2 Directory Structure
The project adheres to a standard Vite + React scaffolding structure:

```
prototype/
├── public/                  # Static assets served directly (favicon, robots.txt)
├── src/
│   ├── assets/              # Source assets (images, fonts) processed by build
│   ├── components/          # React Components (Presentation & Logic)
│   │   ├── Contact.jsx      # Contact form module
│   │   ├── Courses.jsx      # Course catalog module
│   │   ├── Features.jsx     # Features/Benefits module
│   │   ├── Footer.jsx       # Site footer module
│   │   ├── Hero.jsx         # Hero/Landing module
│   │   └── Navbar.jsx       # Navigation module
│   ├── App.css              # Global styles, variables, and animations
│   ├── App.jsx              # Root Component (Layout composition)
│   └── main.jsx             # Application Entry Point (DOM Mounting)
├── index.html               # HTML Entry Point
├── package.json             # Project manifest and scripts
└── vite.config.js           # Vite configuration
```

## 5. Component Reference

### 5.1 Navbar (`src/components/Navbar.jsx`)
**Responsibility**: Handles global navigation and mobile menu toggling.
*   **State**: `expanded` (Boolean) - Tracks the open/closed state of the mobile hamburger menu.
*   **Behavior**:
    *   Attaches a scroll listener (via CSS classes) to apply backdrop blur effects.
    *   Automatically collapses the mobile menu upon selecting a navigation item.

### 5.2 Hero (`src/components/Hero.jsx`)
**Responsibility**: Displays the primary value proposition and call-to-action (CTA).
*   **Features**:
    *   Implements CSS-only animations for floating elements (`@keyframes float`).
    *   Uses absolute positioning for decorative background elements.

### 5.3 Courses (`src/components/Courses.jsx`)
**Responsibility**: Renders the list of available courses.
*   **Data Source**: Internal constant `coursesData` (Array of Objects).
*   **Rendering Logic**: Maps over the data array to generate `Card` components.
*   **Layout**: Utilizes Bootstrap's Grid system (`Row`, `Col`) for responsive arrangement (1 column on mobile, 2 on tablet, 3 on desktop).

### 5.4 Contact (`src/components/Contact.jsx`)
**Responsibility**: User inquiry collection.
*   **State**: `formData` (Object) - Stores values for `name`, `email`, `subject`, `message`.
*   **Validation**: HTML5 constraint validation (`required`, `type="email"`).
*   **Submission Logic**:
    *   Intercepts default form submission (`e.preventDefault()`).
    *   Simulates an asynchronous API call using `setTimeout`.
    *   Provides visual feedback upon success.

## 6. Styling & Theming

### 6.1 CSS Variables
The application uses CSS Custom Properties for theming, defined in `:root` within `App.css`. This allows for centralized management of colors and spacing.

```css
:root {
  --primary-color: #6366f1;
  --secondary-color: #0ea5e9;
  --dark-color: #0f172a;
  --glass-bg: rgba(255, 255, 255, 0.1);
}
```

### 6.2 Responsive Design Strategy
*   **Mobile-First**: Base styles are optimized for mobile.
*   **Breakpoints**:
    *   `< 768px`: Mobile layout (Stacked elements, hidden navigation).
    *   `768px - 991px`: Tablet layout (Condensed grids).
    *   `> 992px`: Desktop layout (Full navigation, expanded grids).

## 7. Build & Deployment

### 7.1 Production Build
To generate a production-ready build:
```bash
npm run build
```
This command invokes `vite build`, which:
1.  Transpiles React/JSX to standard JavaScript.
2.  Bundles and minifies assets.
3.  Outputs optimized files to the `dist/` directory.

### 7.2 Preview
To preview the production build locally:
```bash
npm run preview
```

### 7.3 Deployment
The contents of the `dist/` directory are static files that can be deployed to any static hosting provider (e.g., Nginx, Apache, Vercel, Netlify, AWS S3). Ensure the server is configured to serve `index.html` for SPA routing if client-side routing is added in the future.

---
*Documentation generated for version 1.0.0*
