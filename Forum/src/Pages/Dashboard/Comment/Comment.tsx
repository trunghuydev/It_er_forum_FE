import React, { useState } from "react";
import styles from "./Comment.module.css";
import SidebarMenu from "../../../components/SideBar/SideBarMenu";
import Header from "../../../components/Header/Header";
import ReportCmtDisplay from "../../../components/Comment/ReportCmtDislpay";
import { useFetch } from "../../../hooks/useFetch";


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


interface ApiResponse {
  is_success: boolean;
  status_code: number;
  message: string;
  data: ReportedComment[];
  timestamp: number;
}

const Comment: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");


  const { data, loading, error, refetch } = useFetch<ApiResponse>(
    "http://localhost:3000/api/v1/report/admin/Comment"
  );


  const reports = data?.data || [];


  const filteredReports = reports.filter((report) => {
    const userName = report.reported_user_name || "";
    const commentContent = report.comment_content || "";
    return (
      userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      commentContent.toLowerCase().includes(searchTerm.toLowerCase())
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

        {/* Trạng thái fetch */}
        {loading && <p>Loading comments...</p>}
        {error && <p className={styles.error}>Error: {error}</p>}

        {/* Hiển thị danh sách bình luận bị báo cáo */}
        {!loading && !error && <ReportCmtDisplay reports={filteredReports} />}
      </div>
    </div>
  );
};

export default Comment;