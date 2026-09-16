/* =========================================================
   College Transport Information Portal - Vanilla JavaScript
   Handles: data rendering, search, filters, modal,
   mobile nav, dark mode, dynamic status & result count.
   ========================================================= */

"use strict";

/* ---------------------------------------------------------
   1. DATA - Bus information stored as an array of objects
   --------------------------------------------------------- */
const buses = [
    {
        number: "TN-32-01", route: "Route A", start: "Villupuram", destination: "College",
        departure: "06:30 AM", arrival: "08:00 AM",
        eveningDeparture: "05:30 PM", eveningArrival: "07:00 PM",
        stops: 6, status: "Active",
        stopsList: ["Villupuram Bus Stand", "Kandamangalam", "Vikravandi", "Mundiyampakkam", "Mailam", "College"]
    },
    {
        number: "TN-32-02", route: "Route B", start: "Cuddalore", destination: "College",
        departure: "06:15 AM", arrival: "08:10 AM",
        eveningDeparture: "05:20 PM", eveningArrival: "07:15 PM",
        stops: 5, status: "Active",
        stopsList: ["Cuddalore Old Town", "Thirupapuliyur", "Panruti", "Neyveli", "College"]
    },
    {
        number: "TN-32-03", route: "Route C", start: "Tindivanam", destination: "College",
        departure: "06:40 AM", arrival: "07:55 AM",
        eveningDeparture: "05:35 PM", eveningArrival: "06:50 PM",
        stops: 4, status: "Delayed",
        stopsList: ["Tindivanam Bus Stand", "Olakkur", "Mailam", "College"]
    },
    {
        number: "TN-32-04", route: "Route D", start: "Pondicherry", destination: "College",
        departure: "06:00 AM", arrival: "08:05 AM",
        eveningDeparture: "05:10 PM", eveningArrival: "07:20 PM",
        stops: 6, status: "Active",
        stopsList: ["Pondicherry ISKON", "Villianur", "Madagadipet", "Mannadipet", "Vanur", "College"]
    },
    {
        number: "TN-32-05", route: "Route E", start: "Vikravandi", destination: "College",
        departure: "06:50 AM", arrival: "07:50 AM",
        eveningDeparture: "05:40 PM", eveningArrival: "06:45 PM",
        stops: 3, status: "Active",
        stopsList: ["Vikravandi", "Mundiyampakkam", "College"]
    },
    {
        number: "TN-32-06", route: "Route A", start: "Chidambaram", destination: "College",
        departure: "05:50 AM", arrival: "08:15 AM",
        eveningDeparture: "05:15 PM", eveningArrival: "07:40 PM",
        stops: 7, status: "Delayed",
        stopsList: ["Chidambaram", "Bhuvanagiri", "Kattumannarkoil", "Kurinjipadi", "Panruti", "Neyveli", "College"]
    },
    {
        number: "TN-32-07", route: "Route B", start: "Kallakurichi", destination: "College",
        departure: "06:10 AM", arrival: "08:20 AM",
        eveningDeparture: "05:05 PM", eveningArrival: "07:25 PM",
        stops: 6, status: "Active",
        stopsList: ["Kallakurichi", "Chinnasalem", "Ulundurpet", "Thirukoilur", "Mugaiyur", "College"]
    },
    {
        number: "TN-32-08", route: "Route C", start: "Gingee", destination: "College",
        departure: "06:35 AM", arrival: "07:45 AM",
        eveningDeparture: "05:45 PM", eveningArrival: "06:55 PM",
        stops: 4, status: "Not Available",
        stopsList: ["Gingee Fort", "Melmalayanur", "Olakkur", "College"]
    },
    {
        number: "TN-32-09", route: "Route D", start: "Marakkanam", destination: "College",
        departure: "06:25 AM", arrival: "08:00 AM",
        eveningDeparture: "05:25 PM", eveningArrival: "07:05 PM",
        stops: 5, status: "Active",
        stopsList: ["Marakkanam", "Koonimedu", "Vanur", "Mundiyampakkam", "College"]
    },
    {
        number: "TN-32-10", route: "Route E", start: "Mailam", destination: "College",
        departure: "06:55 AM", arrival: "07:40 AM",
        eveningDeparture: "05:50 PM", eveningArrival: "06:40 PM",
        stops: 3, status: "Delayed",
        stopsList: ["Mailam", "Vikravandi", "College"]
    },
    {
        number: "TN-32-11", route: "Route A", start: "Neyveli", destination: "College",
        departure: "06:05 AM", arrival: "08:00 AM",
        eveningDeparture: "05:12 PM", eveningArrival: "07:10 PM",
        stops: 6, status: "Active",
        stopsList: ["Neyveli Block-1", "Neyveli Township", "Panruti", "Kurinjipadi", "Vadalur", "College"]
    },
    {
        number: "TN-32-12", route: "Route B", start: "Ulundurpet", destination: "College",
        departure: "06:20 AM", arrival: "08:10 AM",
        eveningDeparture: "05:18 PM", eveningArrival: "07:15 PM",
        stops: 5, status: "Not Available",
        stopsList: ["Ulundurpet", "Thirukoilur", "Mugaiyur", "Vikravandi", "College"]
    }
];

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
    arrow: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M6 13l6 6 6-6"/></svg>'
};

// Statistic cards data
const stats = [
    { num: buses.length, label: "Total Buses", icon: icons.bus },
    { num: 12, label: "Total Routes", icon: icons.pin },
    { num: 48, label: "Pickup Points", icon: icons.pin },
    { num: 36, label: "Today's Trips", icon: icons.clock }
];

/* ---------------------------------------------------------
   3. Render functions
   --------------------------------------------------------- */

// Quick statistics cards
function renderStats() {
    const grid = document.getElementById("statsGrid");
    grid.innerHTML = stats.map(function (s) {
        return (
            '<article class="stat-card">' +
                '<span class="stat-card__icon" aria-hidden="true">' + s.icon + '</span>' +
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
   4. Search + filtering (works together)
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
                bus.number, bus.route, bus.start, bus.destination, bus.status
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
   5. Route modal
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
   6. Mobile navigation (hamburger)
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
   7. Dark / light mode (saved in localStorage)
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
   8. Dynamic status demo
   Randomly refreshes some bus statuses to show live updates.
   --------------------------------------------------------- */
function startStatusSimulation() {
    setInterval(function () {
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
   9. Event wiring
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
   10. Init
   --------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", function () {
    renderStats();
    applyFilters();       // initial render of buses, pickups, timings + count
    setupEvents();
    setupMobileNav();
    setupTheme();
    startStatusSimulation();
});
