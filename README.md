# TyreTrack Pro Frontend

Professional React + TypeScript frontend for the Digital Tyre Lifecycle Management System.

## Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Lucide Icons

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:5173`.

## Prototype login

The login screen currently uses mock authentication and routes directly to the dashboard. The frontend has deliberately been structured so a real ASP.NET Core identity/authentication API can replace this later without rebuilding the screens.

## Design system

- Graphite: `#202124`
- Orange: `#F97316`
- Canvas: `#F7F7F5`
- Ink: `#18181B`
- Good: green
- Attention: amber
- Critical: red
- Unknown: grey

Brand orange is not reused as a warning colour; semantic tyre-health states remain visually distinct.

## Current modules

- Staff login
- Customer OTP access screen
- Branch dashboard
- Customers
- Vehicles
- Tyres
- Digital tyre passport
- Wheel position map
- Inspections
- Bookings
- Notifications
- Reports
- Warranty shell
- Settings shell

## Code comments

Comments are used where they explain architecture, mock/API boundaries, security intent, or non-obvious behaviour. Repetitive comments that merely restate the code have intentionally been avoided.
