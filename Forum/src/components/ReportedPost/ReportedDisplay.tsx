
import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../Pages/Dashboard/ReportedPost/ReportedPost.module.css";

interface Report {
  reported_id: string;
  user_name: string;
  ava_img_path: string;
  report_title: string;
  date_reported: string;
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
            <th>Report ID</th>
            <th>User</th>
            <th>Avatar</th>
            <th>Report Title</th>
            <th>Date Reported</th>
          </tr>
        </thead>
        <tbody>
          {reports.length > 0 ? (
            reports.map((report) => (
              <tr key={report.reported_id}>
                <td>{report.reported_id}</td>
                <td>{report.user_name}</td>
                <td>
                  <img src={report.ava_img_path} alt="Avatar" className={styles.avatar} />
                </td>
              
                <td
                  className={styles.titleCell}
                  onClick={() => navigate(`/report-detail/${report.reported_id}`)}
                >
                  {report.report_title}
                </td>
                <td>{new Date(report.date_reported).toLocaleDateString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className={styles.noReports}>No reports available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ReportedDisplay;
