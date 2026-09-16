/* =========================================================
   College Transport Information Portal - Vanilla JavaScript
   ---------------------------------------------------------
   The UI layer. It fetches data from the (mock) server via
   TransportAPI (see js/api.js), shows loading states while
   the request is in flight, then renders and wires up all
   interactions: search, filters, modal, mobile nav, dark
   mode and dynamic status.
   ========================================================= */

"use strict";

/* ---------------------------------------------------------
   1. Module state - filled once data arrives from the server
   --------------------------------------------------------- */
let buses = [];   // populated by loadData() from TransportAPI.getBuses()
let stats = [];   // populated by loadData() from TransportAPI.getStats()

/* ---------------------------------------------------------
   2. Helpers
   --------------------------------------------------------- */

// Map a status string to a badge CSS modifier class
function statusClass(status) {
    if (status === "Active") return "badge--active";
    if (status === "Delayed") return "badge--delayed";
    return "badge--na"; // Not Available
}

// SVG icon snippets (returned as strings for template literals)
const icons = {
    bus: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="13" rx="2"/><path d="M3 10h18"/><circle cx="7.5" cy="20" r="1.5"/><circle cx="16.5" cy="20" r="1.5"/></svg>',
    pin: '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s7-6.5 7-12a7 7 0 0 0-14 0c0 5.5 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/></svg>',
    clock: '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    flag: '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 21V4h13l-2 4 2 4H4"/></svg>',
    user: '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M6 13l6 6 6-6"/></svg>'
};

// Icon for each statistic card, keyed by the stat's "key"
const statIcons = {
    buses: icons.bus,
    routes: icons.pin,
    pickups: icons.pin,
    trips: icons.clock
};

/* ---------------------------------------------------------
   3. Loading skeletons (shown while the server responds)
   --------------------------------------------------------- */
function showLoading() {
    // Skeleton stat cards
    const statsGrid = document.getElementById("statsGrid");
    statsGrid.innerHTML = repeat(4,
        '<article class="stat-card skeleton-card"><span class="skeleton skeleton--icon"></span>' +
        '<div style="flex:1"><span class="skeleton skeleton--line"></span>' +
        '<span class="skeleton skeleton--line short"></span></div></article>'
    );

    // Skeleton bus cards
    const busGrid = document.getElementById("busGrid");
    busGrid.innerHTML = repeat(6,
        '<article class="bus-card skeleton-card">' +
        '<span class="skeleton skeleton--line"></span>' +
        '<span class="skeleton skeleton--block"></span>' +
        '<span class="skeleton skeleton--line short"></span></article>'
    );

    // Result count
    document.getElementById("resultCount").textContent = "Loading buses…";
}

// Build a string by repeating an HTML fragment n times
function repeat(n, html) {
    let out = "";
    for (let i = 0; i < n; i++) out += html;
    return out;
}

// Show an error message if the "server" request fails
function showError() {
    document.getElementById("busGrid").innerHTML =
        '<p class="no-results">Could not load transport information. Please try again later.</p>';
    document.getElementById("resultCount").textContent = "";
}

/* ---------------------------------------------------------
   4. Render functions
   --------------------------------------------------------- */

// Quick statistics cards
function renderStats() {
    const grid = document.getElementById("statsGrid");
    grid.innerHTML = stats.map(function (s) {
        return (
            '<article class="stat-card">' +
                '<span class="stat-card__icon" aria-hidden="true">' + (statIcons[s.key] || icons.bus) + '</span>' +
                '<div>' +
                    '<div class="stat-card__num">' + s.num + '</div>' +
                    '<div class="stat-card__label">' + s.label + '</div>' +
                '</div>' +
            '</article>'
        );
    }).join("");
}

// Build one bus card
function busCardHTML(bus) {
    return (
        '<article class="bus-card">' +
            '<div class="bus-card__top">' +
                '<div>' +
                    '<span class="bus-card__num">' + icons.bus + bus.number + '</span>' +
                    '<div class="bus-card__route">' + bus.route + '</div>' +
                '</div>' +
                '<span class="badge ' + statusClass(bus.status) + '">' + bus.status + '</span>' +
            '</div>' +

            '<div class="bus-card__body">' +
                fact("Starting Point", bus.start, icons.pin) +
                fact("Destination", bus.destination, icons.flag) +
                fact("Departure", bus.departure, icons.clock) +
                fact("Arrival", bus.arrival, icons.clock) +
                fact("Driver", bus.driver, icons.user) +
                fact("Capacity", bus.capacity + " seats", icons.user) +
            '</div>' +

            '<div class="bus-card__foot">' +
                '<span class="bus-card__stops">Stops: <strong>' + bus.stops + '</strong></span>' +
                '<button class="btn btn--primary btn--sm view-route-btn" type="button" data-bus="' + bus.number + '">View Route</button>' +
            '</div>' +
        '</article>'
    );
}

// Small factual field used inside a bus card
function fact(label, value, icon) {
    return (
        '<div class="bus-fact">' +
            '<span class="bus-fact__label">' + icon + label + '</span>' +
            '<span class="bus-fact__value">' + value + '</span>' +
        '</div>'
    );
}

// Render the bus cards grid from a given list
function renderBuses(list) {
    const grid = document.getElementById("busGrid");
    const noResults = document.getElementById("noResults");

    grid.innerHTML = list.map(busCardHTML).join("");
    noResults.hidden = list.length !== 0;

    // Wire up the "View Route" buttons after (re)rendering
    grid.querySelectorAll(".view-route-btn").forEach(function (btn) {
        btn.addEventListener("click", function () {
            openRouteModal(btn.getAttribute("data-bus"));
        });
    });
}

// Render the pickup points table from a given list of buses
function renderPickups(list) {
    const body = document.getElementById("pickupBody");
    const noResults = document.getElementById("pickupNoResults");
    let rows = "";

    list.forEach(function (bus) {
        // Use each intermediate stop (excluding the College destination) as a pickup point.
        bus.stopsList.forEach(function (stop, index) {
            if (stop === bus.destination) return;
            // Offset the morning/evening time slightly per stop for realism
            const morning = shiftTime(bus.departure, index * 12);
            const evening = shiftTime(bus.eveningDeparture, -index * 8);
            rows += (
                '<tr>' +
                    '<td data-label="Pickup Point">' + stop + '</td>' +
                    '<td data-label="Bus Number">' + bus.number + '</td>' +
                    '<td data-label="Morning Timing"><span class="time-badge">' + morning + '</span></td>' +
                    '<td data-label="Evening Timing"><span class="time-badge">' + evening + '</span></td>' +
                    '<td data-label="Route">' + bus.route + '</td>' +
                '</tr>'
            );
        });
    });

    body.innerHTML = rows;
    noResults.hidden = rows !== "";
}

// Render the timings table from a given list
function renderTimings(list) {
    const body = document.getElementById("timingsBody");
    const noResults = document.getElementById("timingsNoResults");

    body.innerHTML = list.map(function (bus) {
        // Translate status into the "on schedule" style indicators for this section
        let indicator = "On Schedule";
        if (bus.status === "Delayed") indicator = "Delayed";
        if (bus.status === "Not Available") indicator = "Not Available";

        return (
            '<tr>' +
                '<td data-label="Bus Number"><strong>' + bus.number + '</strong></td>' +
                '<td data-label="Route">' + bus.route + '</td>' +
                '<td data-label="Morning Departure"><span class="time-badge">' + bus.departure + '</span></td>' +
                '<td data-label="College Arrival"><span class="time-badge">' + bus.arrival + '</span></td>' +
                '<td data-label="Evening Departure"><span class="time-badge">' + bus.eveningDeparture + '</span></td>' +
                '<td data-label="Expected Arrival"><span class="time-badge">' + bus.eveningArrival + '</span></td>' +
                '<td data-label="Status"><span class="badge ' + statusClass(bus.status) + '">' + indicator + '</span></td>' +
            '</tr>'
        );
    }).join("");

    noResults.hidden = list.length !== 0;
}

// Shift a "HH:MM AM/PM" string by a number of minutes (used for pickup timings)
function shiftTime(timeStr, minutes) {
    const match = timeStr.match(/(\d+):(\d+)\s*(AM|PM)/i);
    if (!match) return timeStr;
    let h = parseInt(match[1], 10);
    let m = parseInt(match[2], 10);
    const period = match[3].toUpperCase();

    if (period === "PM" && h !== 12) h += 12;
    if (period === "AM" && h === 12) h = 0;

    let total = h * 60 + m + minutes;
    total = ((total % 1440) + 1440) % 1440; // wrap within a day

    let hh = Math.floor(total / 60);
    const mm = total % 60;
    const newPeriod = hh >= 12 ? "PM" : "AM";
    hh = hh % 12;
    if (hh === 0) hh = 12;

    return hh + ":" + String(mm).padStart(2, "0") + " " + newPeriod;
}

/* ---------------------------------------------------------
   5. Search + filtering (works together)
   --------------------------------------------------------- */
function getFilteredBuses() {
    const query = document.getElementById("searchInput").value.trim().toLowerCase();
    const routeVal = document.getElementById("routeFilter").value;
    const statusVal = document.getElementById("statusFilter").value;

    return buses.filter(function (bus) {
        // Route filter
        if (routeVal !== "all" && bus.route !== routeVal) return false;
        // Status filter
        if (statusVal !== "all" && bus.status !== statusVal) return false;

        // Free-text search across many fields, including pickup points
        if (query !== "") {
            const haystack = [
                bus.number, bus.route, bus.start, bus.destination, bus.status, bus.driver
            ].concat(bus.stopsList).join(" ").toLowerCase();

            if (haystack.indexOf(query) === -1) return false;
        }
        return true;
    });
}

// Apply the current search + filters and re-render everything
function applyFilters() {
    const filtered = getFilteredBuses();

    renderBuses(filtered);
    renderPickups(filtered);
    renderTimings(filtered);
    updateResultCount(filtered.length);

    // Toggle the clear (x) button in the search box
    const clearBtn = document.getElementById("clearSearch");
    clearBtn.hidden = document.getElementById("searchInput").value === "";
}

// Dynamic result count text
function updateResultCount(count) {
    const el = document.getElementById("resultCount");
    el.textContent = count === 1 ? "1 bus found" : count + " buses found";
}

/* ---------------------------------------------------------
   6. Route modal
   --------------------------------------------------------- */
const modal = document.getElementById("routeModal");

function openRouteModal(busNumber) {
    const bus = buses.find(function (b) { return b.number === busNumber; });
    if (!bus) return;

    document.getElementById("modalTitle").textContent = bus.route + " · " + bus.number;
    document.getElementById("modalSubtitle").textContent = bus.start + " → " + bus.destination;

    // Build the vertical route map
    const map = document.getElementById("routeMap");
    map.innerHTML = bus.stopsList.map(function (stop, i) {
        const stopHTML =
            '<div class="route-stop">' +
                '<span class="route-stop__dot" aria-hidden="true"></span>' +
                '<span class="route-stop__name">' + stop + '</span>' +
            '</div>';
        // Add a downward arrow between stops (not after the last one)
        const arrowHTML = i < bus.stopsList.length - 1
            ? '<span class="route-arrow" aria-hidden="true">' + icons.arrow + '</span>'
            : '';
        return stopHTML + arrowHTML;
    }).join("");

    modal.hidden = false;
    document.body.style.overflow = "hidden";
    document.getElementById("modalClose").focus();
}

function closeRouteModal() {
    modal.hidden = true;
    document.body.style.overflow = "";
}

/* ---------------------------------------------------------
   7. Mobile navigation (hamburger)
   --------------------------------------------------------- */
function setupMobileNav() {
    const hamburger = document.getElementById("hamburger");
    const nav = document.getElementById("primary-nav");

    hamburger.addEventListener("click", function () {
        const open = nav.classList.toggle("open");
        hamburger.setAttribute("aria-expanded", String(open));
        hamburger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });

    // Close the menu when a link is tapped
    nav.querySelectorAll(".nav__link").forEach(function (link) {
        link.addEventListener("click", function () {
            nav.classList.remove("open");
            hamburger.setAttribute("aria-expanded", "false");
            hamburger.setAttribute("aria-label", "Open menu");
        });
    });
}

/* ---------------------------------------------------------
   8. Dark / light mode (saved in localStorage)
   --------------------------------------------------------- */
function setupTheme() {
    const toggle = document.getElementById("themeToggle");
    const root = document.documentElement;

    // Load saved theme (default: light)
    let saved = "light";
    try {
        saved = localStorage.getItem("ctp-theme") || "light";
    } catch (e) { /* storage may be unavailable */ }

    applyTheme(saved);

    toggle.addEventListener("click", function () {
        const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
        applyTheme(next);
        try { localStorage.setItem("ctp-theme", next); } catch (e) { /* ignore */ }
    });

    function applyTheme(theme) {
        root.setAttribute("data-theme", theme);
        toggle.setAttribute("aria-pressed", String(theme === "dark"));
    }
}

/* ---------------------------------------------------------
   9. Dynamic status demo
   Randomly refreshes some bus statuses to show live updates.
   --------------------------------------------------------- */
function startStatusSimulation() {
    setInterval(function () {
        if (buses.length === 0) return;
        // Pick one random bus and nudge its status for a "live" feel
        const options = ["Active", "Delayed", "Active", "Active"]; // weighted toward Active
        const i = Math.floor(Math.random() * buses.length);
        if (buses[i].status !== "Not Available") {
            buses[i].status = options[Math.floor(Math.random() * options.length)];
        }
        applyFilters();
    }, 12000); // every 12 seconds
}

/* ---------------------------------------------------------
   10. Event wiring
   --------------------------------------------------------- */
function setupEvents() {
    // Real-time search
    document.getElementById("searchInput").addEventListener("input", applyFilters);

    // Clear search (x) inside search box
    document.getElementById("clearSearch").addEventListener("click", function () {
        document.getElementById("searchInput").value = "";
        applyFilters();
        document.getElementById("searchInput").focus();
    });

    // Filters
    document.getElementById("routeFilter").addEventListener("change", applyFilters);
    document.getElementById("statusFilter").addEventListener("change", applyFilters);

    // Clear all filters button
    document.getElementById("clearFilters").addEventListener("click", function () {
        document.getElementById("searchInput").value = "";
        document.getElementById("routeFilter").value = "all";
        document.getElementById("statusFilter").value = "all";
        applyFilters();
    });

    // Modal close: button, overlay click
    document.getElementById("modalClose").addEventListener("click", closeRouteModal);
    modal.querySelectorAll("[data-close-modal]").forEach(function (el) {
        el.addEventListener("click", closeRouteModal);
    });

    // Close modal with the Escape key
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && !modal.hidden) closeRouteModal();
    });
}

/* ---------------------------------------------------------
   11. Data loading - fetch from the (mock) server
   --------------------------------------------------------- */
async function loadData() {
    showLoading();
    try {
        // Fetch buses and stats in parallel, just like real API calls.
        const results = await Promise.all([
            TransportAPI.getBuses(),
            TransportAPI.getStats()
        ]);
        buses = results[0];
        stats = results[1];

        renderStats();
        applyFilters();          // renders buses, pickups, timings + count
        startStatusSimulation(); // begin live status updates only after data is in
    } catch (err) {
        console.error("Failed to load transport data:", err);
        showError();
    }
}

/* ---------------------------------------------------------
   12. Init
   --------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", function () {
    // Set up interactions immediately (they don't need data yet)
    setupEvents();
    setupMobileNav();
    setupTheme();

    // Then request data from the server and render when it arrives
    loadData();
});
