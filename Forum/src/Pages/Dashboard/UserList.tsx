import React, { useState } from "react";
import styles from "./User.module.css";
import SidebarMenu from "../../components/SideBar/SideBarMenu";
import avatar from "../../Image/avata.png";

const UserList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const defaultUsers = [
    { id: 1, avatar, userId: "0001", name: "NTA", username: "NTA1", email: "NTA@gmail.com", phone: "123456", age: 25, status: "Active", options: ["Accept", "Restricted", "Active"] },
    { id: 2, avatar, userId: "0002", name: "User 2", username: "user2", email: "user2@example.com", phone: "987654", age: 30, status: "Inactive", options: ["Accept", "Restricted", "Active"] },
    { id: 3, avatar, userId: "0003", name: "User 3", username: "user3", email: "user3@example.com", phone: "654321", age: 22, status: "Pending", options: ["Accept", "Restricted", "Active"] },
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
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {defaultUsers.length > 0 ? (
              defaultUsers.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td><img src={user.avatar} alt="Avatar" className={styles.avatar} /></td>
                  <td>{user.userId}</td>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.age}</td>
                  <td>{user.status}</td>
                  <td>
                    {user.options.map((option, i) => (
                      <button key={i} className={styles.optionButton}>{option}</button>
                    ))}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={10} className={styles.noData}>No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
