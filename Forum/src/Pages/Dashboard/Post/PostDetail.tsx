import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./PostDetail.module.css";
import SidebarMenu from "../../../components/SideBar/SideBarMenu";

const fakePosts = [
    {
        post_id: "1",
        post_title: "Looking to Purchase 5 Tons of Macadamia Nuts (Size 22-32cm)",
        user_name: "ThanhBuoi",
        user_id: "1",
        ava_img_path: "https://i.pravatar.cc/100",
        post_content:
            "Due to high demand, I am looking to purchase 5 tons of premium-quality macadamia nuts, size ranging from 22-32cm. The nuts should be crispy and well-dried. If any supplier has available stock, please send me a message with pricing details.",
        status: "Pending",
        img_url: ["https://via.placeholder.com/600x400"],
        date_updated: "2025-03-20",
    },
];

const PostDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const post = fakePosts.find((p) => p.post_id === id);

    if (!post) {
        return (
            <div className={styles.layoutContainer}>
                <SidebarMenu />
                <div className={styles.postDetailContainer}>
                    <h2>Post Not Found</h2>
                </div>
            </div>
        );
    }

    const [status, setStatus] = useState(post.status);

    return (
        <>
            <div className={styles.layoutContainer}>
                <SidebarMenu />
            </div>
            <div className={styles.contentContainer}>
                <div className={styles.postDetailWrapper}>
                    <div className={styles.postDetailContainer}>
                        <div className={styles.userInfo}>
                            <img src={post.ava_img_path} alt="User Avatar" className={styles.avatar} />
                            <div>
                                <strong>{post.user_name}</strong>
                                <p className={styles.timestamp}>{post.date_updated}</p>
                            </div>
                        </div>
                        <h2 className={styles.postTitle}>{post.post_title}</h2>
                        <div className={styles.postContent}>
                            {post.img_url.map((img, index) => (
                                <img key={index} src={img} alt="Post" className={styles.postImage} />
                            ))}
                            <p>{post.post_content}</p>
                        </div>
                        <div className={styles.statusActions}>
                            <p>Status: <span className={styles[`status-${status.toLowerCase()}`]}>{status}</span></p>
                            <div className={styles.actionButtons}>
                                <button className={styles.approved} onClick={() => setStatus("Approved")}>
                                    Approved
                                </button>
                                <button className={styles.banned} onClick={() => setStatus("Banned")}>
                                    Banned
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















// import React, { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import styles from "./PostDetail.module.css";
// import SidebarMenu from "../../../components/SideBar/SideBarMenu";

// const fakePosts = [
//     {
//         id: "1",
//         title: "Looking to Purchase 5 Tons of Macadamia Nuts (Size 22-32cm)",
//         username: "ThanhBuoi",
//         avatar: "https://i.pravatar.cc/100?img=1",
//         content:
//             "Due to high demand, I am looking to purchase 5 tons of premium-quality macadamia nuts, size ranging from 22-32cm. The nuts should be crispy and well-dried. If any supplier has available stock, please send me a message with pricing details.\n\nFor quick contact, reach me via Zalo or phone at: 0383377166.\n\nThank you all for your support!",
//         status: "Pending",
//         image: "https://via.placeholder.com/600x400",
//     },
// ];

// const PostDetail: React.FC = () => {
//     const { id } = useParams<{ id: string }>();
//     const navigate = useNavigate();
//     const post = fakePosts.find((p) => p.id === id);

//     if (!post) {
//         return (
//             <div className={styles.layoutContainer}>
//                 <SidebarMenu />
//                 <div className={styles.postDetailContainer}>
//                     <h2>Post Not Found</h2>
//                 </div>
//             </div>
//         );
//     }

//     const [status, setStatus] = useState(post.status);

//     const handleStatusChange = (newStatus: "Banned" | "Approved") => {
//         setStatus(newStatus);
//         setTimeout(() => {
//             navigate("/post");
//         }, 5);
//     };

//     return (
//         <>
//             <div className={styles.layoutContainer}>
//                 {/* Sidebar riêng biệt */}
//                 <SidebarMenu />
//             </div>
//             {/* Nội dung PostDetail */}
//             <div className={styles.contentContainer}>
//                 <div className={styles.postDetailWrapper}>
//                     <div className={styles.postDetailContainer}>
//                         {/* Thông tin User */}
//                         <div className={styles.userInfo}>
//                             <img src={post.avatar} alt="User Avatar" className={styles.avatar} />
//                             <div>
//                                 <strong>{post.username}</strong>
//                                 <p className={styles.timestamp}>March 13 at 14:42</p>
//                             </div>
//                         </div>

//                         {/* Tiêu đề bài viết */}
//                         <h2 className={styles.postTitle}>{post.title}</h2>

//                         {/* Nội dung bài viết */}
//                         <div className={styles.postContent}>
//                             {post.image && <img src={post.image} alt="Post Image" className={styles.postImage} />}
//                             <p>{post.content}</p>
//                         </div>

//                         {/* Trạng thái & Action */}
//                         <div className={styles.statusActions}>
//                             <p>
//                                 Status: <span className={styles[`status-${status.toLowerCase()}`]}>{status}</span>
//                             </p>
//                             <div className={styles.actionButtons}>
//                             <button className={styles.approved} onClick={() => handleStatusChange("Approved")}>
//                                     Approved
//                                 </button> 

//                                 <button className={styles.banned} onClick={() => handleStatusChange("Banned")}>
//                                     Banned
//                                 </button>

//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default PostDetail;











