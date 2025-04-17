import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./ReportedDetail.module.css";
import SidebarMenu from "../../../components/SideBar/SideBarMenu";
import { useFetch } from "../../../hooks/useFetch";
import axios from "axios";
import ImageSlider from "../../../components/ImageSlide/ImageSlide";

// Interface cho nội dung bài viết bị báo cáo
interface ReportContent {
  post_id: string;
  post_title: string;
  post_content: string;
  img_url: string[];
  date_updated: string;
}

// Interface cho báo cáo
interface Report {
  reported_user_id: string;
  reported_id: string;
  reported_user_name: string;
  report_title: string;
  report_body: string;
  subject: string;
  date_reported: string;
  content: ReportContent;
  status?: string;
}

// Interface cho response từ API
interface ApiResponse {
  is_success: boolean;
  status_code: number;
  message: string;
  data: Report;
  timestamp: number;
}

const ReportDetail: React.FC = () => {
  const { report_id } = useParams<{ report_id: string }>();

  const navigate = useNavigate();

  // Fetch dữ liệu từ API
  const { data, loading, error, refetch } = useFetch<ApiResponse>(
    `http://localhost:3000/api/v1/report/admin/detail/Post/${report_id}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken") || "your-token-here"}`,
      },
    }
  );

  const report = data?.data;
  const [status, setStatus] = useState<string>(report?.status || "Pending");




  // update status leen BE 
  const handleAction = async (newStatus: "Skipped" | "Restricted" | "Banned") => {
    const accessToken = localStorage.getItem("accessToken") || "your-token-here";
    try {
      
      switch (newStatus) {
        case "Skipped":
          await axios.delete(
            `http://localhost:3000/api/v1/report/skip-report/${report_id}`,
            { headers: { Authorization: `Bearer ${accessToken}` } }
          );  setStatus(newStatus);
          setTimeout(() => navigate("/reportedpost"), 5);

          break;
        case "Restricted" || "Banned":
          console.log(report);

          // const accessToken = localStorage.getItem("accessToken") || "your-token-here";
          // console.log("reported user id :", report?.reported_user_id);
          // console.log("reported id :", report_id);


          await axios.patch(
            `http://localhost:3000/api/v1/users/admin/${report?.reported_user_id}`,
            { status: newStatus },
            { headers: { Authorization: `Bearer ${accessToken}` } }
          );
          setStatus(newStatus);
          setTimeout(() => navigate("/reportedpost"), 5);

        default:
          break;
          case  "Banned":
            console.log(report);

            await axios.patch(
              `http://localhost:3000/api/v1/users/admin/${report?.reported_user_id}`,
              { status: newStatus },
              { headers: { Authorization: `Bearer ${accessToken}` } }
            );
            setStatus(newStatus);
            setTimeout(() => navigate("/reportedpost"), 5);
  
          
            break;
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  if (loading) {
    return (
      <div className={styles.mainContainer}>
        <SidebarMenu />
        <div className={styles.container}>
          <p>Loading report details...</p>
        </div>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className={styles.mainContainer}>
        <SidebarMenu />
        <div className={styles.container}>
          <h2>{error ? `Error: ${error}` : "Report Not Found"}</h2>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.mainContainer}>
      <SidebarMenu />
      <div className={styles.container}>
        <div className={styles.reportDetailWrapper}>
          <div className={styles.reportDetailContainer}>
            <div className={styles.userInfo}>
              <strong>Reported by User ID:</strong> {report.reported_user_id}
            </div>
            <h2 className={styles.reportTitle}>{report.report_title}</h2>
            <div className={styles.reportContent}>
              <p><strong>Report Details:</strong> {report.report_body}</p>
              <p>
                <strong>Reported Date:</strong>{" "}
                {new Date(report.date_reported).toLocaleDateString()}
              </p>
            </div>
            <div className={styles.postDetail}>
              <h3>Reported Post</h3>
              <h4 className={styles.postTitle}>{report.content.post_title}</h4>
              <p className={styles.postContent}>{report.content.post_content}</p>
              <ImageSlider images={report.content.img_url} /> {/* Sử dụng ImageSlider */}
              <p>
                <strong>Last Updated:</strong>{" "}
                {new Date(report.content.date_updated).toLocaleDateString()}
              </p>
            </div>
            <div className={styles.statusActions}>
              <p>
                Current Status:{" "}
                <span className={styles[`status-${status.toLowerCase()}`]}>
                  {status}
                </span>
              </p>
              <div className={styles.actionButtons}>
                <button className={styles.skip} onClick={() => handleAction("Skipped")}>
                  Skip
                </button>
                <button className={styles.restricted} onClick={() => handleAction("Restricted")}>
                  Restrict
                </button>
                <button className={styles.banned} onClick={() => handleAction("Banned")}>
                  Ban
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportDetail;