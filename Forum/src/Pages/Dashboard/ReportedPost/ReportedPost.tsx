import React, { useState } from "react";
import styles from "./ReportedPost.module.css";
import SidebarMenu from "../../../components/SideBar/SideBarMenu";
import { useNavigate } from "react-router-dom";
import ReportedDisplay from "../../../components/ReportedPost/ReportedDisplay"; 
import Header from "../../../components/Header/Header"; 

interface Report {
  reported_id: string;
  user_name: string;
  ava_img_path: string;
  report_title: string;
  date_reported: string;
}


const fakeReports: Report[] = [
  {
    reported_id: "1",
    user_name: "JohnDoe",
    ava_img_path: "https://i.pravatar.cc/100?img=1",
    report_title: "Spam in forum",
    date_reported: "2025-03-20",
  },
  {
    reported_id: "2",
    user_name: "AliceSmith",
    ava_img_path: "https://i.pravatar.cc/100?img=2",
    report_title: "Hate speech detected",
    date_reported: "2025-03-18",
  },
  {
    reported_id: "3",
    user_name: "DavidBrown",
    ava_img_path: "https://i.pravatar.cc/100?img=3",
    report_title: "Misinformation spreading",
    date_reported: "2025-03-15",
  },
];

const ReportedPost: React.FC = () => {
  const [reports, setReports] = useState<Report[]>(fakeReports);
  const [searchTerm, setSearchTerm] = useState("");

  
  const filteredReports = reports.filter(
    (report) =>
      report.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.report_title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.mainContainer}>
      <SidebarMenu />
      <div className={styles.container}>
        {/* Header được tái sử dụng */}
        <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} pendingCount={reports.length} />

        {/* Component hiển thị danh sách bài bị báo cáo */}
        <ReportedDisplay reports={filteredReports} />
      </div>
    </div>
  );
};

export default ReportedPost;
