import { getToken } from "@/commons/gettoken";
import axios from "axios";

export const httpClient = () => {
  const token = getToken()
  return axios.create({
    baseURL: '/services/api',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  });
}

export default httpClient();

