/* =========================================================
   College Transport Information Portal - Mock API layer
   ---------------------------------------------------------
   This module pretends to be the "server". Right now it
   returns the dummy data from js/data.js after a short,
   simulated network delay - so the UI behaves exactly as it
   would against a real backend (loading states included).

   IN PRODUCTION:
   Replace the mock bodies below with real HTTP calls, e.g.

       const res = await fetch(`${TransportAPI.BASE_URL}/buses`);
       if (!res.ok) throw new Error(`HTTP ${res.status}`);
       return await res.json();

   The rest of the app (js/script.js) does not care where the
   data comes from - it just awaits these functions.
   ========================================================= */

"use strict";

const TransportAPI = {
    // Base URL of the production API (used by the fetch examples above).
    BASE_URL: "https://api.college-transport.example/v1",

    // Simulated network latency in milliseconds.
    _LATENCY: 700,

    // Helper: resolve a value after a fake network delay.
    _delay: function (value) {
        return new Promise(function (resolve) {
            setTimeout(function () { resolve(value); }, TransportAPI._LATENCY);
        });
    },

    /* GET /buses  ->  list of all buses */
    getBuses: function () {
        // PRODUCTION:
        //   const res = await fetch(`${this.BASE_URL}/buses`);
        //   return await res.json();
        return this._delay(BUS_DATA.map(function (b) {
            // Return a copy so callers can't mutate the "server" store directly.
            return Object.assign({}, b);
        }));
    },

    /* GET /buses/:number  ->  single bus (used by the route modal) */
    getBusByNumber: function (number) {
        // PRODUCTION:
        //   const res = await fetch(`${this.BASE_URL}/buses/${number}`);
        //   return await res.json();
        var found = BUS_DATA.find(function (b) { return b.number === number; });
        return this._delay(found ? Object.assign({}, found) : null);
    },

    /* GET /stats  ->  dashboard statistics */
    getStats: function () {
        // PRODUCTION:
        //   const res = await fetch(`${this.BASE_URL}/stats`);
        //   return await res.json();
        return this._delay(STATS_DATA.slice());
    }
};
