import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ReportUser.module.css";
import SidebarMenu from "../../../components/SideBar/SideBarMenu";
import { useFetch } from "../../../hooks/useFetch";
import RpUserListDisplay from "../../../components/RpUser/RpUserDisplay";

// Định nghĩa interface cho Report
interface Report {
  report_id: string;
  reported_user_id: string;
  reported_user_name: string;
  report_title: string;
  ava_img_path: string | null;
}

interface ApiResponse {
  is_success: boolean;
  status_code: number;
  message: string;
  data: Report[];
  timestamp: number;
}

const RpUserList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Giả định accessToken được lưu trong localStorage
  const accessToken = localStorage.getItem("accessToken") || "your-token-here";

  // Sử dụng useFetch để lấy danh sách báo cáo từ API
  const { data, error, loading, refetch } = useFetch<ApiResponse>(
    "http://localhost:3000/api/v1/report/admin/User",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  // Lấy danh sách reports từ dữ liệu API, mặc định là mảng rỗng nếu chưa có dữ liệu
  const reports = data?.data || [];

  // Lọc danh sách báo cáo dựa trên searchTerm, kiểm tra an toàn
  const filteredReports = reports.filter((report) => {
    const userName = report.reported_user_name || "";
    return userName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className={styles.mainContainer}>
      <SidebarMenu />
      <div className={styles.content}>
        <h2 className={styles.title}>Reported Users</h2>
        <div className={styles.controls}>
          <button onClick={refetch} className={styles.refreshButton}>
            Refresh
          </button>
          <input
            type="text"
            placeholder="Search reported users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        {loading && <p>Loading data...</p>}
        {error && <p className={styles.error}>Error: {error}</p>}

        {!loading && !error && <RpUserListDisplay filteredReports={filteredReports} />}

        {/* Nút "Quay lại" */}
        <button
          onClick={() => navigate("/home")}
          className={styles.backButton}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default RpUserList;