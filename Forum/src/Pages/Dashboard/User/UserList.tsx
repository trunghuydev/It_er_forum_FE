import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./User.module.css";
import SidebarMenu from "../../../components/SideBar/SideBarMenu";
import { useFetch } from "../../../hooks/useFetch";
import avatar from "../../../Image/avata.png";
import Header from "../../../components/Header/Header";
import { UseUser } from "@/hooks/User/useUser";
import { TUser } from "@/interface/TUser";



const UserList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [totalUsersCount, setTotalUsersCount] = useState(0);
  const navigate = useNavigate();
  const {data, isLoading,isError} =UseUser();
  const users:TUser[] = data?.data || [];

  useEffect(() => {
    console.log("Users data:", users); 
    if (users) {
      const totalUsers = users.length; 
      console.log("Total users count:", totalUsers); 
      setTotalUsersCount(totalUsers);
    } else {
      setTotalUsersCount(0);
    }
  }, [users]);

  // Lọc danh sách người dùng dựa trên searchTerm, kiểm tra an toàn
  const filteredUsers = users.filter((user) => {
    const userName = user.user_name || "";
    return userName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className={styles.mainContainer}>
      <SidebarMenu />
      <div className={styles.container}>
        <Header
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          totalUsersCount={totalUsersCount}
        />
        <div className={styles.reportedDisplayContainer}>
          {isLoading && <p>Loading data...</p>}
          {isError && <p className={styles.isError}>Error: {isError}</p>}

          {!isLoading && !isError && (
            <table className={styles.reportedTable}>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Avatar</th>
                  <th>User ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Age</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user, index) => (
                    <tr key={user.user_id}>
                      <td>{index + 1}</td>
                      <td>
                        <img
                          src={user.ava_img_path || avatar}
                          alt="Avatar"
                          className={styles.avatar}
                        />
                      </td>
                      <td
                        onClick={() => navigate(`/user/${user.user_id}`)}
                        className={styles.titleCell}
                      >
                        {user.user_id}
                      </td>
                      <td>
                        {user.first_name || user.last_name
                          ? `${user.first_name || ""} ${user.last_name || ""}`.trim()
                          : "N/A"}
                      </td>
                      <td>{user.email}</td>
                      <td>{user.phone_num || "N/A"}</td>
                      <td>{user.age !== null ? user.age : "N/A"}</td>
                      <td>{user.status}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className={styles.noReports}>
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserList;

