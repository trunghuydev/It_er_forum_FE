import React, { useState } from "react";
import styles from "./Post.module.css";
import SidebarMenu from "../../../components/SideBar/SideBarMenu";
import PostDisplay from "../../../components/Post/PostDisplay";
import Header from "../../../components/Header/Header"; 

const Post: React.FC = () => {
  const [pendingCount, setPendingCount] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className={styles.layoutContainer}>
      {/* Sidebar */}
      <SidebarMenu />

      {/* Nội dung chính */}
      <div className={styles.postContainer}>
        {/* Header */}
        <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} pendingCount={pendingCount} />

        {/* Nội dung bài post */}
        <PostDisplay searchTerm={searchTerm} />
      </div>
    </div>
  );
};

export default Post;
