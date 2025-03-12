import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  UserOutlined,
  FileTextOutlined,
  LogoutOutlined,
  UserAddOutlined,
  DownOutlined,
  UpOutlined,
} from "@ant-design/icons";

const SidebarContainer = styled.div`
  width: 250px;
  height: 100vh;
  background: #2b6cb0;
  color: white;
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  padding-top: 20px;
`;

const Menu = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const MenuItem = styled.li`
  padding: 15px 20px;
  cursor: pointer;
  transition: background 0.3s;
  display: flex;
  align-items: center;
  font-size: 16px;
  gap: 10px; /* Khoảng cách giữa icon và chữ */

  &:hover {
    background: #1e4e8c;
  }
`;

const MenuItemContent = styled.div`
  display: flex;
  align-items: center;
  flex: 1; /* Căn đều phần chữ */
  gap: 10px;
`;

const DropdownMenu = styled.ul<{ isOpen: boolean }>`
  list-style: none;
  padding: 0;
  margin: 0;
  background: #1e4e8c;
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
`;

const DropdownItem = styled.li`
  padding: 10px 40px;
  cursor: pointer;
  transition: background 0.3s;
  font-size: 14px;

  &:hover {
    background: #16437e;
  }
`;

const Footer = styled.div`
  margin-top: auto;
  padding: 15px;
  text-align: center;
  font-size: 14px;
  background: #2b6cb0;
  color: #fff;
`;

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <SidebarContainer>
      <Menu>
        <MenuItem onClick={() => navigate("/profile")}>
          <MenuItemContent>
            <UserOutlined />
            <span>Profile</span>
          </MenuItemContent>
        </MenuItem>

        <MenuItem onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
          <MenuItemContent>
            <FileTextOutlined />
            <span>Report</span>
          </MenuItemContent>
          {isDropdownOpen ? <UpOutlined /> : <DownOutlined />}
        </MenuItem>

        <DropdownMenu isOpen={isDropdownOpen}>
          <DropdownItem onClick={() => navigate("/post")}>Post Report</DropdownItem>
          <DropdownItem onClick={() => navigate("/userlist")}>User</DropdownItem>
          <DropdownItem onClick={() => navigate("/commentreport")}>Comment report</DropdownItem>
        </DropdownMenu>

        <MenuItem onClick={() => navigate("/logout")}>
          <MenuItemContent>
            <LogoutOutlined />
            <span>Logout</span>
          </MenuItemContent>
        </MenuItem>

        <MenuItem onClick={() => navigate("/register")}>
          <MenuItemContent>
            <UserAddOutlined />
            <span>Register</span>
          </MenuItemContent>
        </MenuItem>
      </Menu>

      <Footer>© Copyright By Trung Huy & Trung Thành</Footer>
    </SidebarContainer>
  );
};

export default Sidebar;
