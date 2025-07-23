import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    "Content-Type": "application/json",
    "Accept-Language": "en",
  },
});

//   headers: {
//     "Content-Type": "application/json",
//     "Accept-Language": "ar" // أو "en" مثلاً
//   }
// }
export default axiosInstance;
