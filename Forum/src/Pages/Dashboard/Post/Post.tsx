import React, { useState, useEffect } from "react";
import styles from "./Post.module.css";
import SidebarMenu from "../../../components/SideBar/SideBarMenu";
import Header from "../../../components/Header/Header";
import { usePost } from "../../../hooks/Post/usePost";
import { useNavigate } from "react-router-dom";
import { FaCheck, FaTimes } from "react-icons/fa";
import { TPostResponse } from "@/constants";

const Post: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [pendingCount, setPendingCount] = useState(0);
  const navigate = useNavigate();
  const { data, isLoading, isError } = usePost();
  const posts: TPostResponse[] = data?.data || [];
  const filteredPosts = posts.filter(
    (data) =>
      data.post_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      data.user_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (posts.length) {
      const pendingPosts = posts.filter((post) => post.status === "Pending").length;
      setPendingCount(pendingPosts);
    }
  }, [posts]);



  return (
    <div className={styles.layoutContainer}>
      <SidebarMenu />
      <div className={styles.postContainer}>
        <Header
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          pendingCount={pendingCount}
        />

        {isLoading && <p>Loading posts...</p>}
        {isError && <p className={styles.error}>Error loading posts.</p>}

        {!isLoading && !isError && (
          <div className={styles.postDisplayContainer}>
            <h2>Posts</h2>
            <table className={styles.postDisplayTable}>
              <thead>
                <tr>
                  <th>Post ID</th>
                  <th>Post Title</th>
                  <th>User Name</th>
                  <th>Have Image</th>
                  <th>Date Updated</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredPosts.length > 0 ? (
                  filteredPosts.map((data) => (
                    <tr key={data.post_id}>
                      <td>{data.post_id}</td>
                      <td
                        className={styles.post_titleCell}
                        onClick={() => navigate(`/postdetail/${data.post_id}`)}
                      >
                        {data.post_title}
                      </td>
                      <td>{data.user_name}</td>
                      <td className={styles.ava_img_pathCell}>
                        {data.is_image ? (
                          <FaCheck className={styles.checkIcon} />
                        ) : (
                          <FaTimes className={styles.timesIcon} />
                        )}
                      </td>
                      <td>{new Date(data.date_updated).toLocaleDateString()}</td>
                      <td className={styles.postStatusCell}>
                        <span className={styles.postStatusPending}>{data.status}</span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className={styles.noResults}>
                      No matching results
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Post;
