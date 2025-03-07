import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  UserOutlined,
 
  BarChartOutlined,
  
  LogoutOutlined,
  UserAddOutlined,
} from "@ant-design/icons";

const SidebarContainer = styled.div`
  width: 250px;
  height: 100vh;
  background: #2b6cb0;
  color: white;
  position: fixed;
  left: 0;
  top: 0;
`;

const Menu = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const MenuItem = styled.li`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 15px;
  cursor: pointer;
  transition: background 0.3s;
  &:hover {
    background: #1e4e8c;
  }
`;

const SidebarMenu: React.FC = () => {
  const navigate = useNavigate();

  const menuItems = [
    { label: "Profile", path: "/profile", icon: <UserOutlined /> },
    { label: "Report", path: "/report", icon: <BarChartOutlined /> }, // Chỉ để Report
    { label: "Logout", path: "/logout", icon: <LogoutOutlined /> },
    { label: "Register", path: "/register", icon: <UserAddOutlined /> },
  ];

  return (
    <SidebarContainer>
      <Menu>
        {menuItems.map((item, index) => (
          <MenuItem key={index} onClick={() => navigate(item.path)}>
            {item.icon}
            <span>{item.label}</span>
          </MenuItem>
        ))}
      </Menu>
    </SidebarContainer>
  );
};

export default SidebarMenu;
