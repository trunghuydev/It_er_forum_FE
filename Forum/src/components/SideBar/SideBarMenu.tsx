import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import SidebarItem from "./SidebarItem";
import styles from "./SidebarMenu.module.css";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  FileTextOutlined,
  WarningOutlined,
  TeamOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;

const SidebarMenu: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  return (
    <Sider className={styles.sidebar} collapsed={collapsed}>
      <Menu theme="dark" mode="inline" className={styles.menu}>
        <Menu.Item
          className={styles.toggleButton}
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? "" : "Collapse"}
        </Menu.Item>

        <SidebarItem icon={<UserOutlined />} label="Current Admin" onClick={() => navigate("/admin")} />
        <SidebarItem icon={<FileTextOutlined />} label="Post" onClick={() => navigate("/post")} />
        <SidebarItem icon={<WarningOutlined />} label="Report" onClick={() => navigate("/report")} />
        <SidebarItem icon={<TeamOutlined />} label="User" onClick={() => navigate("/user")} />
        <SidebarItem icon={<LogoutOutlined />} label="Logout" onClick={() => navigate("/logout")} />
      </Menu>
    </Sider>
  );
};

export default SidebarMenu;