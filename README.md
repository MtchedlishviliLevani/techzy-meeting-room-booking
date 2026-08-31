<div align="center">

# Techzy

**Meeting room booking for teams**

Find a free room, see who's booked what, and manage meetings — all in the browser.

[![React](https://img.shields.io/badge/React-19-149ECA?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vite.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

**[Live demo](https://techzy-meeting-room-booking-tau.vercel.app/)**

</div>

---

## Run it locally

```bash
npm install
npm run dev
```

Then open the address Vite prints (usually `http://localhost:5173`).

<details>
<summary>Other commands</summary>

```bash
npm run build     # type-check and build for production
npm run preview   # preview the production build
npm run lint      # run eslint
```

</details>

## The four pages

| | |
|---|---|
| **Dashboard** | How many rooms are free right now, what's booked today, and what's coming up |
| **Rooms** | Every room with its capacity, location and equipment. Search and filter to find the right one |
| **Schedule** | A day or week view showing which rooms are busy and when. Click any meeting to see the details |
| **Bookings** | The full list. Search, filter, book a new meeting, edit it, or cancel it |

Whatever you search or filter for shows up in the address bar, so you can bookmark a view or send someone a link straight to it.

## How the code is organized

```
src/services/     talks to the data (local JSON files for now)
src/hooks/        loads that data and prepares it for the screens
src/context/      shares bookings across the whole app
src/components/   the UI, plus the booking rules it relies on
src/pages/        one file per page
```

The screens never read a JSON file or touch browser storage themselves. They ask
`src/services` for what they need. So the day this app gets a real backend, only
that one folder has to change.

## Where the data lives

There's no server, so:

- The starting data is three JSON files in `public/data/` — 10 rooms, 20 employees, 23 bookings.
- Anything you book, edit or cancel is saved in your browser and is still there after a refresh.
- Rooms and employees can't be edited, so they're always read fresh from the JSON.
- **Reset demo data** in the dashboard header puts everything back to the starting point.
- The sample bookings shift to match the current date each time the app loads, so the demo always has something happening today.

## Decisions I made

The brief left a few things open. Here's what I chose, and why:

**No login.** Nothing in the brief asked for it. Instead of guessing who you are, the booking form lets you pick the organizer from the employee list.

**Only future meetings can be changed.** Once a meeting has ended (or been cancelled) it becomes read-only. Editing a meeting that already happened doesn't make sense.

**Cancelling doesn't delete.** A cancelled meeting stays in the list, marked as cancelled, so there's still a record of it and "Cancelled" works as a filter.

**Clashes are blocked, not just shown.** If a room is already taken at that time, or you invite more people than it seats, the form stops you and explains why.

**Rooms and employees aren't editable.** In a real company those come from an admin or HR system, not from the person booking a room.

**Browser storage over anything fancier.** The data is small and only has to survive a refresh.

## Deploying

Set up for Vercel. `vercel.json` sends every route to `index.html` so the page
router works on refresh and on direct links.

```bash
npx vercel --prod
```
