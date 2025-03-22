import React from "react";
import styles from "../../Pages/Dashboard/Comment/Comment.module.css";

interface ReportedComment {
  user_id: string;
  user_name: string;
  ava_img_path: string;
  comment_id:string;
  comment_content:string;
  date_comment:string;
  replies_num:String;
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
            <th>User ID</th>
            <th>User Name</th>
            <th>Avatar</th>
            <th>Comment Content</th>
            <th>Date Reported</th>
          </tr>
        </thead>
        <tbody>
          {reports.length > 0 ? (
            reports.map((report) => (
              <tr key={report.user_id}>
                <td>{report.user_id}</td>
                <td>{report.user_name}</td>
                <td>
                  <img src={report.ava_img_path} alt="Avatar" className={styles.avatar} />
                </td>
                <td>{report.comment_content}</td>
                <td>{new Date(report.date_comment).toLocaleDateString()}</td>
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
