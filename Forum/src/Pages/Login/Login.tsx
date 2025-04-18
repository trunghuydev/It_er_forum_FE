import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { message } from "antd";
import { useLogin } from "@/hooks/Login/useLogin";



const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  const { mutate: login, isPending } = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowError(false);

    login(
      { email, password },
      {
        onSuccess: () => {
          message.success("Login successful");
          navigate("/post");
        },
        onError: () => {
          message.error("Email or Password is incorrect");
          setShowError(true);
        },
      }
    );
  };



  return (
    <div className={styles.loginContainer}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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
          <button type="submit" disabled={isPending}>
            {isPending ? "Logging in..." : "Login"}
          </button>
          <a href="#">Forgot password?</a>
        </div>
      </form>
    </div>
  );
};

export default Login;
