import axios, { AxiosInstance } from "axios";

export const axiosInstance: AxiosInstance = axios.create({
	baseURL: "http://localhost:6666/api",
	withCredentials: true, // cookies for the every single req
});
