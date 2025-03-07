import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

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

const IconWrapper = styled.span`
  font-size: 20px;
`;

interface SidebarItemProps {
  label: string;
  path: string;
  icon: JSX.Element;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ label, path, icon }) => {
  const navigate = useNavigate();

  return (
    <MenuItem onClick={() => navigate(path)}>
      <IconWrapper>{icon}</IconWrapper>
      <span>{label}</span> 
    </MenuItem>
  );
};

export default SidebarItem;
