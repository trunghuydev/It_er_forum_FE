import React, { useState } from "react";
import SidebarItem from "./SidebarItem";
import styled from "styled-components";
import {
  UserOutlined,
  FileTextOutlined,
  BarChartOutlined,
  TeamOutlined,
  LogoutOutlined,
  UserAddOutlined,
} from "@ant-design/icons";

// Styled cho Sidebar
const SidebarContainer = styled.div<{ collapsed: boolean }>`
  width: ${(props) => (props.collapsed ? "60px" : "250px")};
  height: 100vh;
  background: #2b6cb0;
  color: white;
  position: fixed;
  left: 0;
  top: 0;
  transition: width 0.3s ease;
`;

// Styled cho nút toggle
const ToggleButton = styled.button`
  width: 100%;
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  padding: 10px;
`;

// Styled cho menu
const Menu = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const SidebarMenu: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { label: "Current Admin", path: "/admin", icon: <UserOutlined /> },
    { label: "Post", path: "/post", icon: <FileTextOutlined /> },
    { label: "Report", path: "/report", icon: <BarChartOutlined /> },
    { label: "User", path: "/user", icon: <TeamOutlined /> },
    { label: "Logout", path: "/logout", icon: <LogoutOutlined /> },
    { label: "Register", path: "/register", icon: <UserAddOutlined /> },
  ];

  return (
    <SidebarContainer collapsed={collapsed}>
      <ToggleButton onClick={() => setCollapsed(!collapsed)}>☰</ToggleButton>
      <Menu>
        {menuItems.map((item, index) => (
          <SidebarItem key={index} label={item.label} path={item.path} icon={item.icon} collapsed={collapsed} />
        ))}
      </Menu>
    </SidebarContainer>
  );
};

export default SidebarMenu;
