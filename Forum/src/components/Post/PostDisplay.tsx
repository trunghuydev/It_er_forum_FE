import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../Pages/Dashboard/Post/Post.module.css";
import { FaCheck, FaTimes } from "react-icons/fa";

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

interface PostDisplayProps {
  searchTerm: string;
  posts: Post[];
}

const PostDisplay: React.FC<PostDisplayProps> = ({ searchTerm, posts }) => {
  const navigate = useNavigate();

  // Lọc bài đăng dựa trên searchTerm
  const filteredPosts = posts.filter(
    (post) =>
      post.post_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.user_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.postDisplayContainer}>
      <h2>Posts </h2>
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
            filteredPosts.map((post) => (
              <tr key={post.post_id}>
                <td>{post.post_id}</td>
                <td
                  className={styles.post_titleCell}
                  onClick={() => navigate(`/postdetail/${post.post_id}`)}
                >
                  {post.post_title}
                </td>
                <td>{post.user_name}</td>
                <td className={styles.ava_img_pathCell}>
                  {post.is_image ? (
                    <FaCheck className={styles.checkIcon} />
                  ) : (
                    <FaTimes className={styles.timesIcon} />
                  )}
                </td>
                <td>{new Date(post.date_updated).toLocaleDateString()}</td>
                <td className={styles.postStatusCell}>
                  <span className={styles.postStatusPending}>{post.status}</span>
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
  );
};

export default PostDisplay;










































// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import styles from "../../Pages/Dashboard/Post/Post.module.css";
// import { FaCheck, FaTimes } from "react-icons/fa";

// interface PostDisplayProps {
//     searchTerm: string;
// }

// interface Post {
//     post_id: number;
//     post_title: string;
//     user_name: string;
//     user_id: string
//     ava_img_path: number;
//     date_updated: string;
//     // is_image:string;
//     status: "Pending";
// }

// const fakeReportedPosts: Post[] = [
//     { post_id: 1, post_title: "Spam content detected", user_name: "user123",user_id:"1" ,ava_img_path: 1, date_updated: "2025-03-20", status: "Pending" },
//     { post_id: 2, post_title: "Offensive language", user_name: "user456",user_id:"1", ava_img_path: 0, date_updated: "2025-03-19", status: "Pending" },
//     { post_id: 3, post_title: "False information", user_name: "user789",user_id:"1", ava_img_path: 1, date_updated: "2025-03-18", status: "Pending" },
//     { post_id: 4, post_title: "Violent content", user_name: "user999",user_id:"1", ava_img_path: 1, date_updated: "2025-03-17", status: "Pending" },
// ];

// const PostDisplay: React.FC<PostDisplayProps> = ({ searchTerm }) => {
//     const navigate = useNavigate();

//     const filteredPosts = fakeReportedPosts.filter(
//         (post) =>
//             post.post_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             post.user_name.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     return (
//         <div className={styles.postDisplayContainer}>
//             <h2>Posts</h2>
//             <table className={styles.postDisplayTable}>
//                 <thead>
//                     <tr>
//                         <th>Post Id</th>
//                         <th>Post Title</th>
//                         <th>User Name</th>
//                         <th>Have Image</th>
//                         <th>Date</th>
//                         <th>Status</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {filteredPosts.length > 0 ? (
//                         filteredPosts.map((post) => (
//                             <tr key={post.post_id    }>
//                                 <td>{post.post_id}</td>
//                                 {/*  chuyển trang detail */}
//                                 <td 
//                                     className={styles.post_titleCell} 
//                                     onClick={() => navigate(`/postdetail/${post.post_id}`)}
//                                 >
//                                     {post.post_title}
//                                 </td>
//                                 <td>{post.user_name}</td>
//                                 <td className={styles.ava_img_pathCell}>
//                                     {post.ava_img_path === 1 ? <FaCheck className={styles.checkIcon} /> : <FaTimes className={styles.timesIcon} />}
//                                 </td>
//                                 <td>{post.date_updated}</td>
//                                 <td className={styles.postStatusCell}>
//                                     <span className={styles.postStatusPending}>Pending</span>
//                                 </td>
//                             </tr>
//                         ))
//                     ) : (
//                         <tr>
//                             <td colSpan={6} className={styles.noResults}>No matching results</td>
//                         </tr>
//                     )}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default PostDisplay;
