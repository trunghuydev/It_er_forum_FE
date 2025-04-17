import React, { useState } from "react";
import styles from "./ReportedPost.module.css";
import SidebarMenu from "../../../components/SideBar/SideBarMenu";
import Header from "../../../components/Header/Header";
import { useFetch } from "../../../hooks/useFetch";
import { useReprotPost } from "@/hooks/ReportPost/useReportPost";
import { TReportPostResponse } from "@/constants";


const ReportedPost: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const { data, isLoading, isError } = useReprotPost();
  const reports: TReportPostResponse[] = data?.data || [];




  return (
    <div className={styles.mainContainer}>
      <SidebarMenu />
      <div className={styles.container}>
        <Header
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          pendingCount={reports.length}
        />
        {isLoading && <p>Loading reports...</p>}
        {isError && <p className={styles.error}>Error: {isError}</p>}
        <div className={styles.reportedDisplayContainer}>
          <table className={styles.reportedTable}>
            <thead>
              <tr>
                <th>User ID</th>
                <th>User Name</th>
                <th>Avatar</th>
                <th>Report Title</th>
              </tr>
            </thead>
            <tbody>
              {reports.length > 0 ? (
                reports.map((report) => (
                  <tr
                    key={report.report_id}
                    onClick={() => navigate(`/report/${report.report_id}`)} // Điều hướng đến ReportDetail
                    style={{ cursor: "pointer" }}
                  >
                    <td>{report.reported_user_id}</td>
                    <td>{report.reported_user_name || "Unknown"}</td>
                    <td>
                      <img
                        src={report.ava_img_path || "https://i.pravatar.cc/100"}
                        alt="Avatar"
                        className={styles.avatar}
                      />
                    </td>
                    <td>{report.report_title || "N/A"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className={styles.noReports}>
                    No reported posts
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

export default ReportedPost;