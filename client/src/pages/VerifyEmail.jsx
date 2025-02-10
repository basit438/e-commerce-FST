// VerifyEmail.js
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import instance from "../axiosConfig";

function VerifyEmail() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Extract token from URL query parameters (e.g., ?token=exampleToken)
  const token = new URLSearchParams(location.search).get("token");
  console.log("Extracted token from URL:", token);

  useEffect(() => {
    if (!token) {
      console.error("Token missing in URL");
      setMessage("Missing token. Please request a new verification email.");
      return;
    }

    async function sendTokenToBackend() {
      console.log("Sending token to backend...");
      try {
        const response = await instance.post(
          "auth/verifyToken",
          { token },
          { withCredentials: true }
        );
        console.log("Backend response:", response);

        if (response.status === 200) {
          setMessage(response.data.message);
          // Redirect to login after 3 seconds
          setTimeout(() => navigate("/login"), 3000);
        }
      } catch (error) {
        console.error("Error response from backend:", error.response || error);
        const errorMessage =
          error.response?.data?.message ||
          "Verification failed. Please try again.";
        setMessage(errorMessage);
        // Redirect to home after 3 seconds
        setTimeout(() => navigate("/"), 3000);
      }
    }

    sendTokenToBackend();
  }, [token, navigate]);

  if (!token) {
    return (
      <div>
        <h2>Missing Token</h2>
        <p>
          Go back to <Link to="/">Home</Link>
        </p>
      </div>
    );
  }

  return (
    <div>
      {message ? (
        <h3>{message}</h3>
      ) : (
        <h3>Verifying email, please wait...</h3>
      )}
    </div>
  );
}

export default VerifyEmail;
