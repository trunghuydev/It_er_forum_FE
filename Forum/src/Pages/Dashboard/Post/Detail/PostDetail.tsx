import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./PostDetail.module.css";
import SidebarMenu from "../../../../components/SideBar/SideBarMenu";
import axios from "axios";
import ImageSlider from "../../../../components/ImageSlide/ImageSlide";
import { usePostDetail } from "../../../../hooks/Post/usePostDetail";




const PostDetail: React.FC = () => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken") || "your-token-here";
  const { post_id } = useParams<{ post_id: string }>();


  const { data, isLoading, isError, refetch } = usePostDetail(post_id!);

  const postDetail = data?.data
  console.log("POST ID:", post_id);
  console.log("usePostDetail DATA:", data);




  const [status, setStatus] = useState("Pending");
  const [isUpdating, setIsUpdating] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);





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

  if (isLoading) {
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

  if (isError || !postDetail) {
    return (
      <div className={styles.layoutContainer}>
        <SidebarMenu />
        <div className={styles.contentContainer}>
          <div className={styles.postDetailWrapper}>
            <div className={styles.postDetailContainer}>
              <h2>{isError ? `Error: ${isError}` : "Post Not Found"}</h2>
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
      {postDetail && <div className={styles.contentContainer}>
        <div className={styles.postDetailWrapper}>
          <div className={styles.postDetailContainer}>
            <div className={styles.userInfo}>
              <img
                src={postDetail?.ava_img_path || "https://i.pravatar.cc/100"}
                alt="User Avatar"
                className={styles.avatar}
              />
              <div>
                <strong>{postDetail.user_name}</strong>
                <p className={styles.timestamp}>
                  {new Date(postDetail.date_updated).toLocaleDateString()}
                </p>
              </div>
            </div>
            <h2 className={styles.postTitle}>{postDetail.post_title}</h2>
            <div className={styles.postContent}>
              <ImageSlider images={postDetail.img_url} />
              <p>{postDetail.post_content}</p>
              {postDetail.tags && postDetail.tags.length > 0 && (
                <div>
                  <strong>Tags: </strong>
                  {postDetail.tags.join(", ")}
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
                  onClick={async () => await updateStatus("Approved")}
                  disabled={isUpdating}
                >
                  {isUpdating ? "Updating..." : "Approved"}
                </button>
                <button
                  className={styles.banned}
                  onClick={async () => await updateStatus("Rejected")}
                  disabled={isUpdating}
                >
                  {isUpdating ? "Updating..." : "Rejected"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>}

    </>
  );
};

export default PostDetail;