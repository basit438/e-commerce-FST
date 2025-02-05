import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    validateToken();
  }, []);

  async function validateToken() {
    try {
      console.log("Calling check-auth endpoint...");
      const response = await axios.get("http://localhost:5057/api/v1/auth/check-auth", {
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
