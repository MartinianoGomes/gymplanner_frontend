import axios from "axios";

export const api = axios.create({
    baseURL: "https://gymplanner-api.vercel.app",
    withCredentials: true
})