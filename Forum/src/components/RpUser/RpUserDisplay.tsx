import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../Pages/Dashboard/ReportUser/ReportUser.module.css"; 
import avatar from "../../Image/avata.png";

// Định nghĩa interface cho Report
interface Report {
  report_id: string;
  reported_user_id: string;
  reported_user_name: string;
  report_title: string;
  ava_img_path: string | null;
}

// Định nghĩa props cho component
interface RpUserListDisplayProps {
  filteredReports: Report[];
}

const RpUserListDisplay: React.FC<RpUserListDisplayProps> = ({ filteredReports }) => {
  const navigate = useNavigate();

  return (
    <table className={styles.userTable}>
      <thead>
        <tr>
          <th>No.</th>
          <th>Avatar</th>
          <th>User ID</th>
          <th>Reported User Name</th>
          <th>Report Title</th>
        </tr>
      </thead>
      <tbody>
        {filteredReports.length > 0 ? (
          filteredReports.map((report, index) => (
            <tr key={report.report_id}>
              <td>{index + 1}</td>
              <td>
                <img
                  src={report.ava_img_path || avatar}
                  alt="Avatar"
                  className={styles.avatar}
                />
              </td>
              <td
                 onClick={() => navigate(`/report-user/${report.report_id}`)} // Điều hướng đến UserDetail
                style={{ cursor: "pointer", color: "#007bff" }}
              >
                {report.reported_user_id}
              </td>
              <td>{report.reported_user_name || "N/A"}</td>
              <td
                onClick={() => navigate(`/report-user/${report.report_id}`)} // Điều hướng đến ReportUserDetail
                style={{ cursor: "pointer", color: "#007bff" }}
              >
                {report.report_title || "N/A"}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={5} className={styles.noData}>
              No reported users available
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default RpUserListDisplay;