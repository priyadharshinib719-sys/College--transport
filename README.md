# College Transport Information Portal

A clean, modern and fully responsive **College Transport Information Portal** that lets
students and faculty quickly view college bus numbers, routes, starting points,
destinations, pickup points and timings.

Built with **HTML5, CSS3 and Vanilla JavaScript only** — no frameworks, no backend.
Just open `index.html` in any browser.

---

## Features

- **Dashboard / Hero** with a prominent search box and quick statistics cards
  (Total Buses, Total Routes, Pickup Points, Today's Trips).
- **Bus Routes** — 12 realistic sample buses shown as cards with number, route,
  starting point, destination, departure/arrival times, number of stops and status.
- **View Route modal** — click *View Route* on any bus to see the complete
  stop-by-stop journey in a JavaScript-powered popup.
- **Pickup Points** — responsive table (stacks into cards on mobile) with morning
  and evening timings per point.
- **Bus Timings** — full morning/evening schedule with colour-coded status badges
  (On Schedule / Delayed / Not Available) that update dynamically.
- **Real-time search** by bus number, bus name, route, starting point, destination
  or pickup point — with a live result count and a "No transport information found."
  empty state.
- **Filters** by Route (A–E) and Status, working together with search.
- **Clear Filters** and clear-search buttons.
- **Dark / Light mode** toggle, remembered across visits using `localStorage`.
- **Responsive** navbar that becomes a hamburger menu on mobile.
- Accessible, semantic HTML with `aria-label`s, labelled inputs and keyboard support.

---

## Project Structure

```
college-transport-portal/
│
├── index.html          # Markup and page structure
├── css/
│   └── style.css       # All styling, theming and responsive rules
├── js/
│   └── script.js       # Data, search, filters, modal, dark mode
├── images/             # (optional images)
└── README.md
```

---

## How to Run

1. Download or clone this repository.
2. Open `index.html` in any modern web browser (Chrome, Firefox, Edge, Safari).

No build step, server or installation is required.

---

## Technology

- **HTML5** — semantic structure
- **CSS3** — Grid, Flexbox, transitions/animations, custom properties, media queries
- **Vanilla JavaScript** — dynamic rendering, real-time search & filtering,
  modal, theme toggle with `localStorage`

---

## Responsive Breakpoints

Tested at approximately **1920px, 1366px, 1024px, 768px, 480px and 375px**.

| Device  | Layout                                              |
|---------|-----------------------------------------------------|
| Desktop | Multi-column dashboard, horizontal nav, 3-col cards |
| Tablet  | 2-column cards, hamburger menu                      |
| Mobile  | Single-column cards, stacked tables, no h-scroll    |

---

## Data Model

Bus information is stored as a JavaScript array of objects, and all cards, tables
and the route modal are generated dynamically from it:

```js
const buses = [
    {
        number: "TN-32-01",
        route: "Route A",
        start: "Villupuram",
        destination: "College",
        departure: "06:30 AM",
        arrival: "08:00 AM",
        stops: 6,
        status: "Active",
        stopsList: ["Villupuram Bus Stand", "Kandamangalam", "Vikravandi", "..."]
    }
    // ...12 buses total
];
```

---

© 2026 College Transport Portal. All Rights Reserved.
