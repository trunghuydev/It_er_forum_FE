import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css"; 
const Login: React.FC = () => {
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "admin" && password === "123456") {
      setShowError(false);
      navigate("/Home");
    } else {
      setShowError(true);
    }
  };

  return (
    <div className={styles.loginContainer}> 
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <p>Email</p>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Enter Username"
            required
            value={email}
            onChange={(e) => setUsername(e.target.value)}
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

        {showError && <p className={styles.wrongUP}>Wrong Username or Password</p>}

        <div className={styles.actions}>
          <button type="submit">Login</button>
          <a href="#">Forgot password?</a>
        </div>
      </form>
    </div>
  );
};

export default Login;
