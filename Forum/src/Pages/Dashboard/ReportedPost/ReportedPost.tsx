import React, { useState } from "react";
import styles from "./ReportedPost.module.css";
import SidebarMenu from "../../../components/SideBar/SideBarMenu";
import ReportedDisplay from "../../../components/ReportedPost/ReportedDisplay";
import Header from "../../../components/Header/Header";
import { useFetch } from "../../../hooks/useFetch";

// Interface cho báo cáo
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

const ReportedPost: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Giả định accessToken được lưu trong localStorage
  const accessToken = localStorage.getItem("accessToken") || "your-token-here";

  // Fetch danh sách báo cáo từ API
  const { data, loading, error, refetch } = useFetch<ApiResponse>(
    "http://localhost:3000/api/v1/report/admin/Post",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  // Lấy danh sách báo cáo từ dữ liệu API, mặc định là mảng rỗng nếu chưa có dữ liệu
  const reports = data?.data || [];

  // Lọc báo cáo dựa trên searchTerm, kiểm tra an toàn trước khi gọi toLowerCase
  const filteredReports = reports.filter((report) => {
    const userName = report.reported_user_name || "";
    const reportTitle = report.report_title || "";
    return (
      userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reportTitle.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className={styles.mainContainer}>
      <SidebarMenu />
      <div className={styles.container}>
        <Header
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          pendingCount={reports.length}
        />
        {loading && <p>Loading reports...</p>}
        {error && <p className={styles.error}>Error: {error}</p>}
        {!loading && !error && <ReportedDisplay reports={filteredReports} />}
      </div>
    </div>
  );
};

export default ReportedPost;