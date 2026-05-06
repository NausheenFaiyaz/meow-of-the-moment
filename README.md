# Meow of the Moment

A cute, card-style **Random Cat Viewer** built with React + Vite.

The app fetches random cat data from FreeAPI and displays it in a pastel collectible-card UI inspired by cozy sticker/journal aesthetics.

## Live Demo

Deployed on Vercel: **https://meow-of-the-moment.vercel.app/**

## Project Overview

This project was created for the **FreeAPI Web Dev Cohort 2026** random cat challenge.  
It fetches a new cat image and related details every time the user clicks the action button.

## Features

- Fetches random cat data from FreeAPI
- Displays cat image in a themed card layout
- Shows cat metadata:
  - Name
  - Description
  - Origin
  - Lifespan
  - Image size (when available)
- Handles loading and API error states gracefully
- Responsive UI for desktop and mobile screens
- Custom pastel background and collectible-card design

## API Used

- Endpoint: `https://api.freeapi.app/api/v1/public/cats/cat/random`
- Method: `GET`
- Headers:
  - `accept: application/json`

### Notes on API Data

Some cats may not include complete breed metadata. For example, `life_span` may be missing for certain responses. In those cases, the app shows a fallback message instead of breaking the UI.

## Tech Stack

- React
- Vite
- JavaScript (ES6+)
- CSS3

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd Random-Cat-Viewer
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run development server

```bash
npm run dev
```

Then open the local URL shown in your terminal (usually `http://localhost:5173`).

### 4. Build for production

```bash
npm run build
```

### 5. Preview production build

```bash
npm run preview
```

## Project Structure

```text
Random-Cat-Viewer/
|- public/
|- src/
|  |- App.jsx
|  |- App.css
|  |- index.css
|  |- main.jsx
|- index.html
|- package.json
|- README.md
```

## UI Inspiration

The visual style is inspired by cute pastel collectible cards, with soft colors, rounded edges, and playful typography.

## Future Improvements

- Add favorite/save card functionality
- Add card flip animation for new fetches
- Add optional fallback API when FreeAPI is temporarily unavailable
- Add light/dark pastel themes

## Author

Built by **Nausheen Faiyaz** as part of Web Dev Cohort 2026.
