# Pinpoint App

## Overview

Pinpoint is a comprehensive logistics and tracking application designed to streamline delivery management and enhance user experience. It includes both web and mobile platforms for real-time tracking, order management, and route optimization.

---

## Features

### Current Features

- **Backend Model Consistency**: Ensures data integrity across models.
- **CRUD Operations**: Create, Read, Update, and Delete functionality for operators and packages.
- **CSV Bulk Data Uploading**: Easily upload large datasets.

### Work in Progress

- **Map Routing**: Adding real-time routing capabilities.
- **Admin-Operator Chat Feature**: Enable seamless communication between admins and operators.

### Planned

- **WebSocket Synchronous Map**: Develop a synchronized map for real-time interaction between the admin dashboard and operator app (Expo).
- **Frontend Overhaul**: Improve design and user experience.
- **Notifications**: Add in-app and push notifications.
- **Security Enhancements**: Strengthen security measures.

### Future

The project is designed as a continuous work-in-progress to support self-improvement. With each new skill acquired, additional features will be implemented. Below are the three major steps envisioned:

1. **Viability as a Tracking/Logistics Service**
   - Ensure all basic features (as listed above) are functional and user-friendly.

2. **Data Collection for Learning**
   - Address common issues in the logistics industry, such as high turnover rates and difficulties learning new routes.
   - By collecting and sharing delivery-related data, the app aims to ease the learning curve for new employees, helping them become proficient more quickly.

3. **Future-Proofing for Drone Integration**
   - Collect accurate address data to prepare for the integration of drone-based deliveries.
   - Focus on improving the correctness of delivery addresses to facilitate this futuristic approach.

---

## Tech Stack

### Backend:
- **Framework**: Django (Python)
- **Database**: SQLite3
- **Environment Management**: `python-dotenv`

### Frontend:
- **Framework**: React (Vite)
- **Styling**: Tailwind CSS
- **State Management**: Context API
- **Linting**: ESLint

### Mobile:
- **Framework**: React Native (Expo)

### Other Tools:
- **Version Control**: Git
- **Maps Integration**: Mapbox

---

## Setup Instructions

### Backend:

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. **Set Up Virtual Environment**:
   ```bash
   python3 -m venv .venv
   source .venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Set Up Environment Variables**:
   Create a `.env` file in the root directory and add the required environment variables:
   ```env
   DEBUG=True
   SECRET_KEY=your_secret_key
   ```

5. **Run Migrations**:
   ```bash
   python manage.py migrate
   ```

6. **Start the Server**:
   ```bash
   python manage.py runserver
   ```

### Frontend:

1. **Navigate to Frontend Directory**:
   ```bash
   cd frontend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start the Development Server**:
   ```bash
   npm run dev
   ```

### Mobile:

1. **Navigate to Mobile Directory**:
   ```bash
   cd mobile
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start the Expo Server**:
   ```bash
   npx expo start
   ```

---

## Usage

1. Run both backend and frontend servers following the setup instructions.
2. Access the web app at `http://localhost:5173`.
3. Use the mobile app with Expo Go or deploy it to a device.
4. Manage deliveries, track orders, and explore real-time routing features.

---

## Folder Structure

### Backend:
- `myApp/` - Main application folder.
- `requirements.txt` - Backend dependencies.

### Frontend:
- `src/` - Contains React components and pages.
- `public/` - Static assets.
- `vite.config.js` - Vite configuration.

### Mobile:
- `App.js` - Entry point for the React Native app.
- `assets/` - Static assets for the mobile app.

---

## Sources

- [Django](https://www.djangoproject.com/)
- [React](https://reactjs.org/)
- [React Native](https://reactnative.dev/)
- [Mapbox](https://www.mapbox.com/)

---


