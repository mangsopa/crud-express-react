import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    navigate("/login");
                    return;
                }

                const response = await axios.get("http://localhost:5000/api/dashboard", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setMessage(response.data.message);
            } catch (error) {
                localStorage.removeItem("token");
                navigate("/login");
            }
        };

        fetchDashboard();
    }, [navigate]);

    return (
        <div>
            <h2>Dashboard</h2>
            <p>{message}</p>
            <button onClick={() => {
                localStorage.removeItem("token");
                navigate("/login");
            }}>
                Logout
            </button>
        </div>
    );
};

export default Dashboard;
