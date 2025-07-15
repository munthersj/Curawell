/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import useRegisterForm from "../../hooks/useRegisterForm";
import RegisterInputs from "./miniComponents/RegisterInputs";
import StepperControl from "./StepperControl";
import Stepper from "./Stepper";
import BasicDeatails from "./Register/BasicDeatails";
import MedicalDeatails from "./Register/MedicalDeatails";
import { registerUser } from "../../features/auth/registerSlice";
import { verifyOtp } from "../../features/auth/otpSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./miniComponents/Loader";
import { StepperContext } from "../../context/StepperContext";
import Otp from "./Register/Otp";
import { useNavigate } from "react-router-dom";
const steps = ["Basic Deatails", "Medical Deatails", "OTP"];
import { CircleX } from "lucide-react";
import { toast } from "sonner";

const displaySteps = (step) => {
  switch (step) {
    case 1:
      return <BasicDeatails />;
    case 2:
      return <MedicalDeatails />;
    case 3:
      return <Otp />;
  }
};

export default function RegisterForm() {
  const dispatch = useDispatch();
  // const { loading, error } = useSelector((state) => state.otp);
  const { loading, error } = useSelector((state) => state.register);
  const navigate = useNavigate();
  //IMPORT STATES
  const {
    currentStep,
    setCurrents,
    registerData,
    setregisterData,
    errors,
    setErrors,
    gender,
    setGender,
    illInput,
    setillInput,
    illneses,
    setillneses,
    setOtp,
    otp,
    resetType,
  } = useRegisterForm();
  const validate = () => {
    let valid = true;
    let newErrors = {
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      civilIdNumber: "",
      birthDate: "",
      address: "",
    };
    //IMPORT STATES

    //VALIDATOR
    const loaclPartRegix = /^[a-z0-9](\.?[a-z0-9]){5,29}/;
    const allowedDomains = [
      "gmail.com",
      "hotmail.com",
      "outlook.com",
      "yahoo.com",
      "icloud.com",
      "live.com",
      "protonmail.com",
      "aol.com",
    ];

    const phoneRegex = /^09\d{8}$/;
    const civilRegex = /^\d{11}$/;
    const nameRegex = /^(?!\s*$)[a-zA-Z\u0600-\u06FF\s'-]{2,30}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
    const email = registerData.email.trim().toLowerCase();
    if (!nameRegex.test(registerData.first_name)) {
      newErrors.firstName = "Please enter a valid first name";
      valid = false;
    }
    if (!nameRegex.test(registerData.last_name)) {
      newErrors.lastName = "Please enter a valid last name";
      valid = false;
    }

    if (!email.includes("@")) {
      newErrors.email = "Email must contain '@' symbol";
      valid = false;
    } else {
      const [localPart, domainPart] = email.split("@");

      if (!localPart || !loaclPartRegix.test(localPart)) {
        newErrors.email = "Invalid characters or format in email username";
        valid = false;
      } else if (!domainPart) {
        newErrors.email = "Email domain is missing";
        valid = false;
      } else if (!allowedDomains.includes(domainPart)) {
        newErrors.email = `Unsupported email domain. Allowed: ${allowedDomains.join(
          ", "
        )}`;
        valid = false;
      }
    }

    if (!phoneRegex.test(registerData.phone)) {
      newErrors.phoneNumber =
        "Phone number must start with 09 and be 10 digits";
      valid = false;
    }
    if (!civilRegex.test(registerData.civil_id_number)) {
      newErrors.civilIdNumber = "Civil ID must be 11 digits";
      valid = false;
    }

    if (!passwordRegex.test(registerData.password)) {
      newErrors.password =
        "Password must be at least 8 characters and contain both letters and numbers";
      valid = false;
    }
    if (registerData.password !== registerData.password_confirmation) {
      newErrors.confirmPassword = "Passwords do not match";
      valid = false;
    }

    if (!registerData.birthday) {
      newErrors.birthDate = "This field is required";
      valid = false;
    }
    if (!registerData.address) {
      newErrors.address = "This field is required";
      valid = false;
    }
    setErrors(newErrors);

    return valid;
  };
  //VALIDATOR

  //STEPPER BUTTON
  const handeCLick = async (direction) => {
    // console.log(direction);
    let newStep = currentStep;
    direction == "next" ? newStep++ : newStep--;

    if (newStep > 0 && newStep <= steps.length) {
      if (newStep == 2) {
        // if (!validate()) return;

        setCurrents(newStep);
        console.log(registerData);
      } else if (newStep == 3) {
        registerData.chronic_diseases = illneses;

        let resultAction = await dispatch(registerUser(registerData));

        if (registerUser.fulfilled.match(resultAction)) {
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
          setCurrents(newStep);
        } else {
          const [message, comp] = resultAction.payload.split(".");
          console.log(resultAction);
          toast.custom((t) => (
            <div className="flex items-center gap-3 bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-md shadow-md">
              <span className="font-bold">
                <CircleX />
              </span>
              <span className="ml-2">{message}</span>
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
        setCurrents(newStep);
      }
    } else if (newStep === 4) {
      const resultAction1 = await dispatch(
        verifyOtp({
          code: otp,
          type: "verify",
          channel: "phone",
          phone: registerData.phone,
        })
      );
      if (verifyOtp.fulfilled.match(resultAction1)) {
        toast.custom((t) => (
          <div className="flex items-center gap-3 bg-green-50 border-l-4 border-curawell text-curawell p-4 rounded-md shadow-md">
            {/* <span className="font-bold"></span> */}
            <span className="ml-2 font-bold font-cairo">
              Account Successfully Created
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
    }
  };
  //STEPPER BUTTON

  return (
    <div className="flex flex-col  lg:mx-96 items-center bg-gray-100 shadow-xl">
      <img className="w-screen h-80" src="src/assets/register.png" alt="" />
      <h1 className="text-curawell font-cairo font-bold text-2xl mt-10">
        Sign In
      </h1>
      <div className=" w-full ">
        <Stepper steps={steps} currentStep={currentStep} />
      </div>

      <br />

      <hr className="w-11/12 my-4 border-blimo" />
      {loading ? (
        <Loader />
      ) : (
        <StepperContext.Provider
          value={{
            registerData,
            setregisterData,
            errors,
            gender,
            setGender,
            illInput,
            setillInput,
            illneses,
            setillneses,
            otp,
            setOtp,
            resetType,
          }}
        >
          {displaySteps(currentStep)}
        </StepperContext.Provider>
      )}

      <div className="w-full flex justify-center mt-5">
        <StepperControl
          handelClick={handeCLick}
          currentStep={currentStep}
          steps={steps}
        />
      </div>
    </div>
  );
}
