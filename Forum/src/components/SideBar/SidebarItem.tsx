import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { DownOutlined } from "@ant-design/icons";

interface SidebarItemProps {
  label: string;
  path?: string;
  icon: JSX.Element;
  subMenu?: { label: string; path: string }[];
}

const SidebarItem: React.FC<SidebarItemProps> = ({ label, path, icon, subMenu }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    if (subMenu) {
      setIsOpen(!isOpen);
    } else if (path) {
      navigate(path);
    }
  };

  return (
    <>
      <MenuItem onClick={handleClick}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <IconWrapper>{icon}</IconWrapper>
          <span>{label}</span>
        </div>
        {subMenu && <DownOutlined />}
      </MenuItem>

      {isOpen && subMenu && (
        <DropdownMenu $isOpen={isOpen}>
          {subMenu.map((item, index) => (
            <DropdownItem key={index} onClick={() => navigate(item.path)}>
              {item.label}
            </DropdownItem>
          ))}
        </DropdownMenu>
      )}
    </>
  );
};

export default SidebarItem;

const MenuItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 15px;
  cursor: pointer;
  transition: background 0.3s;
  &:hover {
    background: #1e4e8c;
  }
`;

const IconWrapper = styled.span`
  font-size: 20px;
`;

const DropdownMenu = styled.ul<{ $isOpen: boolean }>`
  list-style: none;
  padding: 0;
  margin: 0;
  background: #1e4e8c;
  position: relative;
  max-height: ${({ $isOpen }) => ($isOpen ? "300px" : "0")};
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;
`;

const DropdownItem = styled.li`
  padding: 10px 20px;
  cursor: pointer;
  transition: background 0.3s;
  &:hover {
    background: #16437e;
  }
`;
