import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { usePostFetch } from "../../hooks/usePostFetch";
import { message } from "antd";

// Interface khớp với cấu trúc API
interface LoginData {
  access_token: string;
  refresh_token: string;
}

interface LoginResponse {
  is_success: boolean;
  status_code: number;
  message: string;
  data: LoginData;
  timestamp: number;
}

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  const { loading, error, postData } = usePostFetch<LoginResponse>(
    "http://localhost:3000/api/v1/auth/login"
  );

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowError(false);

    // Gọi postData và lấy response trực tiếp
    const response = await postData({ email, password });

    if (response && response.is_success) {
      const { access_token, refresh_token } = response.data; // Truy cập từ response.data
      if (access_token && refresh_token) {
        localStorage.setItem("accessToken", access_token); // Lưu access_token
        localStorage.setItem("refreshToken", refresh_token); // Lưu refresh_token
        navigate("/post");
      } else {
        setShowError(true);
        console.error("Tokens missing in response:", response);
      }
    } else {
      setShowError(true);
      console.log(message);
      
      console.error("Login failed:", error || "No response from server");
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className={styles.inputGroup}>
          <p>Email</p>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.inputGroup}>
          <p>Password</p>
          <div className={styles.passwordWrapper}>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Enter Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className={styles.togglePassword}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>

        {showError && <p className={styles.wrongUP}>Wrong Email or Password</p>}

        <div className={styles.actions}>
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
          <a href="#">Forgot password?</a>
        </div>
      </form>
    </div>
  );
};

export default Login;



// import React, { useState } from "react";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import styles from "./Login.module.css";

// const Login: React.FC = () => {
//   const [email, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [showError, setShowError] = useState(false);
//   const navigate = useNavigate();

//   const handleLogin = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (email === "admin" && password === "123456") {
//       setShowError(false);
//       navigate("/post");
//     } else {
//       setShowError(true);
//     }
//   };
 
 


//   return (
//     <div className={styles.loginContainer}>
//       <h2>Login</h2>
//       <form onSubmit={handleLogin}>
//         <div className={styles.inputGroup}>
//           <p>Email</p>
//           <input
//             type="text"
//             id="email"
//             name="email"
//             placeholder="Enter Username"
//             required
//             value={email}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//         </div>
//         <div className={styles.inputGroup}>
//           <p>Password</p>
//           <div className={styles.passwordWrapper}>
//             <input
//               type={showPassword ? "text" : "password"}
//               id="password"
//               name="password"
//               placeholder="Enter Password"
//               required
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             <span
//               className={styles.togglePassword}
//               onClick={() => setShowPassword(!showPassword)}
//             >
//               {showPassword ? <FaEyeSlash /> : <FaEye />}
//             </span>
//           </div>
//         </div>

//         {showError && <p className={styles.wrongUP}>Wrong Username or Password</p>}

//         <div className={styles.actions}>
//           <button type="submit">Login</button>
//           <a href="#">Forgot password?</a>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Login;
