"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaEnvelope, FaLock } from "react-icons/fa";
import "./LoginPage.css"; // Link the CSS file
import React from "react";

export default function LoginPage() {
  const router = useRouter();

  interface IInfo {
    email: string;
    password: string;
    error: string;
    loading: boolean;
  }

  const [info, setInfo] = React.useState<IInfo>({
    email: "",
    password: "",
    error: "",
    loading: false,
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    const updatedState = { ...info };
    e.preventDefault();
    setError(null);
    updatedState.error = null;
    setLoading(true);
    updatedState.loading = true;

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    updatedState.loading = false;
    setLoading(false);

    if (res?.error) {
      updatedState.error = res.error;
      setError(res.error);
    } else {
      router.push("/chat");
    }
    setInfo(updatedState);
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Welcome Back</h1>
        <p className="login-subtitle">Login to access your account</p>

        {error && <div className="login-error">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="input-field"
            />
          </div>

          <div className="input-group">
            <FaLock className="input-icon" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
              className="input-field"
            />
          </div>

          <button type="submit" disabled={loading} className="login-button">
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="signup-text">
          Don’t have an account?{" "}
          <a href="/signup" className="signup-link">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
