import React from "react";
import { useNavigate } from "react-router-dom"; // Thêm useNavigate
import styles from "../../Pages/Dashboard/Comment/Comment.module.css";
import avatar from "../../Image/avata.png"; // Đồng bộ ảnh mặc định

interface ReportedComment {
  report_id: string;
  reported_user_id: string;
  reported_user_name: string;
  report_title: string;
  ava_img_path: string | null;
  comment_id?: string;
  comment_content?: string;
  date_comment?: string;
}

interface ReportCmtDisplayProps {
  reports: ReportedComment[];
}

const ReportCmtDisplay: React.FC<ReportCmtDisplayProps> = ({ reports }) => {
  const navigate = useNavigate(); // Thêm useNavigate để điều hướng

  return (
    <div className={styles.reportedDisplayContainer}>
      <table className={styles.reportedTable}>
        <thead>
          <tr>
            <th>No.</th> {/* Thêm cột No. */}
            <th>Avatar</th>
            <th>User ID</th>
            <th>Reported User Name</th> {/* Đổi tên cột */}
            <th>Comment Content</th> {/* Thêm cột Comment Content */}
            <th>Report Title</th>
            <th>Date Comment</th> {/* Đổi tên cột */}
          </tr>
        </thead>
        <tbody>
          {reports.length > 0 ? (
            reports.map((report, index) => (
              <tr key={report.report_id}>
                <td>{index + 1}</td> {/* Hiển thị số thứ tự */}
                <td>
                  <img
                    src={report.ava_img_path || avatar} // Đồng bộ ảnh mặc định
                    alt="Avatar"
                    className={styles.avatar}
                  />
                </td>
                <td
                   onClick={() => navigate(`/report-comment/${report.report_id}`)} // Điều hướng đến UserDetail
                  style={{ cursor: "pointer", color: "#007bff" }}
                >
                  {report.reported_user_id}
                </td>
                <td>{report.reported_user_name || "Unknown"}</td>
                <td>{report.comment_content || "N/A"}</td> {/* Hiển thị nội dung bình luận */}
                <td
                  onClick={() => navigate(`/report-comment/${report.report_id}`)} // Điều hướng đến ReportCommentDetail
                  style={{ cursor: "pointer", color: "#007bff" }}
                >
                  {report.report_title || "N/A"}
                </td>
                <td>
                  {report.date_comment
                    ? new Date(report.date_comment).toLocaleDateString()
                    : "N/A"}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className={styles.noReports}>
                No reported comments
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ReportCmtDisplay;