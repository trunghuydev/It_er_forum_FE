import React from "react";
import { Menu } from "antd";
import {
  UserOutlined,
  FileTextOutlined,
  WarningOutlined,
  TeamOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

const menuItems = [
  { key: "admin", icon: <UserOutlined />, label: "Current Admin" },
  { key: "post", icon: <FileTextOutlined />, label: "Post" },
  { key: "report", icon: <WarningOutlined />, label: "Report" },
  { key: "user", icon: <TeamOutlined />, label: "User" },
  { key: "logout", icon: <LogoutOutlined />, label: "Logout" },
];

const SidebarMenu: React.FC = () => {
  return (
    <Menu theme="dark" mode="inline">
      {menuItems.map((item) => (
        <Menu.Item key={item.key} icon={item.icon}>
          {item.label}
        </Menu.Item>
      ))}
    </Menu>
  );
};

export default SidebarMenu;
