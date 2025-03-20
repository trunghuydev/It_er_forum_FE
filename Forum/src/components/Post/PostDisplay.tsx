import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../Pages/Dashboard/Post/Post.module.css";
import { FaCheck, FaTimes } from "react-icons/fa";

interface PostDisplayProps {
    searchTerm: string;
}

interface Post {
    id: number;
    title: string;
    username: string;
    image: number;
    date: string;
    status: "Pending";
}

const fakeReportedPosts: Post[] = [
    { id: 1, title: "Spam content detected", username: "user123", image: 1, date: "2025-03-20", status: "Pending" },
    { id: 2, title: "Offensive language", username: "user456", image: 0, date: "2025-03-19", status: "Pending" },
    { id: 3, title: "False information", username: "user789", image: 1, date: "2025-03-18", status: "Pending" },
    { id: 4, title: "Violent content", username: "user999", image: 1, date: "2025-03-17", status: "Pending" },
];

const PostDisplay: React.FC<PostDisplayProps> = ({ searchTerm }) => {
    const navigate = useNavigate();

    const filteredPosts = fakeReportedPosts.filter(
        (post) =>
            post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className={styles.postDisplayContainer}>
            <h2>Posts</h2>
            <table className={styles.postDisplayTable}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Username</th>
                        <th>Have Image</th>
                        <th>Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredPosts.length > 0 ? (
                        filteredPosts.map((post) => (
                            <tr key={post.id}>
                                <td>{post.id}</td>
                                {/*  chuyển trang detail */}
                                <td 
                                    className={styles.titleCell} 
                                    onClick={() => navigate(`/postdetail/${post.id}`)}
                                >
                                    {post.title}
                                </td>
                                <td>{post.username}</td>
                                <td className={styles.imageCell}>
                                    {post.image === 1 ? <FaCheck className={styles.checkIcon} /> : <FaTimes className={styles.timesIcon} />}
                                </td>
                                <td>{post.date}</td>
                                <td className={styles.postStatusCell}>
                                    <span className={styles.postStatusPending}>Pending</span>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={6} className={styles.noResults}>No matching results</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default PostDisplay;
