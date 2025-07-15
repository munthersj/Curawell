/* eslint-disable no-unused-vars */
import { GoogleLogin } from "@react-oauth/google";
// import jwt_decode from 'jwt-decode';
import { useDispatch } from "react-redux";
import { googleSlice, googleLogin } from "../../../features/auth/googleSlice";
import axios from "axios";
import { toast } from "sonner";
import { CircleX } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import axiosInstance from "../../../config/axiosInstance";

export default function GoogleLoginButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        // إرسال التوكن إلى API الخلفي
        const response = await axiosInstance.post("/auth/google/callback", {
          token: tokenResponse.access_token, // أو tokenResponse.credential لو كنت تستخدم One Tap
        });
        console.log(response.data.token);
        localStorage.setItem("token", response.data.token);
        console.log(localStorage.getItem("token"));
        toast.custom((t) => (
          <div className="flex items-center gap-3 bg-green-50 border-l-4 border-curawell text-curawell p-4 rounded-md shadow-md">
            {/* <span className="font-bold"></span> */}
            <span className="ml-2 font-bold font-cairo">
              Succesfully logged in
            </span>
            <button
              onClick={() => toast.dismiss(t)}
              className="ml-auto text-curawell hover:text-black font-bold cursor-pointer"
            >
              <CircleX className="" />
            </button>
          </div>
        ));

        navigate("/home");
        // استلام بيانات المستخدم أو JWT من السيرفر
        // const userData = response.data.user;

        // تخزين البيانات في redux
        // dispatch(googleLogin(userData));
      } catch (error) {
        console.error("فشل الاتصال بالخادم:", error);
      }
    },
    onError: () => {
      console.log("فشل تسجيل الدخول بـ Google");
    },
    flow: "implicit", // لا تستخدم "auth-code" إلا إذا عندك خادم يستخدم الكود
  });
  return (
    <button
      onClick={login}
      type="button"
      className="w-full bg-curawell rounded-lg py-3 text-white font-cairo hover:bg-curawell/80 transition-all"
    >
      Google
    </button>
  );
}
