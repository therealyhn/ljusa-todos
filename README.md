# LJUSA x TODOS — Official Website

A premium, high-performance portfolio and booking platform for the DJ duo **LJUSA x TODOS**. This project features a cinematic dark-themed UI, integrated media players, and a dynamic content management system.

![GitHub Repo Size](https://img.shields.io/github/repo-size/therealyhn/ljusa-todos?color=white&label=repo%20size&style=flat-square)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)
![Sanity](https://img.shields.io/badge/Sanity-F03E2F?style=flat-square&logo=sanity&logoColor=white)

---

## ✨ Features

- **💎 Premium Editorial Design**: A custom-built dark UI focusing on high-contrast typography and fluid animations via `animate.css`.
- **🔊 Mashup Library**: Integrated audio player showcasing custom mashups with real-time progress tracking.
- **🎬 Mixes Gallery**: Dedicated section for long-form sets and video mixes, powered by YouTube thumbnails and theatre-mode modals.
- **📅 Dynamic Booking System**: Content-managed booking cards ("Solo", "B2B", "Club") with a direct-to-email inquiry form via **Web3Forms**.
- **🖼️ Categorized Gallery**: Dynamic photo gallery with category filtering and interactive lightboxes.
- **⚡ Fully Headless**: Powered by **Sanity CMS**, allowing real-time content updates without redeploying code.

---

## 🛠️ Tech Stack

- **Frontend**: [React 19](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v3](https://tailwindcss.com/)
- **CMS**: [Sanity.io](https://www.sanity.io/)
- **Animations**: [Animate.css](https://animate.style/) & [Swiper.js](https://swiperjs.com/)
- **Forms**: [Web3Forms](https://web3forms.com/)

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/therealyhn/ljusa-todos.git
cd ljusa-todos
```

### 2. Install dependencies
```bash
# Install frontend dependencies
npm install

# Install Sanity Studio dependencies
cd sanity
npm install
cd ..
```

### 3. Environment Variables
Create a `.env` file in the root directory and add your keys:
```env
VITE_SANITY_PROJECT_ID=2aak8c4x
VITE_SANITY_DATASET=production
VITE_WEB3FORMS_KEY=your_web3forms_key
```

### 4. Run Locally
```bash
# Start frontend
npm run dev

# Start Sanity Studio (in a separate terminal)
cd sanity
npm run dev
```

---

## 📂 Project Structure

```text
├── sanity/             # Sanity CMS Schemas & Config
├── src/
│   ├── components/
│   │   ├── nav/        # Navbar & Mobile Menu
│   │   ├── sections/   # Hero, About, Gallery, Mixes, Booking
│   │   └── ui/         # Reusable UI Atoms (Button, Container)
│   ├── lib/            # Sanity Client Configuration
│   └── App.jsx         # Main Application Entry
└── tailwind.config.js  # Custom Design Tokens
```

---

## 🤝 Contribution

This is a private project for **LJUSA x TODOS**. For business inquiries or booking, please use the [Booking Form](https://ljusatodos.com/#booking) on the website.

---

## ⚖️ License

All media, sound recordings, and brand assets are property of LJUSA x TODOS. Code is provided for portfolio reference.
