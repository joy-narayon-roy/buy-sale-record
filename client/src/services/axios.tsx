import axios from "axios";

function getBaseURL(port?: string | number | undefined): string {
    const location = window.location;
    return `${location.protocol}//${location.hostname}:${port || location.port}`;
}

const api = axios.create({
    baseURL: getBaseURL(import.meta.env.VITE_API_PORT) + "/api",
    headers: {
        "Content-Type": "application/json",
    },
});

export { getBaseURL }
export default api;