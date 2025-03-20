import React from "react";
import styles from "../../Pages/Dashboard/Comment/Comment.module.css";

interface ReportedComment {
  report_id: string;
  user_name: string;
  ava_img_path: string;
  report_title: string;
  date_reported: string;
}

interface ReportCmtDisplayProps {
  reports: ReportedComment[];
}

const ReportCmtDisplay: React.FC<ReportCmtDisplayProps> = ({ reports }) => {
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
              <tr key={report.report_id}>
                <td>{report.report_id}</td>
                <td>{report.user_name}</td>
                <td>
                  <img src={report.ava_img_path} alt="Avatar" className={styles.avatar} />
                </td>
                <td>{report.report_title}</td>
                <td>{new Date(report.date_reported).toLocaleDateString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className={styles.noReports}>No reported comments</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ReportCmtDisplay;
