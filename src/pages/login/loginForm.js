import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./loginForm.css";

import { passwordRegex, usernameRegex } from "../../constants";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!usernameRegex.test(username)) {
      setErrorMessage(
        "Username must be 3-16 characters long and can only contain letters, numbers, and underscores."
      );
      return;
    }

    if (!passwordRegex.test(password)) {
      setErrorMessage(
        "Password must be at least 8 characters long and contain at least one letter and one number."
      );
      return;
    }

    // Clear fields and error message after submission
    setUsername("");
    setPassword("");
    setErrorMessage("");

    // Redirect to home page
    history.push("/home",  username );
  };

  return (
    <div className="login-form">
      <h2>Login Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {errorMessage && <p>{errorMessage}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginForm;
