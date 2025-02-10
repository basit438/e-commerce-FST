import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import instance from "../axiosConfig";

function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    validateToken();
  }, []);

  async function validateToken() {
    try {
      console.log("Calling check-auth endpoint...");
      const response = await instance.get("auth/check-auth", {
        withCredentials: true,
      });
      console.log("Check-auth response received:", response.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Error calling check-auth:", error.response || error);
      setIsAuthenticated(false);
    } finally {
      console.log("Token validation finished");
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
