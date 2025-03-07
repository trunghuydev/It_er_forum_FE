import React, { useState } from "react";
import styles from "./Comment.module.css";
import { FaSearch } from "react-icons/fa";
import SidebarMenu from "../../components/SideBar/SideBarMenu";
import { useNavigate } from "react-router-dom";

const Comment: React.FC = () => {
  const navigate = useNavigate();
  const [pendingCount, setPendingCount] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <SidebarMenu />
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.topRow}>
            <div className={styles.pendingApproval}>
              <span>Pending Approval •</span>
              <span>{pendingCount}</span>
            </div>
            <div className={styles.actionButtons}>
              <button className={styles.approve}>Approve</button>
              <button className={styles.reject}>Reject</button>
            </div>
          </div>

        </div>

        <button className={styles.button} onClick={() => navigate("/report")}>
          Back to Report
        </button>
      </div>
    </>
  );
};

export default Comment;
