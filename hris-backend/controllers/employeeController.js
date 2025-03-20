const pool = require("../config/db");

// Ambil semua karyawan
const getEmployees = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM employees");
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Tambah karyawan
const createEmployee = async (req, res) => {
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
};

// Edit karyawan
const updateEmployee = async (req, res) => {
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
};

// Hapus karyawan
const deleteEmployee = async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query("DELETE FROM employees WHERE id=$1", [id]);
        res.json({ message: "Employee deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee,
};
