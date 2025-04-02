import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./PostDetail.module.css";
import SidebarMenu from "../../../components/SideBar/SideBarMenu";
import { useFetch } from "../../../hooks/useFetch";
import axios from "axios";
import ImageSlider from "../../../components/ImageSlide/ImageSlide";

// Interface cho chi tiết bài đăng
interface PostDetail {
  post_id: string;
  post_title: string;
  user_name: string;
  user_id: string;
  ava_img_path: string | null;
  post_content: string;
  status: "Pending" | "Approved" | "Rejected";
  img_url: string[];
  date_updated: string;
  tags: string[];
}

interface ApiResponse {
  is_success: boolean;
  status_code: number;
  message: string;
  data: PostDetail;
  timestamp: number;
}

const PostDetail: React.FC = () => {
  const { id: post_id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const accessToken = localStorage.getItem("accessToken") || "your-token-here";

  const { data, loading, error, refetch } = useFetch<ApiResponse>(
    `http://localhost:3000/api/v1/posts/admin/dashboard/${post_id}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const post = data?.data;

  const [status, setStatus] = useState(post?.status || "Pending");
  const [isUpdating, setIsUpdating] = useState(false); 
  const [errorMessage, setErrorMessage] = useState<string | null>(null); 

  useEffect(() => {
    if (post?.status) {
      setStatus(post.status);
    }
  }, [post]);

  const updateStatus = async (status: "Approved" | "Rejected") => {
    // Kiểm tra dữ liệu trước khi gửi request
    if (!post_id || !accessToken || accessToken === "your-token-here") {
      setErrorMessage("Invalid post ID or access token.");
      return;
    }

    setIsUpdating(true); 
    setErrorMessage(null); 

    try {
      console.log(" da vao");
      
      await axios.patch(
        `http://localhost:3000/api/v1/posts/admin/dashboard/${post_id}`,
        { status: status }, 
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log("da truyen vao body")
      setStatus(status);
      refetch(); 
     console.log("sau khi refresh thanh cong");
     

    } catch (err: any) {
      const errorMsg =
        err.response?.data?.message || "Failed to update status. Please try again.";
      setErrorMessage(errorMsg);
      console.error("Failed to update status:", err);
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.layoutContainer}>
        <SidebarMenu />
        <div className={styles.contentContainer}>
          <div className={styles.postDetailWrapper}>
            <div className={styles.postDetailContainer}>
              <p>Loading post details...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className={styles.layoutContainer}>
        <SidebarMenu />
        <div className={styles.contentContainer}>
          <div className={styles.postDetailWrapper}>
            <div className={styles.postDetailContainer}>
              <h2>{error ? `Error: ${error}` : "Post Not Found"}</h2>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={styles.layoutContainer}>
        <SidebarMenu />
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.postDetailWrapper}>
          <div className={styles.postDetailContainer}>
            <div className={styles.userInfo}>
              <img
                src={post.ava_img_path || "https://i.pravatar.cc/100"}
                alt="User Avatar"
                className={styles.avatar}
              />
              <div>
                <strong>{post.user_name}</strong>
                <p className={styles.timestamp}>
                  {new Date(post.date_updated).toLocaleDateString()}
                </p>
              </div>
            </div>
            <h2 className={styles.postTitle}>{post.post_title}</h2>
            <div className={styles.postContent}>
              <ImageSlider images={post.img_url} />
              <p>{post.post_content}</p>
              {post.tags && post.tags.length > 0 && (
                <div>
                  <strong>Tags: </strong>
                  {post.tags.join(", ")}
                </div>
              )}
            </div>
            <div className={styles.statusActions}>
              <p>
                Status:{" "}
                <span className={styles[`status-${status.toLowerCase()}`]}>
                  {status}
                </span>
              </p>
              {errorMessage && (
                <p className={styles.errorMessage}>{errorMessage}</p>
              )}
              <div className={styles.actionButtons}>
                <button
                  className={styles.approved}
                  onClick={async() =>await updateStatus("Approved")}
                  disabled={isUpdating}
                >
                  {isUpdating ? "Updating..." : "Approved"}
                </button>
                <button
                  className={styles.banned}
                  onClick={async() =>await updateStatus("Rejected")}
                  disabled={isUpdating}
                >
                  {isUpdating ? "Updating..." : "Rejected"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostDetail;