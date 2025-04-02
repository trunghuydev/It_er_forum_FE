import React from "react";
import styles from "../../Pages/Dashboard/ReportedPost/ReportedPost.module.css";
import { useNavigate } from "react-router-dom";

// Interface cho báo cáo
interface Report {
  report_id: string;
  reported_user_id: string;
  reported_user_name: string;
  report_title: string;
  ava_img_path: string | null;
}

interface ReportedDisplayProps {
  reports: Report[];
}

const ReportedDisplay: React.FC<ReportedDisplayProps> = ({ reports }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.reportedDisplayContainer}>
      <table className={styles.reportedTable}>
        <thead>
          <tr>
            <th>User ID</th>
            <th>User Name</th>
            <th>Avatar</th>
            <th>Report Title</th>
          </tr>
        </thead>
        <tbody>
          {reports.length > 0 ? (
            reports.map((report) => (
              <tr
                key={report.report_id}
                onClick={() => navigate(`/report/${report.report_id}`)} // Điều hướng đến ReportDetail
                style={{ cursor: "pointer" }}
              >
                <td>{report.reported_user_id}</td>
                <td>{report.reported_user_name || "Unknown"}</td>
                <td>
                  <img
                    src={report.ava_img_path || "https://i.pravatar.cc/100"}
                    alt="Avatar"
                    className={styles.avatar}
                  />
                </td>
                <td>{report.report_title || "N/A"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className={styles.noReports}>
                No reported posts
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ReportedDisplay;