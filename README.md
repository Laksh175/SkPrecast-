# 🏗️ SK Precast Industries — Official Web Platform

[![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.0-FF0055?logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![License](https://img.shields.io/badge/License-Proprietary-amber.svg)]()

> A modern, high-performance, and responsive web platform for **SK Precast Industries** — India's premier manufacturer and supplier of Precast Concrete Boundary Walls, Folding Compound Walls, RCC Cement Walls, and Modular Precast Infrastructure.

---

## 📌 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Technology Stack](#-technology-stack)
- [Project Architecture](#-project-architecture)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Development Server](#development-server)
  - [Production Build](#production-build)
- [Core Modules & Custom Components](#-core-modules--custom-components)
- [Company Information](#-company-information)
- [License](#-license)

---

## 🌐 Overview

This application delivers an end-to-end digital experience for clients, contractors, and job seekers looking to connect with **SK Precast Industries**. It includes an interactive 35+ product catalog, instant quotation calculators, an interactive manufacturing unit tour, video/photo galleries, and a full-featured career application portal.

---

## ✨ Key Features

- **🏢 Complete Product Catalog (35+ Products)**:
  - Deep-dive product specifications, features, applications, and technical diagrams.
  - Interactive e-commerce style **Image Zoom Magnifier** for high-resolution product inspection.
  - Category filtration across Compound Walls, Boundary Walls, Cement Walls, and Precast Panels.

- **⚡ Quick Quote Modal**:
  - Instant quotation request system with area calculations (Square Feet / Meters).
  - Multi-country phone verification with dial codes and automated WhatsApp routing.

- **💼 Career & Job Application Portal (`CurrentJobsPage`)**:
  - Dynamic grouped dropdowns for Qualifications (UG, PG, Doctorate, Custom).
  - Searchable Functional Areas and Notice Period selectors.
  - **Dynamic "Other" Input Fields**: Smooth animated text inputs that open automatically when custom options are chosen.
  - Secure resume document upload supporting `.pdf`, `.doc`, `.docx`, `.rtf` (up to **5 MB**).

- **🌍 Universal Common Components (`src/common/`)**:
  - `SearchableSelect`: Universal accessible combobox with live search filtering, categorized grouping, and keyboard navigation.
  - `CountryCodePicker`: Standardized international country selector with 240+ flags and dial codes.
  - `Button`: Premium multi-variant button system with ripple effects, glossy gradients, and loading states.

- **🏭 Manufacturing Unit Showcase**:
  - Automated batching plants, prestressing casting beds, and quality assurance testing lab showcases.
  - Infinite draggable image sliders and lightbox preview modals.

- **📍 Interactive Location & Contact Center**:
  - Direct factory Google Map integration with instant navigation links to the Palwal, Haryana manufacturing plant.
  - Direct inquiry submission with real-time field sanitization and validation.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend Framework** | [React 19](https://react.dev/) |
| **Build Tool & Bundler** | [Vite](https://vitejs.dev/) |
| **Styling & Design System** | [Tailwind CSS](https://tailwindcss.com/) & Vanilla CSS Design Tokens |
| **Animations & Transitions** | [Framer Motion](https://www.framer.com/motion/) |
| **Icons & Media Assets** | [Lucide React](https://lucide.dev/), [React Icons](https://react-icons.github.io/react-icons/) |
| **Routing & Navigation** | Custom History API & Smooth Scroll Navigation Engine |

---

## 📂 Project Architecture

```plaintext
skprecast/
├── frontend/
│   ├── public/
│   │   └── assets/images/        # High-res precast walls, plant photos & logos
│   ├── src/
│   │   ├── common/               # Shared reusable UI primitives
│   │   │   ├── Button.jsx        # Premium button component
│   │   │   ├── CountryCodePicker.jsx # 240+ Country dial code dropdown
│   │   │   ├── SearchableSelect.jsx  # Searchable categorized dropdown & combobox
│   │   │   └── index.js
│   │   ├── components/           # Feature & section components
│   │   │   ├── About/            # Story, mission, vision & factory stats
│   │   │   ├── Home/             # Hero, product range, testimonials, contact form
│   │   │   ├── products/         # Product cards, detail modals, zoom magnifier
│   │   │   ├── Header.jsx        # Sticky navigation with language selector
│   │   │   ├── Footer.jsx        # Comprehensive footer with links & languages
│   │   │   └── QuickQuoteModal.jsx # Rapid estimation popup
│   │   ├── data/                 # Modular, centralized static data stores
│   │   │   ├── aboutUsData.js
│   │   │   ├── blogData.js
│   │   │   ├── cataloguesData.js
│   │   │   ├── contactUsData.js
│   │   │   ├── currentJobsData.js
│   │   │   ├── galleryData.js
│   │   │   ├── homeData.js
│   │   │   ├── manufacturingUnitData.js
│   │   │   ├── navigationData.js
│   │   │   ├── productsData.js
│   │   │   ├── sitemapData.js
│   │   │   └── index.js
│   │   ├── hooks/                # Custom React hooks (click outside, infinite slider)
│   │   ├── pages/                # Top-level page views (Home, About, Products, Jobs, etc.)
│   │   ├── styles/               # Theme colors, CSS variables & typography tokens
│   │   ├── utils/                # Navigation helpers & formatters
│   │   ├── App.jsx               # Application root & dynamic page switcher
│   │   ├── main.jsx              # Vite React entrypoint
│   │   └── index.css             # Global Tailwind & design system directives
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (version 18.0 or higher) and `npm` installed.

```bash
node -v
npm -v
```

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Laksh175/SkPrecast-.git
   cd skprecast/frontend
   ```

2. **Install project dependencies**:
   ```bash
   npm install
   ```

### Development Server

Start the local development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

The application will be accessible at `http://localhost:5173`.

### Production Build

To compile and bundle the project for production deployment:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

---

## 🏢 Company Information

- **Company Name**: SK Precast Industries
- **Contact Person**: Mr. Vivek Koladiya
- **Factory / Plant Location**: Opp. Adani CNG Pump, Delhi-Mathura Road, Near Hanuman Mandir, Palwal, Haryana, India - 121102
- **Phone**: +91-8238902687 / +91-9896908099
- **Email**: [info@skprecast-industries.com](mailto:info@skprecast-industries.com)
- **Website**: [https://www.skprecast-industries.com](https://www.skprecast-industries.com)

---

## 📄 License

Copyright © 2026 **SK Precast Industries**. All rights reserved.
