import React, { useState } from "react";
import styles from "./User.module.css";
import SidebarMenu from "../../components/SideBar/SideBarMenu";

const UserList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className={styles.mainContainer}>
     
      <SidebarMenu />

    
      <div className={styles.content}>
        <h2 className={styles.title}>User List</h2>

        
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />

       
        <table className={styles.userTable}>
          <thead>
            <tr>
              <th>STT</th>
              <th>Avatar</th>
              <th>User ID</th>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Age</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
           
            <tr>
              <td colSpan={9} className={styles.noData}>
                No users available
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
