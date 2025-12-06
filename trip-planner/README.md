# 🦞 MMT-2025: Maine Mother's Trip Planner

A comprehensive, mobile-friendly trip planning application for Mom and Renee's fall 2025 Maine adventure. Built with React + Vite, featuring real-time collaboration via Supabase.

**Live Site:** [https://gunnarhostetler.github.io/MMT-2025/](https://gunnarhostetler.github.io/MMT-2025/)

## 🍁 Features

- **Multi-Traveler Support:** Personalized views for Mom, Renee, and shared planning
- **Explore Tab:** Browse lobster spots, harbor towns, foliage hotspots, and custom places
- **"Add Anything" Search:** Search any location via OpenStreetMap/Nominatim
- **Interactive Maps:** Leaflet-powered maps with route visualization
- **Smart Routing:** OSRM-based driving directions and time estimates
- **Mobile-First Design:** Fully responsive UI for all devices
- **Real-time Sync:** Supabase integration for collaborative planning

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy
```

## 🔧 Tech Stack

- **Frontend:** React 19, Vite 7
- **Mapping:** Leaflet, React-Leaflet, OSRM
- **Backend:** Supabase (Auth, Database, Realtime)
- **Styling:** CSS with comprehensive responsive design
- **Deployment:** GitHub Pages with Actions CI/CD

## 📁 Project Structure

```
trip-planner/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── Sidebar.jsx   # Mission control sidebar
│   │   ├── TravelerSelector.jsx
│   │   └── ItineraryCard.jsx
│   ├── data/
│   │   └── planContent.js # Trip data, catalog, team info
│   ├── lib/
│   │   └── supabase.js   # Supabase client & helpers
│   ├── App.jsx           # Main application
│   ├── App.css           # Styles (incl. mobile)
│   └── main.jsx          # Entry point
├── supabase/
│   └── migrations/       # Database schema
└── .github/
    └── workflows/        # CI/CD deployment
```

## 🗄️ Supabase Setup

1. Create tables by running `supabase/migrations/001_mmt_tables.sql` in Supabase SQL Editor
2. Add GitHub Secrets:
   - `VITE_SUPABASE_URL` - Your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY` - Your Supabase anon key

## 🎨 Trip Highlights

- **Dates:** October 2025 (Peak Foliage Season)
- **Region:** Coastal Maine - Portland to Acadia
- **Focus:** Lobster, Fall Colors, Harbor Towns, Relaxation

## 👨‍👩‍👦 Team

- **Mom (👩‍👧):** Trip Lead - Lobster & Relaxation Focus
- **Renee (👰):** Co-Planner - Photography & Discovery
- **Gunnar (🧑‍💻):** Tech Support - App Development

---

*Built with ❤️ for the family Maine adventure*
