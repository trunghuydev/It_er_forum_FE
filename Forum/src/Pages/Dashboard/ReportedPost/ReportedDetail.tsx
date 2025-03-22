
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./ReportedDetail.module.css";
import SidebarMenu from "../../../components/SideBar/SideBarMenu";

// Fake danh sách báo cáo (theo format mới)
const fakeReports = [
  {
    reported_user_id: "101",
    reported_id: "1",
    report_title: "Spam in forum",
    report_body: "This post contains spam content that violates forum rules.",
    subject: "Post",
    date_reported: "2025-03-20",
    content: {
      post_id: "P001",
      post_title: "Best ways to earn money online",
      post_content: "Check out this website for quick money-making schemes!",
      img_url: "https://via.placeholder.com/600x400",
      date_updated: "2025-03-19",
    },
  },
  {
    reported_user_id: "102",
    reported_id: "2",
    report_title: "Hate speech detected",
    report_body: "This post contains offensive language and hate speech.",
    subject: "Post",
    date_reported: "2025-03-18",
    content: {
      post_id: "P002",
      post_title: "Political discussions",
      post_content: "Some offensive remarks about certain groups...",
      img_url: "https://via.placeholder.com/600x400",
      date_updated: "2025-03-17",
    },
  },
];

const ReportDetail: React.FC = () => {
  const { reported_id } = useParams<{ reported_id: string }>();
  const navigate = useNavigate();
  const report = fakeReports.find((r) => r.reported_id === reported_id);

  const [status, setStatus] = useState("Pending");

  if (!report) {
    return (
      <div className={styles.mainContainer}>
        <SidebarMenu />
        <div className={styles.container}>
          <h2>Report Not Found</h2>
        </div>
      </div>
    );
  }

  // Hàm cập nhật trạng thái và quay về danh sách báo cáo
  const handleAction = (newStatus: "Skipped" | "Restricted" | "Banned") => {
    setStatus(newStatus);
    setTimeout(() => navigate("/reportedpost"), 5);
  };

  return (
    <div className={styles.mainContainer}>
      <SidebarMenu />
      <div className={styles.container}>
        <div className={styles.reportDetailWrapper}>
          <div className={styles.reportDetailContainer}>
            {/* Thông tin người báo cáo */}
            <div className={styles.userInfo}>
              <strong>Reported by User ID:</strong> {report.reported_user_id}
            </div>

            {/* Tiêu đề báo cáo */}
            <h2 className={styles.reportTitle}>{report.report_title}</h2>

            {/* Nội dung báo cáo */}
            <div className={styles.reportContent}>
              <p><strong>Report Details:</strong> {report.report_body}</p>
              <p><strong>Reported Date:</strong> {report.date_reported}</p>
            </div>

            {/* Nội dung bài viết bị báo cáo */}
            <div className={styles.postDetail}>
              <h3>Reported Post</h3>
              <h4 className={styles.postTitle}>{report.content.post_title}</h4>
              <p className={styles.postContent}>{report.content.post_content}</p>

              {/* Hình ảnh bài viết (nếu có) */}
              {report.content.img_url && (
                <img src={report.content.img_url} alt="Reported Post" className={styles.postImage} />
              )}

              <p><strong>Last Updated:</strong> {report.content.date_updated}</p>
            </div>

            {/* Trạng thái & Nút hành động */}
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






























// import React, { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import styles from "./ReportedDetail.module.css";
// import SidebarMenu from "../../../components/SideBar/SideBarMenu";

// // Fake danh sách báo cáo
// const fakeReports = [
//   {
//     report_id: "1",
//     user_name: "JohnDoe",
//     ava_img_path: "https://i.pravatar.cc/100?img=1",
//     report_title: "Spam in forum",
//     date_reported: "2025-03-20",
//     content: "This post contains spam content that violates forum rules.",
//   },
//   {
//     report_id: "2",
//     user_name: "AliceSmith",
//     ava_img_path: "https://i.pravatar.cc/100?img=2",
//     report_title: "Hate speech detected",
//     date_reported: "2025-03-18",
//     content: "This post contains offensive language and hate speech.",
//   },
//   {
//     report_id: "3",
//     user_name: "DavidBrown",
//     ava_img_path: "https://i.pravatar.cc/100?img=3",
//     report_title: "Misinformation spreading",
//     date_reported: "2025-03-15",
//     content: "The post contains misleading information about a public event.",
//   },
// ];

// const ReportDetail: React.FC = () => {
//   const { report_id } = useParams<{ report_id: string }>();
//   const navigate = useNavigate();
//   const report = fakeReports.find((r) => r.report_id === report_id);

//   const [status, setStatus] = useState("Pending");

//   if (!report) {
//     return (
//       <div className={styles.mainContainer}>
//         <SidebarMenu />
//         <div className={styles.container}>
//           <h2>Report Not Found</h2>
//         </div>
//       </div>
//     );
//   }


//   const handleAction = (newStatus: "Skipped" | "Restricted" | "Banned") => {
//     setStatus(newStatus);
//     setTimeout(() => navigate("/reportedpost"), 5); // 
//   };

//   return (
//     <div className={styles.mainContainer}>
//       <SidebarMenu />
//       <div className={styles.container}>
//         <div className={styles.reportDetailWrapper}>
//           <div className={styles.reportDetailContainer}>
//             {/* info user */}
//             <div className={styles.userInfo}>
//               <img src={report.ava_img_path} alt="User Avatar" className={styles.avatar} />
//               <div className={styles.userName}>
//                 <strong>{report.user_name}</strong>
//                 <p className={styles.timestamp}>{new Date(report.date_reported).toLocaleString()}</p>
//               </div>
//             </div>

//             {/* Title */}
//             <h2 className={styles.reportTitle}>{report.report_title}</h2>

//             {/* content */}
//             <div className={styles.reportContent}>
//               <p>{report.content}</p>
//             </div>

//             {/*Status  */}
//             <div className={styles.statusActions}>
//               <p>
//                 Current Status:{" "}
//                 <span className={styles[`status-${status.toLowerCase()}`]}>
//                   {status}
//                 </span>
//               </p>
//               <div className={styles.actionButtons}>
//                 <button className={styles.skip} onClick={() => handleAction("Skipped")}>
//                   Skip
//                 </button>
//                 <button className={styles.restricted} onClick={() => handleAction("Restricted")}>
//                   Restrict
//                 </button>
//                 <button className={styles.banned} onClick={() => handleAction("Banned")}>
//                   Ban
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ReportDetail;
