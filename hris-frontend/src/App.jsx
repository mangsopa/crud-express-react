import React from "react";
import { Layout, Menu } from "antd";
import { UserOutlined, HomeOutlined } from "@ant-design/icons";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import EmployeeList from "./pages/EmployeeList";
import DepartmentList from "./pages/DepartmentList";

const { Header, Sider, Content } = Layout;

// Fungsi untuk mengecek apakah user sudah login
const isAuthenticated = () => {
  return localStorage.getItem("token"); // Kalau ada token berarti user login
};

// Komponen untuk proteksi halaman dashboard
const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

function Dashboard() {
  const [selectedMenu, setSelectedMenu] = useState("dashboard");

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["dashboard"]}
          onClick={(e) => setSelectedMenu(e.key)}>
          <Menu.Item key="dashboard" icon={<HomeOutlined />}>
            Dashboard
          </Menu.Item>
          <Menu.Item key="employees" icon={<UserOutlined />}>
            Employees
          </Menu.Item>
          <Menu.Item key="departments" icon={<UserOutlined />}>
            Departments
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout>
        <Header style={{ background: "#fff", padding: 20 }}>HRIS Admin</Header>
        <Content style={{ margin: "16px" }}>
          {selectedMenu === "employees" ? (
            <EmployeeList />
          ) : selectedMenu === "departments" ? (
            <DepartmentList />
          ) : (
            <h2>Welcome to HRIS</h2>
          )}
        </Content>
      </Layout>
    </Layout>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/dashboard" />} />
        {/* <p>Belum punya akun? <a href="/register">Daftar di sini</a></p> */}

      </Routes>
    </Router>
  );
}

export default App;
