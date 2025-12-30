# 💎 X T Y — Official Website

A premium, high-performance portfolio and booking platform for the DJ duo **X T Y** (YHN & TODOS) built with **React, Vite, and Sanity CMS**. This project features a cinematic dark-themed UI, integrated media players, and a dynamic content management system.

---

## ✨ Features

### 🎧 Mashup Library

- Custom-built audio player specifically designed for showcasing unique mashups.
- Interactive progress tracking with customized glow-effect seek bars.
- Real-time tag display and seamless playback experience.

### 🎬 Mixes Gallery

- A dedicated "Theatre Mode" for viewing long-form sets and video mixes.
- Dynamic thumbnail generation directly from YouTube URLs.
- Filterable categories allow users to browse by genre or event type (e.g., Afro-Tech, House).

### 📅 Booking System

- A premium "Editorial" booking interface with three distinct managed options.
- Dynamic content fetching from Sanity CMS, including "Most Popular" highlights.
- Integrated **Web3Forms** for direct-to-email inquiries with custom success/error feedback.

### 🖼️ Categorized Gallery

- Interactive image gallery organized by event categories.
- High-performance lightbox for fullscreen viewing.
- Fully responsive grid layouts that adapt from mobile to desktop.

### ☁️ Sanity CMS Integration

- Fully headless architecture using **Sanity.io**.
- Custom schemas for `mashupLibrary`, `mixLibrary`, `bookingOption`, and `galleryCategory`.
- Allows the artists to update their latest tracks and sets without touching the codebase.

### 📱 Responsive Design

- Mobile-first approach using **Tailwind CSS**.
- Adaptive layouts for different DJ card styles and media players.
- Custom mobile-specific mix sliders powered by **Swiper.js**.

### ⚡ Performance & Polish

- Optimized image pipeline using Sanity's global CDN.
- Fluid entrance animations powered by **Animate.css**.
- Custom-themed scrollbars and ambient background glows for a premium feel.

---

## 🛠️ Tech Stack

| Layer      | Technology                                     |
| ---------- | ---------------------------------------------- |
| Frontend   | React 19 + Vite                                |
| Styling    | Tailwind CSS v3                                |
| Animations | Animate.css + Swiper.js                        |
| Backend    | Sanity CMS (Headless)                          |
| Forms      | Web3Forms (Direct Email API)                   |
| Deployment | GitHub Pages / Vercel (Recommended)           |

---

## 📂 Project Structure

- `sanity/` – Configuration, schemas, and assets for the headless CMS.
- `src/components/sections/` – Core features (Mashups, Mixes, Booking, Gallery).
- `src/components/ui/` – Reusable design system atoms (Buttons, Containers).
- `src/lib/` – API clients and utility functions.

---

## 💡 Future Improvements

- Add a real-time event calendar integrated with Google Maps.
- Implement a newsletter subscription for new mashup releases.
- Add soundcloud API integration for real-time play counts.
- Dark/Light mode toggle for high-contrast accessibility.

---

## ⚖️ License

All media, sound recordings, and brand assets are property of **X T Y**. Code is provided for portfolio reference.
