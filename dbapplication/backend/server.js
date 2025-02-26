const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to SQLite database (creates it if not existing)
const db = new sqlite3.Database("database.db", (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log("✅ Connected to SQLite database.");
        createTable();
    }
});

// Function to create users table if it does not exist
const createTable = () => {
    db.run(
        `CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE
        )`,
        (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log("✅ Users table ready.");
            }
        }
    );
};

// **📌 Route: Add User**
app.post("/add", (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ error: "Name and email are required." });
    }

    const query = `INSERT INTO users (name, email) VALUES (?, ?)`;
    db.run(query, [name, email], function (err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.json({ id: this.lastID, name, email });
    });
});

// **📌 Route: View Users**
app.get("/view", (req, res) => {
    db.all("SELECT * FROM users", [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// **📌 Route: Delete User by ID**
app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    db.run(`DELETE FROM users WHERE id = ?`, id, function (err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.json({ message: "User deleted successfully" });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`✅ Server running on http://localhost:${port}`);
});
