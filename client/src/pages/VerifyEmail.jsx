import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

function VerifyEmail() {
    const navigate = useNavigate();
    const location = useLocation();
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true); // To prevent unnecessary rendering before API call completes

    const URLParams = new URLSearchParams(location.search);
    const token = URLParams.get("token");

    useEffect(() => {
        if (!token) {
            setMessage("Token not found.");
            setLoading(false);
            return;
        }

        async function sendTokenToBackend() {
            try {
                const res = await axios.post("http://localhost:5057/api/v1/auth/verifyToken", { token });

                if (res.status === 200) {
                    setMessage(res.data.message);
                    setTimeout(() => navigate("/login"), 3000);
                } else {
                    setMessage("Verification failed.");
                    setTimeout(() => navigate("/register"), 3000);
                }
            } catch (error) {
                setMessage("Invalid or expired token.");
                setTimeout(() => navigate("/register"), 3000);
            } finally {
                setLoading(false);
            }
        }

        sendTokenToBackend();
    }, [token, navigate]);

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            {message} <br />
            <Link to="/">Go back Home</Link>
        </div>
    );
}

export default VerifyEmail;
