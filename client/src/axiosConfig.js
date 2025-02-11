import axios from "axios";

const instance = axios.create({
    baseURL: "https://shopease-server-709b.onrender.com/api/v1/",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

export default instance;