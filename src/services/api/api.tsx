import axios from "axios";

export const api = axios.create({
    baseURL: process.env.NODE_ENV === 'production'
        ? "https://gymplanner-api.vercel.app/"
        : "http://localhost:3000",
    withCredentials: true
})