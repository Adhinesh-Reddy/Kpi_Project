import axios from "axios";
import { apiConfig } from "./config";

const client = axios.create({
  baseURL: apiConfig.baseUrl,
  headers: {
    Accept: "application/json",
  },
  data: {},
});

export default client;
