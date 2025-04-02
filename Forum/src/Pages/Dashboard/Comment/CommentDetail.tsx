import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./CommentDetail.module.css";
import SidebarMenu from "../../../components/SideBar/SideBarMenu";
import { useFetch } from "../../../hooks/useFetch";
import axios from "axios";

// Định nghĩa interface cho dữ liệu báo cáo
interface CommentContent {
  comment_id: string;
  comment_content: string;
}

interface Report {
  reported_user_id: string;
  reported_user_name: string;
  reported_id: string;
  report_title: string;
  report_body: string;
  subject: string;
  date_reported: string;
  content: CommentContent;
  status?: string;
}

interface ApiResponse {
  is_success: boolean;
  status_code: number;
  message: string;
  data: Report;
  timestamp: number;
}

const CommentDetail: React.FC = () => {
  const { reported_id } = useParams<{ reported_id: string }>(); // Lấy reported_id từ URL
  const navigate = useNavigate();

  // Kiểm tra nếu reported_id không tồn tại
  if (!reported_id) {
    return (
      <div className={styles.mainContainer}>
        <SidebarMenu />
        <div className={styles.container}>
          <h2>Invalid Report ID</h2>
        </div>
      </div>
    );
  }

  // Sử dụng useFetch để lấy dữ liệu từ API
  const accessToken = localStorage.getItem("accessToken") || "your-token-here";
  const { data, loading, error } = useFetch<ApiResponse>(
    `http://localhost:3000/api/v1/report/admin/detail/Comment/${reported_id}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const report = data?.data;
  const [status, setStatus] = useState<string>(report?.status || "Pending");

  // Xử lý cập nhật trạng thái
  const handleAction = async (newStatus: "Skipped" | "Restricted" | "Banned") => {
    try {
      if (newStatus === "Skipped") {
        await axios.delete(
          `http://localhost:3000/api/v1/report/skip-report/${reported_id}`,
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );
      } else {
        await axios.patch(
          `http://localhost:3000/api/v1/users/admin/${report?.reported_user_id}`,
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

  // Xử lý trạng thái loading
  if (loading) {
    return (
      <div className={styles.mainContainer}>
        <SidebarMenu />
        <div className={styles.container}>
          <p>Loading report details...</p>
        </div>
      </div>
    );
  }

  // Xử lý trạng thái lỗi hoặc không có dữ liệu
  if (error || !report) {
    return (
      <div className={styles.mainContainer}>
        <SidebarMenu />
        <div className={styles.container}>
          <h2>{error ? `Error: ${error}` : "Report Not Found"}</h2>
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
              <strong>Reported User ID:</strong> {report.reported_user_id}
            </div>
            <h3 className={styles.reportTitle}>{report.report_title}</h3>
            <div className={styles.reportContent}>
              <p><strong>Report Details:</strong> {report.report_body}</p>
              <p>
                <strong>Reported Date:</strong>{" "}
                {new Date(report.date_reported).toLocaleDateString()}
              </p>
              <p><strong>Subject:</strong> {report.subject}</p>
            </div>

            {/* Thông tin bình luận */}
            <div className={styles.commentDetail}>
              <h4>Reported Comment Information</h4>
              <p><strong>Comment ID:</strong> {report.content.comment_id}</p>
              <p><strong>Comment Content:</strong> {report.content.comment_content}</p>
            </div>

            {/* Thông tin người dùng bị báo cáo */}
            <div className={styles.userDetail}>
              <h4>Reported User Information</h4>
              <div className={styles.userInfoWrapper}>
                <div className={styles.infoSection}>
                  <p><strong>User ID:</strong> {report.reported_user_id}</p>
                  <p><strong>Username:</strong> {report.reported_user_name}</p>
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