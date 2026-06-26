# Chronicle

![Chronicle Dashboard](./screenshots/dashboard.png)

Chronicle is a premium, full-stack multimedia travel journal application. I engineered this platform to provide a beautiful, private, and intuitive space for documenting adventures around the globe. With a focus on modern aesthetic design and responsive architecture, Chronicle allows users to create rich, geotagged entries that weave together narratives, dates, and stunning photography.

## Features

- **Secure Authentication:** Frictionless Google Sign-In powered by Firebase Authentication ensures every creator's timeline remains entirely private and secure.
- **Rich Journaling:** A polished entry creator supporting detailed stories, precise location tagging, date tracking, and high-resolution photo attachments.
- **Dynamic Search & Filtering:** Instantly locate specific memories, cities, or trips using the fast client-side search indexing.
- **Cross-Device Responsive Design:** A carefully crafted UI that looks equally gorgeous on mobile devices, tablets, and wide-screen desktop displays.

### Multimedia Timeline & Gallery View

![Multimedia Timeline](./screenshots/timeline.png)

The core experience of Chronicle is the dynamic timeline. Entries are presented in a clean, staggered masonry-style layout, prioritizing stunning visuals and elegant typography. Each card serves as a gateway to your past journeys, gracefully presenting locations and dates alongside your personal narratives.

### Interactive Map Discovery View

![Map Discovery View](./screenshots/mapview.png)

Switch to the Map View for a geographic breakdown of your travels. This interface aggregates your global footprint, automatically extracting and tallying unique locations from your journal entries to provide a satisfying overview of your worldly exploration.

## Tech Stack & Architecture

Chronicle is built with a modern, scalable web stack:

- **Frontend Framework:** React 19 with Vite for lightning-fast HMR and optimized production builds.
- **Language:** TypeScript for end-to-end type safety and developer experience.
- **Styling:** Tailwind CSS (v4) utilizing a custom "Natural Tones" design system, heavily relying on flexbox/grid layouts and CSS variables for a cohesive theme.
- **Backend & Database:** Firebase Firestore for real-time document-based cloud storage.
- **Identity:** Firebase Authentication (OAuth / Google Provider).
- **Icons:** Lucide React for crisp, consistent vector iconography.

## Getting Started

Follow these steps to run Chronicle locally on your machine.

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- A Firebase project with Firestore and Authentication enabled

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/chronicle.git
   cd chronicle
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` file in the root of your project and add your Firebase configuration keys:
   ```env
   VITE_FIREBASE_API_KEY="your_api_key"
   VITE_FIREBASE_AUTH_DOMAIN="your_project_id.firebaseapp.com"
   VITE_FIREBASE_PROJECT_ID="your_project_id"
   VITE_FIREBASE_STORAGE_BUCKET="your_project_id.appspot.com"
   VITE_FIREBASE_MESSAGING_SENDER_ID="your_sender_id"
   VITE_FIREBASE_APP_ID="your_app_id"
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to `http://localhost:3000` (or the port specified by Vite) to view the application.

## License

This project is licensed under the MIT License.
