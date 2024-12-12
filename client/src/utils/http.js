import axios from "axios";

const BASEURL = import.meta.env.VITE_BASE_URL
const timeoutmsg = "Waiting for too long...Request aborted!";

const config = {
  baseURL: BASEURL,
  timeout: 20000,
  timeoutErrorMessage: timeoutmsg,
};

const axiosInstance = axios.create(config);

export default axiosInstance;
