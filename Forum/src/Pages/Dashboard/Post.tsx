import React from "react";
import styled from "styled-components";

// Styled Components
const Header = styled.div`
  background: #2b6cb0;
  color: white;
  padding: 10px;
  text-align: center;
`;

const SearchBox = styled.div`
  margin: 10px auto;
  text-align: center;

  input {
    padding: 8px;
    width: 200px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
`;

const Container = styled.div`
  padding: 20px;
`;

const Post: React.FC = () => {
  return (
    <Container>
      <Header>
        <h1>Pending Approval</h1>
        <h2>Phê duyệt</h2>
      </Header>
      <SearchBox>
        <input type="text" placeholder="Search..." />
      </SearchBox>
    </Container>
  );
};

export default Post;
