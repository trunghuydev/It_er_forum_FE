import React, { useState } from "react";
import styles from "./RegisterForm.module.css";
import SidebarMenu from "../../components/SideBar/SideBarMenu";

const RegisterForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    let newErrors: { [key: string]: string } = {};

    if (email.length > 30) {
      newErrors.email = "Email must not exceed 30 characters.";
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
    if (!passwordRegex.test(password)) {
      newErrors.password =
        "Password must be 8-16 characters, including uppercase letters, numbers and special characters.";
    }

    if (username.length > 50) {
      newErrors.username = "Username cannot exceed 50 characters.";
    }

    const ageValue = Number(age);
    if (isNaN(ageValue) || ageValue < 13 || ageValue > 150) {
      newErrors.age = "Age must be between 13 and 150.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      alert("Registration successful!");
    }
  };

  return (
    <div className={styles.formContainer}>
      <SidebarMenu />
      <h2 className={styles.formTitle}>Register</h2>
      <form onSubmit={handleSubmit}>
      
        <div className={styles.inputGroup}>
          <label className={styles.label}>Email:</label>
          <input
            type="email"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className={styles.errorMessage}>{errors.email}</p>}
        </div>

        
        <div className={styles.inputRow}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Username:</label>
            <input
              type="text"
              className={styles.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {errors.username && <p className={styles.errorMessage}>{errors.username}</p>}
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Age:</label>
            <input
              type="number"
              className={styles.input}
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
            {errors.age && <p className={styles.errorMessage}>{errors.age}</p>}
          </div>
        </div>

        
        <div className={styles.inputGroup}>
          <label className={styles.label}>Password:</label>
          <input
            type="password"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p className={styles.errorMessage}>{errors.password}</p>}
        </div>

        
        <button type="submit" className={styles.submitButton}>
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
