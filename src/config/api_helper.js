import axios from "axios";
import { admintoken } from "../helper/notification_helper";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const custom_request = axios.create();

custom_request.interceptors.request.use((config) => {
  const token = localStorage.getItem(admintoken);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

//admin
export const admin_login = async (formdata) => await custom_request.post(`${BASE_URL}/auth/login`, formdata);
export const add_excel = async (formdata) => await custom_request.post(`${BASE_URL}/excel/add_excel_sheet`, formdata);
export const getExcelSheet = async () => await custom_request.get(`${BASE_URL}/excel/get_excel_sheet`);
export const edit_excel_sheet = async (formdata, id) => await custom_request.put(`${BASE_URL}/excel/edit_excel_sheet/${id}`, formdata);
export const delete_excel_sheet = async (id) => await custom_request.delete(`${BASE_URL}/excel/delete_excel_sheet/${id}`);

//user
export const getSingleUserData = async (id) => await custom_request.get(`${BASE_URL}/excel/get_single_user/${id}`); 
