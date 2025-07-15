/* eslint-disable no-unused-vars */
// import useRegisterForm from "../../hooks/useRegisterForm";
import { useContext } from "react";
import { StepperContext } from "../../../context/StepperContext";
import { useState } from "react";
import OTPInput from "react-otp-input";
import { useDispatch } from "react-redux";
import { sendOtp } from "../../../features/auth/otpSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { CircleX } from "lucide-react";

export default function Otp() {
  const content = useContext(StepperContext);
  const dispatch = useDispatch();

  console.log(content);

  const handelResendClick = async () => {
    if (content.registerData != undefined) {
      console.log("yesssssssss");
      const resultAction1 = await dispatch(
        sendOtp({
          type: "verify",
          channel: "phone",
          phone: content.registerData.phone,
        })
      );
      if (sendOtp.fulfilled.match(resultAction1)) {
        toast.custom((t) => (
          <div className="flex items-center gap-3 bg-green-50 border-l-4 border-curawell text-curawell p-4 rounded-md shadow-md">
            {/* <span className="font-bold"></span> */}
            <span className="ml-2 font-bold font-cairo">
              A code has been sent
            </span>
            <button
              onClick={() => toast.dismiss(t)}
              className="ml-auto text-curawell hover:text-black font-bold cursor-pointer"
            >
              <CircleX className="" />
            </button>
          </div>
        ));
      } else {
        toast.custom((t) => (
          <div className="flex items-center gap-3 bg-green-50 border-l-4 border-curawell text-curawell p-4 rounded-md shadow-md">
            {/* <span className="font-bold"></span> */}
            <span className="ml-2 font-bold font-cairo">
              Somthing went Wrong
            </span>
            <button
              onClick={() => toast.dismiss(t)}
              className="ml-auto text-curawell hover:text-black font-bold cursor-pointer"
            >
              <CircleX className="" />
            </button>
          </div>
        ));
      }
    } else {
      if (content.resetType == "email") {
        const resultAction1 = await dispatch(
          sendOtp({
            type: "reset_password",
            channel: content.resetType,
            email: content.input,
          })
        );
        if (sendOtp.fulfilled.match(resultAction1)) {
          toast.custom((t) => (
            <div className="flex items-center gap-3 bg-green-50 border-l-4 border-curawell text-curawell p-4 rounded-md shadow-md">
              {/* <span className="font-bold"></span> */}
              <span className="ml-2 font-bold font-cairo">
                A code has been sent
              </span>
              <button
                onClick={() => toast.dismiss(t)}
                className="ml-auto text-curawell hover:text-black font-bold cursor-pointer"
              >
                <CircleX className="" />
              </button>
            </div>
          ));
        } else {
          toast.custom((t) => (
            <div className="flex items-center gap-3 bg-green-50 border-l-4 border-curawell text-curawell p-4 rounded-md shadow-md">
              {/* <span className="font-bold"></span> */}
              <span className="ml-2 font-bold font-cairo">
                Somthing went Wrong
              </span>
              <button
                onClick={() => toast.dismiss(t)}
                className="ml-auto text-curawell hover:text-black font-bold cursor-pointer"
              >
                <CircleX className="" />
              </button>
            </div>
          ));
        }
      } else {
        const resultAction1 = await dispatch(
          sendOtp({
            type: "reset_password",
            channel: content.resetType,
            phone: content.input || content.registerData.phone,
          })
        );
        if (sendOtp.fulfilled.match(resultAction1)) {
          toast.custom((t) => (
            <div className="flex items-center gap-3 bg-green-50 border-l-4 border-curawell text-curawell p-4 rounded-md shadow-md">
              {/* <span className="font-bold"></span> */}
              <span className="ml-2 font-bold font-cairo">
                A code has been sent
              </span>
              <button
                onClick={() => toast.dismiss(t)}
                className="ml-auto text-curawell hover:text-black font-bold cursor-pointer"
              >
                <CircleX className="" />
              </button>
            </div>
          ));
        } else {
          toast.custom((t) => (
            <div className="flex items-center gap-3 bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-md shadow-md">
              <span className="font-bold">
                <CircleX />
              </span>
              <span className="ml-2">"Somthing Went Wrong</span>
              <button
                onClick={() => toast.dismiss(t)}
                className="ml-auto text-gray-500 hover:text-black font-bold"
              >
                ×
              </button>
            </div>
          ));
        }
      }
    }
  };
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <h2 className="text-xl font-bold font-cairo text-curawell mb-4">
        Enter verifyCode Here
      </h2>
      <h4 className="text-lg font-cairo text-gray-400 mb-10">
        An code has been sent to your email and whatsapp
      </h4>
      <OTPInput
        value={content.otp}
        onChange={content.setOtp}
        numInputs={6}
        shouldAutoFocus
        containerStyle="grid  w-1/2 justify-center items-center gap-4" // المسافة بين الخانات
        inputType="tel"
        renderInput={(props) => {
          const { style, ...restProps } = props;
          return (
            <input
              {...restProps}
              className="w-1/2 i h-14 text-xl border  border-gray-300 rounded-lg text-center focus:outline-none focus:border-curawell transition-all"
            />
          );
        }}
      />
      <div className="flex ml-3">
        <button
          type="button"
          className="ml-1 text-xs font-bold font-cairo mt-2 text-curawell underline cursor-pointer"
          onClick={handelResendClick}
        >
          resend code
        </button>
      </div>
    </div>
  );
}

/*<input autocomplete="off" aria-label="Please enter OTP character 1" class="w-full h-16 text-2xl text-center font-bold border-2 border-gray-300 rounded-xl focus:outline-none focus:border-purple-600 transition-all duration-200 bg-white text-gray-800" inputmode="numeric" type="number" value="2" style="width: 2em;text-align: center;"> */
