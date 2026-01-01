import axios from "axios";
import { http } from "./http";

/**
 * 로그인
 * @param {{ email: string, password: string }} data
 */
export const login = (data) => {
  return axios.post("/api/auth/login", data);
};

// export const login = (data) => http.post("/auth/login", data);
