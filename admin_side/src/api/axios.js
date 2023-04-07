import axios from "axios";
const API_URL = "https://af13-14-169-227-137.ap.ngrok.io";

export default axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});
