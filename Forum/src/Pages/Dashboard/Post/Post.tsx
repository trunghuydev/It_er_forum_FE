  import React, { useState, useEffect } from "react";
  import styles from "./Post.module.css";
  import SidebarMenu from "../../../components/SideBar/SideBarMenu";
  import PostDisplay from "../../../components/Post/PostDisplay";
  import Header from "../../../components/Header/Header";
  import { useFetch } from "../../../hooks/useFetch";

  interface Post {
    user_id: string;
    user_name: string;
    is_image: boolean;
    ava_img_path: string | null;
    post_title: string;
    date_updated: string;
    status: "Pending" | "Approved" | "Rejected";
    post_id: string;
  }

  interface ApiResponse {
    is_success: boolean;
    status_code: number;
    message: string;
    data: Post[];
    timestamp: number;
  }

  const Post: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [pendingCount, setPendingCount] = useState(0);

    // Fetch dữ liệu từ API
    const { data, loading, error, refetch } = useFetch<ApiResponse>(
      "http://localhost:3000/api/v1/posts/admin/dashboard"
    );

    //  pendingCount với dữ liệu API
    useEffect(() => {
      if (data?.data) {
        const pendingPosts = data.data.filter((post) => post.status === "Pending").length;
        setPendingCount(pendingPosts);
      }
    }, [data]);

    // Lấy danh sách bài đăng từ API
    const posts = data?.data || [];

    return (
      <div className={styles.layoutContainer}>
        {/* Sidebar */}
        <SidebarMenu />

        {/* Nội dung chính */}
        <div className={styles.postContainer}>
          {/* Header */}
          <Header
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            pendingCount={pendingCount}
          />
          
          {/* Trạng thái fetch */}
          {loading && <p>Loading posts...</p>}
          {error && <p className={styles.error}>Error: {error}</p>}

          {/* Nội dung bài post */}
          {!loading && !error && <PostDisplay searchTerm={searchTerm} posts={posts} />}
        </div>
      </div>
    );
  };

  export default Post;







