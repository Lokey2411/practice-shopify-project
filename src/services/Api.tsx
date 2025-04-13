import axios from "axios";
const Http = axios.create({
  baseURL: "/services/api",
  withCredentials: true,
});
export default Http;