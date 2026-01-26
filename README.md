# Heroes App

A modern React application for browsing and managing superhero information. Built with React, TypeScript, and Vite, featuring a clean UI with shadcn/ui components.

## Features

- Browse heroes with pagination
- Search heroes by name and filters
- View hero statistics and summaries
- Responsive design
- Modern UI with shadcn/ui components
- Optimized data fetching with TanStack Query
- Real-time data synchronization
- Individual hero detail pages
- Dashboard with hero statistics
- React Query DevTools for debugging

## Tech Stack

- **Frontend Framework**: React 19
- **Language**: TypeScript
- **Build Tool**: Vite
- **State Management**: TanStack Query
- **Routing**: React Router 7
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Package Manager**: pnpm

## Backend

This application requires a backend API to function. You can use:

- **Recommended**: [Nest Heroes Backend](https://github.com/Klerith/nest-heroes-backend)
- Or any compatible backend that provides the following endpoints:
  - `GET /heroes` - List heroes with pagination
  - `GET /heroes/:id` - Get hero details
  - `GET /heroes/summary` - Get hero statistics

## Prerequisites

- Node.js
- pnpm (or npm/yarn)
- A running backend API (see Backend section above)

## Installation

1. Clone this repository:

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Create a `.env` file based on `.env.template`:
   ```bash
   cp .env.template .env
   ```

4. Configure your environment variables in `.env`:
   ```env
   VITE_API_URL=http://localhost:3000/api
   ```
   Replace the URL with your backend API URL.

## Development

Run the development server:

```bash
pnpm dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

## Building for Production

Build the application:

```bash
pnpm build
```

Preview the production build:

```bash
pnpm preview
```
