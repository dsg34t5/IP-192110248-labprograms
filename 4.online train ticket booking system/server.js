const express = require('express');
const sqlite3 = require('sqlite3');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

const dbPath = path.resolve(__dirname, 'train_ticket_booking.db');
const db = new sqlite3.Database(dbPath);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Create tables
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS train_bookings (
        booking_id INTEGER PRIMARY KEY,
        from_station TEXT NOT NULL,
        to_station TEXT NOT NULL,
        travel_date DATE NOT NULL,
        total_passengers INTEGER NOT NULL
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS train_passengers (
        passenger_id INTEGER PRIMARY KEY,
        booking_id INTEGER NOT NULL,
        passenger_name TEXT NOT NULL,
        seat_number INTEGER NOT NULL,
        FOREIGN KEY (booking_id) REFERENCES train_bookings(booking_id)
    )`);
});

// Serve static files
app.use(express.static('public'));

// Handle form submission
app.post('/submit-booking', (req, res) => {
    const { fromStation, toStation, travelDate, passengerCount } = req.body;

    db.run(`INSERT INTO train_bookings (from_station, to_station, travel_date, total_passengers)
            VALUES (?, ?, ?, ?)`,
        [fromStation, toStation, travelDate, passengerCount], function (err) {
            if (err) {
                console.error(err.message);
                return res.status(500).send('Internal Server Error');
            }

            const bookingId = this.lastID;

            // Assume passengers are added here, replace this with actual passenger data
            // Example: db.run(`INSERT INTO train_passengers (booking_id, passenger_name, seat_number)
            //                VALUES (?, ?, ?)`, [bookingId, passengerName, seatNumber], ...);

            res.status(200).json({ bookingId });
        });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
