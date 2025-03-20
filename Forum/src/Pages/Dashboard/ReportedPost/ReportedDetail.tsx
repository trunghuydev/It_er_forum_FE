import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./ReportedDetail.module.css";
import SidebarMenu from "../../../components/SideBar/SideBarMenu";

// Fake danh sách báo cáo
const fakeReports = [
  {
    report_id: "1",
    user_name: "JohnDoe",
    ava_img_path: "https://i.pravatar.cc/100?img=1",
    report_title: "Spam in forum",
    date_reported: "2025-03-20",
    content: "This post contains spam content that violates forum rules.",
  },
  {
    report_id: "2",
    user_name: "AliceSmith",
    ava_img_path: "https://i.pravatar.cc/100?img=2",
    report_title: "Hate speech detected",
    date_reported: "2025-03-18",
    content: "This post contains offensive language and hate speech.",
  },
  {
    report_id: "3",
    user_name: "DavidBrown",
    ava_img_path: "https://i.pravatar.cc/100?img=3",
    report_title: "Misinformation spreading",
    date_reported: "2025-03-15",
    content: "The post contains misleading information about a public event.",
  },
];

const ReportDetail: React.FC = () => {
  const { report_id } = useParams<{ report_id: string }>();
  const navigate = useNavigate();
  const report = fakeReports.find((r) => r.report_id === report_id);

  const [status, setStatus] = useState("Pending");

  if (!report) {
    return (
      <div className={styles.mainContainer}>
        <SidebarMenu />
        <div className={styles.container}>
          <h2>Report Not Found</h2>
        </div>
      </div>
    );
  }

 
  const handleAction = (newStatus: "Skipped" | "Restricted" | "Banned") => {
    setStatus(newStatus);
    setTimeout(() => navigate("/reportedpost"), 5); // 
  };

  return (
    <div className={styles.mainContainer}>
      <SidebarMenu />
      <div className={styles.container}>
        <div className={styles.reportDetailWrapper}>
          <div className={styles.reportDetailContainer}>
            {/* Thông tin User */}
            <div className={styles.userInfo}>
              <img src={report.ava_img_path} alt="User Avatar" className={styles.avatar} />
              <div>
                <strong>{report.user_name}</strong>
                <p className={styles.timestamp}>{new Date(report.date_reported).toLocaleString()}</p>
              </div>
            </div>

            {/* Tiêu đề bài báo cáo */}
            <h2 className={styles.reportTitle}>{report.report_title}</h2>

            {/* Nội dung báo cáo */}
            <div className={styles.reportContent}>
              <p>{report.content}</p>
            </div>

            {/* Trạng thái  */}
            <div className={styles.statusActions}>
              <p>
                Current Status:{" "}
                <span className={styles[`status-${status.toLowerCase()}`]}>
                  {status}
                </span>
              </p>
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
      </div>
    </div>
  );
};

export default ReportDetail;
