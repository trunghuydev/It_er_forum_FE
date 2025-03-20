import React, { useState } from "react";
import styles from "./Comment.module.css";
import SidebarMenu from "../../../components/SideBar/SideBarMenu";
import Header from "../../../components/Header/Header";
import ReportCmtDisplay from "../../../components/Comment/ReportCmtDislpay"; 

const fakeReports = [
  { 
    report_id: "1", 
    user_name: "JohnDoe", 
    ava_img_path: "https://i.pravatar.cc/100?img=1", 
    report_title: "Spam Comment", 
    date_reported: "2025-03-20" 
  },
  { 
    report_id: "2", 
    user_name: "AliceSmith", 
    ava_img_path: "https://i.pravatar.cc/100?img=2", 
    report_title: "Offensive Language", 
    date_reported: "2025-03-19" 
  },
  { 
    report_id: "3", 
    user_name: "DavidBrown", 
    ava_img_path: "https://i.pravatar.cc/100?img=3", 
    report_title: "False Information", 
    date_reported: "2025-03-18" 
  },
];

const Comment: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [reports, setReports] = useState(fakeReports);

  return (
    <div className={styles.mainContainer}>
      <SidebarMenu />
      <div className={styles.container}>
        <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} pendingCount={reports.length} />

        {/* Hiển thị danh sách comment bị báo cáo */}
        <ReportCmtDisplay reports={reports} />
      </div>
    </div>
  );
};

export default Comment;
