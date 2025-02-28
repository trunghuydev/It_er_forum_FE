import React from "react";
import { Menu } from "antd";
import style from "./SidebarItem.module.css";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;

}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, onClick }) => {
  return (
    <Menu className={style.menu} mode="inline">
      <Menu.Item key={`sidebar-${label}`} icon={icon} onClick={onClick}>
        {label}
      </Menu.Item>
    </Menu>
  );
};

export default SidebarItem;
