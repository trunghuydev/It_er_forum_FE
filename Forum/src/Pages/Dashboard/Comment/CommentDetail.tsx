import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./CommentDetail.module.css";
import SidebarMenu from "../../../components/SideBar/SideBarMenu";
import axios from "axios";
import { useCommentDetail } from "@/hooks/Comment/usecommentDetail";



const CommentDetail: React.FC = () => {
  
  const navigate = useNavigate();
  const {report_id}= useParams<{ report_id: string }>();
  const {data , isLoading,isError}= useCommentDetail(report_id!);
  const comment_rp = data?.data;
  

  const accessToken = localStorage.getItem("accessToken") || "your-token-here";


  const [status, setStatus] = useState<string>(comment_rp?.status || "Pending");
  const handleAction = async (newStatus: "Skipped" | "Restricted" | "Banned") => {
    try {
      if (newStatus === "Skipped") {
        await axios.delete(
          `http://localhost:3000/api/v1/report/skip-report/${report_id}`,
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );
      } else {
        await axios.patch(
          `http://localhost:3000/api/v1/users/admin/${comment_rp?.reported_user_id}`,
          { status: newStatus },
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );
      }
      setStatus(newStatus);
      setTimeout(() => navigate("/commentreport"), 500);
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  if (!report_id) {
    return (
      <div className={styles.mainContainer}>
        <SidebarMenu />
        <div className={styles.container}>
          <h2>Invalid Report ID</h2>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={styles.mainContainer}>
        <SidebarMenu />
        <div className={styles.container}>
          <p>Loading comment_rp details...</p>
        </div>
      </div>
    );
  }

 
  if (isError || !comment_rp) {
    return (
      <div className={styles.mainContainer}>
        <SidebarMenu />
        <div className={styles.container}>
          <h2>{isError ? `Error: ${isError}` : "Report Not Found"}</h2>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.mainContainer}>
      <SidebarMenu />
      <div className={styles.container}>
        <h2 className={styles.title}>Comment Detail</h2>
        <div className={styles.reportDetailWrapper}>
          <div className={styles.reportDetailContainer}>
            {/* Thông tin báo cáo */}
            <div className={styles.userInfo}>
              <strong>Reported User ID:</strong> {comment_rp.reported_user_id}
            </div>
            <h3 className={styles.reportTitle}>{comment_rp.report_title}</h3>
            <div className={styles.reportContent}>
              <p><strong>Report Details:</strong> {comment_rp.report_body}</p>
              <p>
                <strong>Reported Date:</strong>{" "}
                {new Date(comment_rp.date_reported).toLocaleDateString()}
              </p>
              <p><strong>Subject:</strong> {comment_rp.subject}</p>
            </div>

            {/* Thông tin bình luận */}
            <div className={styles.commentDetail}>
              <h4>Reported Comment Information</h4>
              <p><strong>Comment ID:</strong> {comment_rp.content.comment_id}</p>
              <p><strong>Comment Content:</strong> {comment_rp.content.comment_content}</p>
            </div>

            {/* Thông tin người dùng bị báo cáo */}
            <div className={styles.userDetail}>
              <h4>Reported User Information</h4>
              <div className={styles.userInfoWrapper}>
                <div className={styles.infoSection}>
                  <p><strong>User ID:</strong> {comment_rp.reported_user_id}</p>
                  <p><strong>Username:</strong> {comment_rp.reported_user_name}</p>
                  <p><strong>Status:</strong> {status}</p>
                </div>
              </div>
            </div>

            {/* Nút hành động */}
            <div className={styles.actionButtons}>
              <button className={`${styles.actionButton} ${styles.skip}`} onClick={() => handleAction("Skipped")}>
                Skip
              </button>
              <button className={`${styles.actionButton} ${styles.restricted}`} onClick={() => handleAction("Restricted")}>
                Restrict
              </button>
              <button className={`${styles.actionButton} ${styles.banned}`} onClick={() => handleAction("Banned")}>
                Ban
              </button>
            </div>
          </div>
        </div>

        {/* Nút Quay lại */}
        <button
          onClick={() => navigate("/commentreport")}
          className={styles.backButton}
        >
          Back to Reported Comments
        </button>
      </div>
    </div>
  );
};

export default CommentDetail;