# RSVP Reader

A modern, fast, and customizable RSVP (Rapid Serial Visual Presentation) reader built with React, Vite, and Tailwind CSS.

## Features

- **Speed Reading**: Display text one word at a time at speeds up to 1000 WPM.
- **Multiple Themes**: 7 beautiful themes (Blue, Purple, Green, Orange, Rose, Grey, Black).
- **File Support**: Upload any `.txt` file for reading.
- **Responsive Controls**: Play, pause, rewind, and adjust speed on the fly.
- **Progress Tracking**: Visual progress bar with seeking capability.

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser to `http://localhost:5173`.

## Project Structure

- `src/components`: UI components (Controls, FileUpload, ProgressBar, ThemeSelector, WordDisplay).
- `src/constants`: Configuration and theme definitions.
- `src/styles`: Tailwind CSS and global styles.
- `src/App.jsx`: Main application container and logic.

## Logic Preservation

The original logic from `rsvp-reader.jsx` has been preserved exactly as is, just refactored into a modular component structure for better maintainability.
