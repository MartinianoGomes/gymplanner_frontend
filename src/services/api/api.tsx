import axios from "axios";

export const api = axios.create({
<<<<<<< HEAD
    baseURL: "https://gymplanner-api.vercel.app/",
=======
    baseURL: "http://localhost:3000/",
>>>>>>> parent of c496033 (Revert "feat/apiIntegration")
    withCredentials: true
})