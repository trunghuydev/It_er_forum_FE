import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./ReportUserDetail.module.css"; // Tạo file CSS mới
import SidebarMenu from "../../../components/SideBar/SideBarMenu";
import { useFetch } from "../../../hooks/useFetch";
import avatar from "../../../Image/avata.png";
import axios from "axios";

// Interface cho nội dung người dùng bị báo cáo
interface ReportContent {
  user_id: string;
  ava_img_path: string | null;
  email: string;
  user_name: string;
  status: string;
  role: string;
}

// Interface cho báo cáo
interface Report {
  reported_user_id: string;
  reported_user_name: string;
  reported_id: string;
  report_title: string;
  report_body: string;
  subject: string;
  date_reported: string;
  content: ReportContent;
  status?: string;
}

// Interface cho response từ API
interface ApiResponse {
  is_success: boolean;
  status_code: number;
  message: string;
  data: Report;
  timestamp: number;
}

const ReportUserDetail: React.FC = () => {
  const { report_id } = useParams<{ report_id: string }>(); // Lấy report_id từ URL
  const navigate = useNavigate();

  // Fetch dữ liệu từ API
  const { data, loading, error, refetch } = useFetch<ApiResponse>(
    `http://localhost:3000/api/v1/report/admin/detail/User/${report_id}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken") || "your-token-here"}`,
      },
    }
  );

  const report = data?.data;
  const [status, setStatus] = useState<string>(report?.status || "Pending");

  // Xử lý cập nhật trạng thái
  const handleAction = async (newStatus: "Skipped" | "Restricted" | "Banned") => {
    const accessToken = localStorage.getItem("accessToken") || "your-token-here";
    try {
      switch (newStatus) {
        case "Skipped":
          await axios.delete(
            `http://localhost:3000/api/v1/report/skip-report/${report_id}`,
            { headers: { Authorization: `Bearer ${accessToken}` } }
          );
          setStatus(newStatus);
          setTimeout(() => navigate("/rpuserlist"), 5);
          break;
        case "Restricted":
        case "Banned":
          await axios.patch(
            `http://localhost:3000/api/v1/users/admin/${report?.reported_user_id}`,
            { status: newStatus },
            { headers: { Authorization: `Bearer ${accessToken}` } }
          );
          setStatus(newStatus);
          setTimeout(() => navigate("/rpuserlist"), 5);
          break;
        default:
          break;
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

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
        <h2 className={styles.title}>Report User Detail</h2>
        <div className={styles.reportDetailWrapper}>
          <div className={styles.reportDetailContainer}>
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
            </div>
            <div className={styles.userDetail}>
              <h4>Reported User Information</h4>
              <div className={styles.userInfoWrapper}>
                <div className={styles.avatarSection}>
                  <img
                    src={report.content.ava_img_path || avatar}
                    alt="Avatar"
                    className={styles.avatar}
                  />
                </div>
                <div className={styles.infoSection}>
                  <p><strong>User ID:</strong> {report.content.user_id}</p>
                  <p><strong>Username:</strong> {report.content.user_name}</p>
                  <p><strong>Email:</strong> {report.content.email}</p>
                  <p><strong>Status:</strong> {status}</p>
                  <p><strong>Role:</strong> {report.content.role}</p>
                </div>
              </div>
            </div>
            <div className={styles.statusActions}>
             
              <div className={styles.actionButtons}>
                <button className={styles.skip} onClick={() => handleAction("Skipped")}>
                  Skip
                </button>
                <button className={styles.restricted} onClick={() => handleAction("Restricted")}>
                  Restrict
                </button>
                <button className={styles.banned} onClick={() => handleAction("Banned")}>
                  Ban
                </button>
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={() => navigate("/rpuserlist")} // Quay lại danh sách
          className={styles.backButton}
        >
          Back to Reported Users
        </button>
      </div>
    </div>
  );
};

export default ReportUserDetail;