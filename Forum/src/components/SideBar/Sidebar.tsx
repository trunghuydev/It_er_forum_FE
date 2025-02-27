import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import SidebarMenu from "./SideBarMenu";

const { Sider } = Layout;

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  return (
    <Sider collapsible collapsed={collapsed} style={{ height: "100vh" }}>
      <Menu theme="dark" mode="inline">
        <Menu.Item
          key="toggle"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? "" : "Collapse"}
        </Menu.Item>
      </Menu>
      <SidebarMenu /> 
    </Sider>
  );
};

export default Sidebar;
