import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./UserDetail.module.css";
import SidebarMenu from "../../../components/SideBar/SideBarMenu";
import { useFetch } from "../../../hooks/useFetch";
import avatar from "../../../Image/avata.png";

// Interface cho thông tin người dùng
interface User {
  user_id: string;
  user_name: string;
  age: number | null;
  ava_img_path: string | null;
  phone_num: string | null;
  email: string;
  first_name: string | null;
  last_name: string | null;
  status: string;
}

// Interface cho response từ API
interface ApiResponse {
  is_success: boolean;
  status_code: number;
  message: string;
  data: User;
  timestamp: number;
}

const UserDetail: React.FC = () => {
  const { user_id } = useParams<{ user_id: string }>(); // Lấy user_id từ URL
  const navigate = useNavigate();

  // Kiểm tra user_id
  if (!user_id) {
    return (
      <div className={styles.mainContainer}>
        <SidebarMenu />
        <div className={styles.container}>
          <h2>Invalid User ID</h2>
        </div>
      </div>
    );
  }

  // Fetch dữ liệu từ API
  const { data, loading, error, refetch } = useFetch<ApiResponse>(
    `http://localhost:3000/api/v1/users/user-detail/${user_id}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken") || "your-token-here"}`,
      },
    }
  );

  const user = data?.data;
  const [isUpdating, setIsUpdating] = useState(false);

  // Hàm cập nhật trạng thái user
  const handleUpdateStatus = async () => {
    if (!user) return;

    setIsUpdating(true);
    try {
      const response = await fetch(`http://localhost:3000/api/v1/users/admin/${user.user_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken") || "your-token-here"}`,
        },
        body: JSON.stringify({ status: user.status === "Active" ? "Banned" : "Active" }),
      });

      if (!response.ok) {
        throw new Error("Failed to update user status");
      }

      await refetch(); // Load lại dữ liệu sau khi cập nhật thành công
    } catch (error) {
      console.error("Error updating user status:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.mainContainer}>
        <SidebarMenu />
        <div className={styles.container}>
          <p>Loading user details...</p>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className={styles.mainContainer}>
        <SidebarMenu />
        <div className={styles.container}>
          <h2>{error ? `Error: ${error}` : "User Not Found"}</h2>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.mainContainer}>
      <SidebarMenu />
      <div className={styles.container}>
        <h2 className={styles.title}>User Detail</h2>
        <div className={styles.userDetail}>
          <div className={styles.avatarSection}>
            <img
              src={user.ava_img_path || avatar}
              alt="Avatar"
              className={styles.avatar}
            />
          </div>
          <div className={styles.infoSection}>
            <p><strong>User ID:</strong> {user.user_id}</p>
            <p><strong>Username:</strong> {user.user_name}</p>
            <p>
              <strong>Name:</strong>{" "}
              {user.first_name || user.last_name
                ? `${user.first_name || ""} ${user.last_name || ""}`.trim()
                : "N/A"}
            </p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone_num || "N/A"}</p>
            <p><strong>Age:</strong> {user.age !== null ? user.age : "N/A"}</p>
            <p><strong>Status:</strong> {user.status}</p>

            {/* Nút cập nhật trạng thái */}
            <button
              className={styles.updateButton}
              onClick={handleUpdateStatus}
              disabled={isUpdating}
            >
              {isUpdating
                ? "Updating..."
                : user.status === "Active"
                  ? "Deactivate Account"
                  : "Activate Account"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
