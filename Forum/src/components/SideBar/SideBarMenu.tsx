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

const SidebarItem: React.FC<{
  icon: React.ReactNode;
  text: string;
  onClick: () => void;
}> = ({ icon, text, onClick }) => (
  <MenuItem onClick={onClick}>
    <MenuItemContent>
      {icon}
      <span>{text}</span>
    </MenuItemContent>
  </MenuItem>
);

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <SidebarContainer>
      <Menu>
        <SidebarTitle>Forum Admin</SidebarTitle>
        <TitleUnderline />

        <SidebarItem icon={<UserOutlined />} text="Profile" onClick={() => navigate("/profile")} />
        
        <MenuItem onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
          <MenuItemContent>
            <FileTextOutlined />
            <span>Report</span>
          </MenuItemContent>
          <DropdownIcon>{isDropdownOpen ? <UpOutlined /> : <DownOutlined />}</DropdownIcon>
        </MenuItem>

        <DropdownMenu isOpen={isDropdownOpen}>
          <DropdownItem onClick={() => navigate("/post")}><Dot /> Post Report</DropdownItem>
          <DropdownItem onClick={() => navigate("/userlist")}><Dot /> User</DropdownItem>
          <DropdownItem onClick={() => navigate("/commentreport")}><Dot /> Comment report</DropdownItem>
        </DropdownMenu>

        <SidebarItem icon={<LogoutOutlined />} text="Logout" onClick={() => navigate("/logout")} />
        <SidebarItem icon={<UserAddOutlined />} text="Register" onClick={() => navigate("/register")} />
      </Menu>

      <Footer>© Copyright By Trung Huy & Trung Thành</Footer>
    </SidebarContainer>
  );
};

export default Sidebar;

const SidebarContainer = styled.div`
  width: 250px;
  height: 100vh;
  background: #ffffff;
  color: #5a5a5a;
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  border-right: 1px solid #e0e0e0;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
`;

const SidebarTitle = styled.div`
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  padding: 20px 0;
  color: #e57373;
`;

const TitleUnderline = styled.div`
  width: 80%;
  height: 2px;
  background: rgba(196, 32, 32, 0.5);
  margin: 5px auto;
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
  justify-content: space-between;

  &:hover {
    background: #fdeeee;
  }
`;

const MenuItemContent = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
    &:hover {
    background: #fdeeee;
    color: #e57373;
  }
`;

const DropdownIcon = styled.div`
  font-size: 14px;
  color: #e57373;
`;

const DropdownMenu = styled.ul<{ isOpen: boolean }>`
  list-style: none;
  padding: 0;
  margin: 0;
  background: #ffffff;
  max-height: ${({ isOpen }) => (isOpen ? "300px" : "0")};
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;
`;

const DropdownItem = styled.li`
  padding: 10px 40px;
  cursor: pointer;
  transition: background 0.3s;
  font-size: 14px;
  display: flex;
  align-items: center;
  color: #5a5a5a;

  &:hover {
    background: #fdeeee;
    color: #e57373;
  }
`;

const Dot = styled.span`
  width: 6px;
  height: 6px;
  background: #e57373;
  border-radius: 50%;
  display: inline-block;
  margin-right: 10px;
`;

const Footer = styled.div`
  margin-top: auto;
  padding: 15px;
  text-align: center;
  font-size: 14px;
  background: #ffffff;
  color: #5a5a5a;
`;







// code cu 
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import styled from "styled-components";
// import {
//   UserOutlined,
//   FileTextOutlined,
//   LogoutOutlined,
//   UserAddOutlined,
//   DownOutlined,
//   UpOutlined,
// } from "@ant-design/icons";


// const SidebarItem: React.FC<{
//   icon: React.ReactNode;
//   text: string;
//   onClick: () => void;
// }> = ({ icon, text, onClick }) => (
//   <MenuItem onClick={onClick}>
//     <MenuItemContent>
//       {icon}
//       <span>{text}</span>
//     </MenuItemContent>
//   </MenuItem>
// );



// const Sidebar: React.FC = () => {
//   const navigate = useNavigate();
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//   return (
//     <SidebarContainer>
//       <Menu>
//       <SidebarTitle>Forum Admin</SidebarTitle>

//         <SidebarItem icon={<UserOutlined />} text="Profile" onClick={() => navigate("/profile")} />
        
//         <MenuItem onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
//           <MenuItemContent>
//             <FileTextOutlined />
//             <span>Report</span>
//           </MenuItemContent>
//           {isDropdownOpen ? <UpOutlined /> : <DownOutlined />}
//         </MenuItem>

//         <DropdownMenu isOpen={isDropdownOpen}>
//           <DropdownItem onClick={() => navigate("/post")}>Post Report</DropdownItem>
//           <DropdownItem onClick={() => navigate("/userlist")}>User</DropdownItem>
//           <DropdownItem onClick={() => navigate("/commentreport")}>Comment report</DropdownItem>
//         </DropdownMenu>

//         <SidebarItem icon={<LogoutOutlined />} text="Logout" onClick={() => navigate("/logout")} />
//         <SidebarItem icon={<UserAddOutlined />} text="Register" onClick={() => navigate("/register")} />
//       </Menu>

//       <Footer>© Copyright By Trung Huy & Trung Thành</Footer>
//     </SidebarContainer>
//   );
// };

// export default Sidebar;




// const SidebarTitle = styled.div
//   text-align: center;
//   font-size: 18px;
//   font-weight: bold;
//   padding: 20px 0;
//   border-bottom: 1px solid rgba(255, 255, 255, 0.2);
// ;

// const SidebarContainer = styled.div
//   width: 250px;
//   height: 100vh;
//   background: #2b6cb0;
//   color: white;
//   position: fixed;
//   left: 0;
//   top: 0;
//   display: flex;
//   flex-direction: column;
//   padding-top: 20px;
// ;

// const Menu = styled.ul
//   list-style: none;
//   padding: 0;
//   margin: 0;
// ;

// const MenuItem = styled.li
//   padding: 15px 20px;
//   cursor: pointer;
//   transition: background 0.3s;
//   display: flex;
//   align-items: center;
//   font-size: 16px;
//   gap: 10px;

//   &:hover {
//     background: #1e4e8c;
//   }
// ;

// const MenuItemContent = styled.div
//   display: flex;
//   align-items: center;
//   flex: 1;
//   gap: 10px;
// ;

// const DropdownMenu = styled.ul<{ isOpen: boolean }>
//   list-style: none;
//   padding: 0;
//   margin: 0;
//   background: #1e4e8c;
//   max-height: ${({ isOpen }) => (isOpen ? "300px" : "0")};
//   overflow: hidden;
//   transition: max-height 0.3s ease-in-out;
// ;

// const DropdownItem = styled.li
//   padding: 10px 40px;
//   cursor: pointer;
//   transition: background 0.3s;
//   font-size: 14px;

//   &:hover {
//     background: #16437e;
//   }
// ;

// const Footer = styled.div
//   margin-top: auto;
//   padding: 15px;
//   text-align: center;
//   font-size: 14px;
//   background: #2b6cb0;
//   color: #fff;
// ;