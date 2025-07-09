/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendOtp, verifyOtp } from "../features/auth/otpSlice";
import RestTypePage from "./resetPassword/ResetTypePage";
import { useDispatch, useSelector } from "react-redux";
import { StepperContext } from "../context/StepperContext";
import OtpStepperControl from "./OtpStepperControl";
import InputPage from "./resetPassword/InputPage";
import Otp from "./Register/Otp";
import Loader from "./miniComponents/Loader";
import ResetPassPage from "./resetPassword/ResetPassPage";
import { resetPassword } from "../features/auth/resetPasswordSlice";
import { CircleX } from "lucide-react";

import { toast } from "sonner";

const steps = ["1", "2", "3", "4"];
const displaySteps = (step) => {
  switch (step) {
    case 1:
      return <RestTypePage />;
    case 2:
      return <InputPage />;
    case 3:
      return <Otp />;
    case 4:
      return <ResetPassPage />;
  }
};

export default function ResetPassword() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.otp);
  const navigate = useNavigate();
  const [resetType, setResetType] = useState("email");
  const [currentStep, setcurrentStep] = useState(1);
  const [otp, setOtp] = useState("");
  const [input, setInput] = useState("");
  const [errors, setErrors] = useState("");
  const [errors1, setErrors1] = useState({});
  const [isVisibleVal, setisVisibleVal] = useState(false);
  const [inputs, setInputs] = useState({
    password: "",
    password_confirmation: "",
  });
  const validate = () => {
    let valid = true;
    let newErrors = "";
    //IMPORT STATES

    //VALIDATOR
    const emailRegex = /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^09\d{8}$/;

    if (resetType == "email" && !emailRegex.test(input)) {
      newErrors = "Please enter a valid email address";
      valid = false;
    }
    if (resetType == "phone" && !phoneRegex.test(input)) {
      newErrors = "Please enter a valid phone number";
      valid = false;
    }

    setErrors(newErrors);

    return valid;
  };
  const validate2 = () => {
    let valid = true;
    let newErrors = {
      password: "",
      confirmPassword: "",
    };

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;

    //VALIDATOR

    if (!passwordRegex.test(inputs.password)) {
      newErrors.password =
        "Password must be at least 8 characters and contain both letters and numbers";
      valid = false;
    }
    if (inputs.password !== inputs.password_confirmation) {
      newErrors.confirmPassword = "Passwords do not match";
      valid = false;
    }

    setErrors1(newErrors);

    return valid;
  };
  const handeCLick = async (direction) => {
    let newStep = currentStep;
    direction == "next" ? newStep++ : newStep--;
    if (newStep > 0 && newStep <= steps.length + 1) {
      if (newStep == 2) {
        setcurrentStep(2);
      } else if (newStep == 3) {
        if (!validate()) return;
        if (resetType == "email") {
          const resultAction1 = await dispatch(
            sendOtp({
              type: "reset_password",
              channel: resetType,
              email: input,
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
            setcurrentStep(newStep);
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
              channel: resetType,
              phone: input,
            })
          );
          if (sendOtp.fulfilled.match(resultAction1)) {
            setcurrentStep(newStep);
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
      } else if (newStep == 4) {
        if (resetType == "phone") {
          const resultAction1 = await dispatch(
            verifyOtp({
              type: "reset_password",
              phone: input,
              code: otp,
            })
          );
          if (verifyOtp.fulfilled.match(resultAction1)) {
            toast.custom((t) => (
              <div className="flex items-center gap-3 bg-green-50 border-l-4 border-curawell text-curawell p-4 rounded-md shadow-md">
                {/* <span className="font-bold"></span> */}
                <span className="ml-2 font-bold font-cairo">
                  Successfully Verified
                </span>
                <button
                  onClick={() => toast.dismiss(t)}
                  className="ml-auto text-curawell hover:text-black font-bold cursor-pointer"
                >
                  <CircleX className="" />
                </button>
              </div>
            ));
            setcurrentStep(newStep);
          } else {
            toast.custom((t) => (
              <div className="flex items-center gap-3 bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-md shadow-md">
                <span className="font-bold">
                  <CircleX />
                </span>
                <span className="ml-2">Somthing went wrong</span>
                <button
                  onClick={() => toast.dismiss(t)}
                  className="ml-auto text-gray-500 hover:text-black font-bold"
                >
                  ×
                </button>
              </div>
            ));
          }
        } else {
          const resultAction1 = await dispatch(
            verifyOtp({
              type: "reset_password",
              email: input,
              code: otp,
            })
          );
          verifyOtp.fulfilled.match(resultAction1)
            ? setcurrentStep(newStep)
            : console.log("error");
        }
      } else if (newStep == 5) {
        if (!validate2()) return;

        if (resetType == "email") {
          const resultAction = await dispatch(
            resetPassword({
              email: input,
              password: inputs.password,
              password_confirmation: inputs.password_confirmation,
              reset_password_token: localStorage.getItem("resetToken"),
            })
          );
          resetPassword.fulfilled.match(resultAction)
            ? toast.custom((t) => (
                <div className="flex items-center gap-3 bg-green-50 border-l-4 border-curawell text-curawell p-4 rounded-md shadow-md">
                  {/* <span className="font-bold"></span> */}
                  <span className="ml-2 font-bold font-cairo">
                    Password Successfully reseted
                  </span>
                  <button
                    onClick={() => toast.dismiss(t)}
                    className="ml-auto text-curawell hover:text-black font-bold cursor-pointer"
                  >
                    <CircleX className="" />
                  </button>
                </div>
              ))
            : toast.custom((t) => (
                <div className="flex items-center gap-3 bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-md shadow-md">
                  <span className="font-bold">
                    <CircleX />
                  </span>
                  <span className="ml-2">Somthing Went Wrong</span>
                  <button
                    onClick={() => toast.dismiss(t)}
                    className="ml-auto text-gray-500 hover:text-black font-bold"
                  >
                    ×
                  </button>
                </div>
              ));
        } else {
          const resultAction = await dispatch(
            resetPassword({
              phone: input,
              password: inputs.password,
              password_confirmation: inputs.password_confirmation,
              reset_password_token: localStorage.getItem("resetToken"),
            })
          );
          if (resetPassword.fulfilled.match(resultAction)) {
            toast.custom((t) => (
              <div className="flex items-center gap-3 bg-green-50 border-l-4 border-curawell text-curawell p-4 rounded-md shadow-md">
                {/* <span className="font-bold"></span> */}
                <span className="ml-2 font-bold font-cairo">
                  Password Successfully Reseted
                </span>
                <button
                  onClick={() => toast.dismiss(t)}
                  className="ml-auto text-curawell hover:text-black font-bold cursor-pointer"
                >
                  <CircleX className="" />
                </button>
              </div>
            ));
            navigate("/login");
          } else {
            toast.custom((t) => (
              <div className="flex items-center gap-3 bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-md shadow-md">
                <span className="font-bold">
                  <CircleX />
                </span>
                <span className="ml-2">Somthing Went Wrong</span>
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
      } else {
        console.log("asdasd");
        setcurrentStep(newStep);
      }
    } else {
      setcurrentStep(newStep);
      navigate("/login");
    }
  };
  return (
    <div className="flex flex-row h-screen w-screen  ">
      {/***IMG CONTAINER***/}
      <div className="bg-gray-300 h-screen lg:w-3/5 p-0 hidden lg:block  ">
        <img
          className="h-screen w-screen object-cover "
          src="src/assets/login.png"
        />
      </div>
      {/***IMG CONTAINER***/}

      {/***REST FORM CONTAINER***/}
      <div className="  flex flex-col  items-center bg-white h-screen lg:w-2/5">
        <div className=" flex flex-col  lg:w-full w-screen h-screen justify-center  items-center    ">
          <StepperContext.Provider
            value={{
              resetType,
              setResetType,
              setInput,
              input,
              errors,
              setErrors,
              otp,
              setOtp,
              inputs,
              setInputs,
              errors1,
              setErrors1,
              isVisibleVal,
              setisVisibleVal,
            }}
          >
            {!loading ? displaySteps(currentStep) : <Loader />}
          </StepperContext.Provider>
        </div>
        <OtpStepperControl
          handelClick={handeCLick}
          currentStep={currentStep}
          steps={steps}
        />
      </div>

      {/***LOGIN FORM CONTAINER***/}
    </div>
  );
}
