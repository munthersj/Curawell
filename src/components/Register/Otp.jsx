/* eslint-disable no-unused-vars */
// import useRegisterForm from "../../hooks/useRegisterForm";
import { useContext } from "react";
import { StepperContext } from "../../context/StepperContext";
import { useState } from "react";
import OTPInput from "react-otp-input";
import { useDispatch } from "react-redux";
import { verifyOtp } from "../../features/auth/otpSlice";

export default function Otp() {
  const content = useContext(StepperContext);
  const dispatch = useDispatch();
  console.log(content);
  const handleVerify = (e) => {
    e.preventDefault();
    let otp = content.otp;
    dispatch(verifyOtp({ otp, emailOrPhone: "test@example.com" })); // غيّر حسب حالتك
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
    </div>
  );
}

/*<input autocomplete="off" aria-label="Please enter OTP character 1" class="w-full h-16 text-2xl text-center font-bold border-2 border-gray-300 rounded-xl focus:outline-none focus:border-purple-600 transition-all duration-200 bg-white text-gray-800" inputmode="numeric" type="number" value="2" style="width: 2em;text-align: center;"> */
