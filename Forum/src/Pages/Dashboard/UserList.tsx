import React, { useState } from "react";
import styles from "./User.module.css";
import SidebarMenu from "../../components/SideBar/SideBarMenu";
import avata from "../../Image/avata.png";


const UserList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  

  const defaultUsers = [
    {
      id: 1,
      avatar: avata, 
      userId: "0001",
      name: "NTA",
      username: "NTA1",
      email: "NTA@gmail.com",
      phone: "123456",
      age: 25,
      status: "Active",
    },
  ];
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
           
            {defaultUsers.length > 0 ? (
              defaultUsers.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>
                    <img src={user.avatar} alt="Avatar" className={styles.avatar} />
                  </td>
                  <td>{user.userId}</td>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.age}</td>
                  <td>{user.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} className={styles.noData}>No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
