import { Layout, Menu } from "antd";
import { UserOutlined, HomeOutlined } from "@ant-design/icons";
import { useState } from "react";
import EmployeeList from "./pages/EmployeeList";

const { Header, Sider, Content } = Layout;

function App() {
  const [selectedMenu, setSelectedMenu] = useState("dashboard");

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sider collapsible>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["dashboard"]}
          onClick={(e) => setSelectedMenu(e.key)}>
          <Menu.Item key="dashboard" icon={<HomeOutlined />}>
            Dashboard
          </Menu.Item>
          <Menu.Item key="employees" icon={<UserOutlined />}>
            Employees
          </Menu.Item>
        </Menu>
      </Sider>

      {/* Main Content */}
      <Layout>
        <Header style={{ background: "#fff", padding: 20 }}>HRIS Admin</Header>
        <Content style={{ margin: "16px" }}>
          {selectedMenu === "employees" ? <EmployeeList /> : <h2>Welcome to HRIS</h2>}
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
