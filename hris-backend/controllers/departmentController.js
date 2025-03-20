const pool = require("../config/db");

// Ambil semua karyawan
const getDepartment = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM department");
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Tambah karyawan
const createDepartment = async (req, res) => {
    const { name, description } = req.body;
    try {
        const result = await pool.query(
            "INSERT INTO department (name, description) VALUES ($1, $2) RETURNING *",
            [name, description]
        );
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Edit karyawan
const updateDepartment = async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    try {
        const result = await pool.query(
            "UPDATE department SET name=$1, description=$2 WHERE id=$3 RETURNING *",
            [name, description, id]
        );
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Hapus karyawan
const deleteDepartment = async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query("DELETE FROM department WHERE id=$1", [id]);
        res.json({ message: "Department deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getDepartment,
    createDepartment,
    updateDepartment,
    deleteDepartment,
};
