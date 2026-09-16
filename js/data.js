/* =========================================================
   College Transport Information Portal - Dummy Dataset
   ---------------------------------------------------------
   This file holds the sample ("pseudo") data that stands in
   for what a real backend/database would return in production.
   In production this data would NOT live here - it would be
   served by an API (see js/api.js). Keeping it in one place
   makes it easy to swap out for a live server response.
   ========================================================= */

"use strict";

/* Pseudo bus records - shaped exactly like a server JSON response.
   20 realistic sample buses spread across Routes A-E. */
const BUS_DATA = [
    {
        id: 1, number: "TN-32-01", route: "Route A", start: "Villupuram", destination: "College",
        departure: "06:30 AM", arrival: "08:00 AM", eveningDeparture: "05:30 PM", eveningArrival: "07:00 PM",
        stops: 6, status: "Active", driver: "R. Kumar", contact: "+91 98765 10001", capacity: 52,
        stopsList: ["Villupuram Bus Stand", "Kandamangalam", "Vikravandi", "Mundiyampakkam", "Mailam", "College"]
    },
    {
        id: 2, number: "TN-32-02", route: "Route B", start: "Cuddalore", destination: "College",
        departure: "06:15 AM", arrival: "08:10 AM", eveningDeparture: "05:20 PM", eveningArrival: "07:15 PM",
        stops: 5, status: "Active", driver: "S. Anand", contact: "+91 98765 10002", capacity: 48,
        stopsList: ["Cuddalore Old Town", "Thirupapuliyur", "Panruti", "Neyveli", "College"]
    },
    {
        id: 3, number: "TN-32-03", route: "Route C", start: "Tindivanam", destination: "College",
        departure: "06:40 AM", arrival: "07:55 AM", eveningDeparture: "05:35 PM", eveningArrival: "06:50 PM",
        stops: 4, status: "Delayed", driver: "M. Rajesh", contact: "+91 98765 10003", capacity: 50,
        stopsList: ["Tindivanam Bus Stand", "Olakkur", "Mailam", "College"]
    },
    {
        id: 4, number: "TN-32-04", route: "Route D", start: "Pondicherry", destination: "College",
        departure: "06:00 AM", arrival: "08:05 AM", eveningDeparture: "05:10 PM", eveningArrival: "07:20 PM",
        stops: 6, status: "Active", driver: "K. Suresh", contact: "+91 98765 10004", capacity: 54,
        stopsList: ["Pondicherry ISKON", "Villianur", "Madagadipet", "Mannadipet", "Vanur", "College"]
    },
    {
        id: 5, number: "TN-32-05", route: "Route E", start: "Vikravandi", destination: "College",
        departure: "06:50 AM", arrival: "07:50 AM", eveningDeparture: "05:40 PM", eveningArrival: "06:45 PM",
        stops: 3, status: "Active", driver: "P. Mani", contact: "+91 98765 10005", capacity: 46,
        stopsList: ["Vikravandi", "Mundiyampakkam", "College"]
    },
    {
        id: 6, number: "TN-32-06", route: "Route A", start: "Chidambaram", destination: "College",
        departure: "05:50 AM", arrival: "08:15 AM", eveningDeparture: "05:15 PM", eveningArrival: "07:40 PM",
        stops: 7, status: "Delayed", driver: "A. Vignesh", contact: "+91 98765 10006", capacity: 52,
        stopsList: ["Chidambaram", "Bhuvanagiri", "Kattumannarkoil", "Kurinjipadi", "Panruti", "Neyveli", "College"]
    },
    {
        id: 7, number: "TN-32-07", route: "Route B", start: "Kallakurichi", destination: "College",
        departure: "06:10 AM", arrival: "08:20 AM", eveningDeparture: "05:05 PM", eveningArrival: "07:25 PM",
        stops: 6, status: "Active", driver: "D. Prakash", contact: "+91 98765 10007", capacity: 50,
        stopsList: ["Kallakurichi", "Chinnasalem", "Ulundurpet", "Thirukoilur", "Mugaiyur", "College"]
    },
    {
        id: 8, number: "TN-32-08", route: "Route C", start: "Gingee", destination: "College",
        departure: "06:35 AM", arrival: "07:45 AM", eveningDeparture: "05:45 PM", eveningArrival: "06:55 PM",
        stops: 4, status: "Not Available", driver: "V. Balaji", contact: "+91 98765 10008", capacity: 48,
        stopsList: ["Gingee Fort", "Melmalayanur", "Olakkur", "College"]
    },
    {
        id: 9, number: "TN-32-09", route: "Route D", start: "Marakkanam", destination: "College",
        departure: "06:25 AM", arrival: "08:00 AM", eveningDeparture: "05:25 PM", eveningArrival: "07:05 PM",
        stops: 5, status: "Active", driver: "G. Ramesh", contact: "+91 98765 10009", capacity: 52,
        stopsList: ["Marakkanam", "Koonimedu", "Vanur", "Mundiyampakkam", "College"]
    },
    {
        id: 10, number: "TN-32-10", route: "Route E", start: "Mailam", destination: "College",
        departure: "06:55 AM", arrival: "07:40 AM", eveningDeparture: "05:50 PM", eveningArrival: "06:40 PM",
        stops: 3, status: "Delayed", driver: "T. Sekar", contact: "+91 98765 10010", capacity: 46,
        stopsList: ["Mailam", "Vikravandi", "College"]
    },
    {
        id: 11, number: "TN-32-11", route: "Route A", start: "Neyveli", destination: "College",
        departure: "06:05 AM", arrival: "08:00 AM", eveningDeparture: "05:12 PM", eveningArrival: "07:10 PM",
        stops: 6, status: "Active", driver: "N. Karthik", contact: "+91 98765 10011", capacity: 54,
        stopsList: ["Neyveli Block-1", "Neyveli Township", "Panruti", "Kurinjipadi", "Vadalur", "College"]
    },
    {
        id: 12, number: "TN-32-12", route: "Route B", start: "Ulundurpet", destination: "College",
        departure: "06:20 AM", arrival: "08:10 AM", eveningDeparture: "05:18 PM", eveningArrival: "07:15 PM",
        stops: 5, status: "Not Available", driver: "H. Saravanan", contact: "+91 98765 10012", capacity: 50,
        stopsList: ["Ulundurpet", "Thirukoilur", "Mugaiyur", "Vikravandi", "College"]
    },
    {
        id: 13, number: "TN-32-13", route: "Route C", start: "Thiruvennainallur", destination: "College",
        departure: "06:28 AM", arrival: "08:02 AM", eveningDeparture: "05:22 PM", eveningArrival: "07:08 PM",
        stops: 5, status: "Active", driver: "E. Gopal", contact: "+91 98765 10013", capacity: 48,
        stopsList: ["Thiruvennainallur", "Thirukoilur", "Mugaiyur", "Vikravandi", "College"]
    },
    {
        id: 14, number: "TN-32-14", route: "Route D", start: "Panruti", destination: "College",
        departure: "06:12 AM", arrival: "08:08 AM", eveningDeparture: "05:08 PM", eveningArrival: "07:18 PM",
        stops: 6, status: "Active", driver: "J. Murugan", contact: "+91 98765 10014", capacity: 52,
        stopsList: ["Panruti", "Kurinjipadi", "Neyveli", "Vadalur", "Mailam", "College"]
    },
    {
        id: 15, number: "TN-32-15", route: "Route E", start: "Mundiyampakkam", destination: "College",
        departure: "06:58 AM", arrival: "07:42 AM", eveningDeparture: "05:52 PM", eveningArrival: "06:42 PM",
        stops: 3, status: "Delayed", driver: "L. Arun", contact: "+91 98765 10015", capacity: 44,
        stopsList: ["Mundiyampakkam", "Vikravandi", "College"]
    },
    {
        id: 16, number: "TN-32-16", route: "Route A", start: "Bhuvanagiri", destination: "College",
        departure: "05:55 AM", arrival: "08:12 AM", eveningDeparture: "05:14 PM", eveningArrival: "07:35 PM",
        stops: 7, status: "Active", driver: "C. Dinesh", contact: "+91 98765 10016", capacity: 54,
        stopsList: ["Bhuvanagiri", "Kattumannarkoil", "Chidambaram", "Kurinjipadi", "Panruti", "Neyveli", "College"]
    },
    {
        id: 17, number: "TN-32-17", route: "Route B", start: "Chinnasalem", destination: "College",
        departure: "06:08 AM", arrival: "08:22 AM", eveningDeparture: "05:02 PM", eveningArrival: "07:28 PM",
        stops: 6, status: "Not Available", driver: "B. Senthil", contact: "+91 98765 10017", capacity: 50,
        stopsList: ["Chinnasalem", "Kallakurichi", "Ulundurpet", "Thirukoilur", "Mugaiyur", "College"]
    },
    {
        id: 18, number: "TN-32-18", route: "Route C", start: "Melmalayanur", destination: "College",
        departure: "06:32 AM", arrival: "07:58 AM", eveningDeparture: "05:38 PM", eveningArrival: "06:58 PM",
        stops: 4, status: "Active", driver: "F. Ganesh", contact: "+91 98765 10018", capacity: 48,
        stopsList: ["Melmalayanur", "Gingee Fort", "Olakkur", "College"]
    },
    {
        id: 19, number: "TN-32-19", route: "Route D", start: "Villianur", destination: "College",
        departure: "06:02 AM", arrival: "08:04 AM", eveningDeparture: "05:11 PM", eveningArrival: "07:22 PM",
        stops: 5, status: "Delayed", driver: "O. Praveen", contact: "+91 98765 10019", capacity: 52,
        stopsList: ["Villianur", "Madagadipet", "Mannadipet", "Vanur", "College"]
    },
    {
        id: 20, number: "TN-32-20", route: "Route E", start: "Vadalur", destination: "College",
        departure: "06:45 AM", arrival: "07:52 AM", eveningDeparture: "05:48 PM", eveningArrival: "06:48 PM",
        stops: 4, status: "Active", driver: "W. Ashok", contact: "+91 98765 10020", capacity: 46,
        stopsList: ["Vadalur", "Neyveli", "Mailam", "College"]
    }
];

/* Pseudo dashboard statistics - also "server provided" in production. */
const STATS_DATA = [
    { key: "buses", num: BUS_DATA.length, label: "Total Buses" },
    { key: "routes", num: 12, label: "Total Routes" },
    { key: "pickups", num: 48, label: "Pickup Points" },
    { key: "trips", num: 36, label: "Today's Trips" }
];
