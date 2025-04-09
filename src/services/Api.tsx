import axios from "axios";





const Http = axios.create({
  baseURL: "https://be-kappa-sand.vercel.app/services/api",
  withCredentials: true,
});
export default Http;