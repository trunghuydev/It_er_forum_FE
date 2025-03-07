import React from "react";
import { useNavigate } from "react-router-dom";
import SidebarMenu from "../../components/SideBar/SideBarMenu";
import styles from "./Report.module.css";

const Report: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <SidebarMenu />
      <div className={styles.container}>
        <h1 className={styles.title}>Report Page</h1>
        <div className={styles.buttonContainer}>
          <button className={styles.button} onClick={() => navigate("/post")}>
            Go to Post Report
          </button>
          <button className={styles.button} onClick={() => navigate("/userlist")}>
            Go to User
          </button>
          <button className={styles.button} onClick={() => navigate("/commentreport")}>
            Go to Comment report
          </button>
        </div>
      </div>
    </>
  );
};

export default Report;
