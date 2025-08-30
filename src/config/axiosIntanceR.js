import axios from "axios";

const axiosInstanceR = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    "Content-Type": "application/json",
    "Accept-Language": "en",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

//   headers: {
//     "Content-Type": "application/json",
//     "Accept-Language": "ar" // أو "en" مثلاً
//   }
// }
export default axiosInstanceR;
