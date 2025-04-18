import React, { useState } from "react";
import styles from "./Comment.module.css";
import SidebarMenu from "../../../components/SideBar/SideBarMenu";
import Header from "../../../components/Header/Header";
import avatar from "@/Image/avata.png";
import { TCommentResponse } from "@/constants/TComment";
import { useComment } from "@/hooks/Comment/useComment";
import { useNavigate } from "react-router-dom";



const Comment: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate =useNavigate();
  const { data, isLoading, isError } = useComment();
  const comment :TCommentResponse[]=data?.data||[];

 




  const filteredReports = comment.filter((report) => {
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
          pendingCount={comment.length}
        />

        {/* Trạng thái fetch */}
        {isLoading && <p>Loading comments...</p>}
        {isError && <p className={styles.error}>Error: {isError}</p>}

        {/* Hiển thị danh sách bình luận bị báo cáo */}
        <div className={styles.reportedDisplayContainer}>
      <table className={styles.reportedTable}>
        <thead>
          <tr>
            <th>No.</th> 
            <th>Avatar</th>
            <th>User ID</th>
            <th>Reported User Name</th> 
            <th>Comment Content</th> 
            <th>Report Title</th>
            <th>Date Comment</th> 
          </tr>
        </thead>
        <tbody>
          {comment.length > 0 ? (
            comment.map((report, index) => (
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
                   onClick={() => navigate(`/report-comment/${report.report_id}`)} 
                  style={{ cursor: "pointer", color: "#007bff" }}
                >
                  {report.reported_user_id}
                </td>
                <td>{report.reported_user_name || "Unknown"}</td>
                <td>{report.comment_content || "N/A"}</td> 
                <td
                  onClick={() => navigate(`/report-comment/${report.report_id}`)} 
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
      </div>
    </div>
  );
};

export default Comment;