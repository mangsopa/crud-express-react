require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "hris",
    password: "password",
    port: 5432,
});

const app = express();
app.use(express.json());
app.use(cors());

// Ambil semua karyawan
app.get("/api/employees", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM employees");
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Tambah karyawan
app.post("/api/employees", async (req, res) => {
    const { name, email } = req.body;
    try {
        const result = await pool.query(
            "INSERT INTO employees (name, email) VALUES ($1, $2) RETURNING *",
            [name, email]
        );
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Edit karyawan
app.put("/api/employees/:id", async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    try {
        const result = await pool.query(
            "UPDATE employees SET name=$1, email=$2 WHERE id=$3 RETURNING *",
            [name, email, id]
        );
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Hapus karyawan
app.delete("/api/employees/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query("DELETE FROM employees WHERE id=$1", [id]);
        res.json({ message: "Employee deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// app.get("/", (req, res) => {
//     res.send("API HRIS Berjalan 123 🚀");
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server berjalan di port ${PORT}`));
