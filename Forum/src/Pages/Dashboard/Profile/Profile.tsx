import React from "react";
import styles from "./Profile.module.css";
import SidebarMenu from "../../../components/SideBar/SideBarMenu";
import avata from "../../../Image/avata.png";

const Profile: React.FC = () => {
  return (
    <div className={styles.mainContainer}>
      <SidebarMenu />

      <div className={styles.profileContainer}>
        
        <div className={styles.profileHeader}>
        <img src={avata} alt="Avatar" className={styles.avatar} />

          <h2> Thanh</h2>
          <p>Active User</p>
        </div>

        <div className={styles.profileForm}>
          <h3>Personal Information</h3>
          <div className={styles.formRow}>
            <div className={styles.inputGroup}>
              <label>User ID</label>
              <input type="text" defaultValue="123" disabled />
            </div>
            <div className={styles.inputGroup}>
              <label>Username</label>
              <input type="text" defaultValue="thanh123"disabled />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.inputGroup}>
              <label>Name</label>
              <input type="text" defaultValue="Thanh" disabled/>
            </div>
            <div className={styles.inputGroup}>
              <label>Age</label>
              <input type="number" defaultValue="25" disabled/>
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.inputGroup}>
              <label>Email</label>
              <input type="email" defaultValue="thanh123@" disabled/>
            </div>
            <div className={styles.inputGroup}>
              <label>Phone</label>
              <input type="tel" defaultValue="121212" disabled/>
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label>Status</label>
            <input type="text" defaultValue="Active" disabled />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
