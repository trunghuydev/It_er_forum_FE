import React from "react";
import styles from "../../Pages/Dashboard/ReportedPost/ReportedPost.module.css";
import { useNavigate } from "react-router-dom";

// Interface cho báo cáo
interface Report {
  report_id: string;
  reported_user_id: string;
  reported_user_name: string;
  report_title: string;
  ava_img_path: string | null;
}

interface ReportedDisplayProps {
  reports: Report[];
}

const ReportedDisplay: React.FC<ReportedDisplayProps> = ({ reports }) => {
  const navigate = useNavigate();

  return (

  );
};

export default ReportedDisplay;