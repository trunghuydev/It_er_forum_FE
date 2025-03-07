import React from "react";
import styles from "./Profile.module.css";
import SidebarMenu from "../../components/SideBar/SideBarMenu";

const Profile: React.FC = () => {
  return (
    <div className={styles.mainContainer}>
      <SidebarMenu />

      <div className={styles.content}>
        <h2 className={styles.title}>User Profile</h2>

        <div className={styles.profileCard}>
          <img
            src="https://via.placeholder.com/100"
            alt="Avatar"
            className={styles.avatar}
          />

          <table className={styles.profileTable}>
            <tbody>
              <tr>
                <td><strong>User ID:</strong></td>
                <td>123</td>
              </tr>
              <tr>
                <td><strong>Name:</strong></td>
                <td>cho thanh</td>
              </tr>
              <tr>
                <td><strong>Username:</strong></td>
                <td>thanh123</td>
              </tr>
              <tr>
                <td><strong>Email:</strong></td>
                <td>thanh123@</td>
              </tr>
              <tr>
                <td><strong>Phone:</strong></td>
                <td>121212</td>
              </tr>
              <tr>
                <td><strong>Age:</strong></td>
                <td>25</td>
              </tr>
              <tr>
                <td><strong>Status:</strong></td>
                <td>Active</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Profile;
