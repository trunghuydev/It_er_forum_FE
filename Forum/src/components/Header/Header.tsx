import React from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";

interface HeaderProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  pendingCount?: number;
  totalUsersCount?: number; // Thêm prop mới
}

const Header: React.FC<HeaderProps> = ({ searchTerm, setSearchTerm, pendingCount, totalUsersCount }) => {
  return (
    <HeaderContainer>
      {totalUsersCount !== undefined ? (
        <TotalUsers>
          <span>Total Users •</span>
          <span>{totalUsersCount}</span>
        </TotalUsers>
      ) : pendingCount !== undefined ? (
        <PendingApproval>
          <span>Pending Approval •</span>
          <span>{pendingCount}</span>
        </PendingApproval>
      ) : null}
      <SearchContainer>
        <SearchIcon />
        <SearchInput
          type="text"
          placeholder="Search Post..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </SearchContainer>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 17vw;
  width: calc(100% - 19vw);
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem 1.5rem;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 0.5rem;
`;

/* Pending Approval */
const PendingApproval = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
`;

/* Total Users */
const TotalUsers = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
`;

/* Search Container */
const SearchContainer = styled.div`
  position: relative;
  width: 30%;
  min-width: 250px;
  max-width: 400px;
`;

/* Search Icon */
const SearchIcon = styled(FaSearch)`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #888;
  font-size: 1.2rem;
`;

/* Search Input */
const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 2.5rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  font-size: 1rem;
  outline: none;
  transition: all 0.3s ease-in-out;

  &:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 5px rgba(59, 130, 246, 0.5);
  }

  &::placeholder {
    color: #aaa;
    font-style: italic;
  }

  &:not(:placeholder-shown) {
    color: #333;
  }
`;