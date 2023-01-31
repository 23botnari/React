import React, { useState } from "react";
import "./LoginPage.css";
import bcrypt from "bcryptjs";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const validateForm = () => {
    return email.length > 0 && password.length > 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!validateForm()) {
        throw new Error("Email and password are required");
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const response = await fetch("/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password: hashedPassword }),
      });
      if (!response.ok) {
        throw new Error("Authentication failed");
      }
      // Redirect the user to the homepage if authentication succeeds
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="center-login">
      <h1>Login</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="p-inputgroup">
          <span className="p-inputgroup-addon">
            <i className="pi pi-user"></i>
          </span>
          <InputText
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <br />
        <div className="p-inputgroup">
          <span className="p-inputgroup-addon">
            <i className="pi pi-lock"></i>
          </span>
          <InputText
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <br />
        <Button label="Login" disabled={!validateForm()} />
      </form>
    </div>
  );
}

export default LoginPage;