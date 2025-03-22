import React, { useState } from "react";
import styles from "./Comment.module.css";
import SidebarMenu from "../../../components/SideBar/SideBarMenu";
import Header from "../../../components/Header/Header";
import ReportCmtDisplay from "../../../components/Comment/ReportCmtDislpay"; 

const fakeReports = [
  { 
    user_id: "1",
    user_name: "cho thanh",
    ava_img_path: "https://i.pravatar.cc/100?img=1",
    comment_id:"124",
    comment_content:"Spam Comment",
    date_comment:"2025-03-20" ,
    replies_num: "12",
  },
  { 
    user_id: "2",
    user_name: " thanhcho",
    ava_img_path: "https://i.pravatar.cc/100?img=1",
    comment_id:"125",
    comment_content:"Spam Comment",
    date_comment:"2025-03-20" ,
    replies_num: "13",
  },
  { 
    user_id: "3",
    user_name: "cho thanh",
    ava_img_path: "https://i.pravatar.cc/100?img=1",
    comment_id:"125",
    comment_content:"Spam Comment",
    date_comment:"2025-03-20" ,
    replies_num: "14",
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

       
        <ReportCmtDisplay reports={reports} />
      </div>
    </div>
  );
};

export default Comment;
