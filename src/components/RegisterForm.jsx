/* eslint-disable no-unused-vars */
import useRegisterForm from "../hooks/useRegisterForm";
import RegisterInputs from "./miniComponents/RegisterInputs";
import StepperControl from "./StepperControl";
import Stepper from "./Stepper";
import BasicDeatails from "./Register/BasicDeatails";
import MedicalDeatails from "./Register/MedicalDeatails";
import Opt from "./Register/Otp";
import { registerUser } from "../features/auth/registerSlice";
import { verifyOtp } from "../features/auth/otpSlice";
import { useDispatch, useSelector } from "react-redux";
import { StepperContext } from "../context/StepperContext";
import Otp from "./Register/Otp";
const steps = ["Basic Deatails", "Medical Deatails", "OTP"];

const displaySteps = (step) => {
  switch (step) {
    case 1:
      return <BasicDeatails />;
    case 2:
      return <MedicalDeatails />;
    case 3:
      return <Opt />;
  }
};

export default function RegisterForm() {
  const dispatch = useDispatch();
  // const navigate = useNavigate()
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
    const emailRegex = /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^09\d{8}$/;
    const civilRegex = /^\d{11}$/;
    if (!emailRegex.test(registerData.Email)) {
      newErrors.email = "Please enter a valid email address";
      valid = false;
    }
    if (!phoneRegex.test(registerData.PhoneNumber)) {
      newErrors.phoneNumber = "Please enter a valid phone number";
      valid = false;
    }
    if (!civilRegex.test(registerData.CivilIdNumber)) {
      newErrors.civilIdNumber = "Please enter a valid civil id";
      valid = false;
    }
    if (registerData.FirstName.length < 4) {
      newErrors.firstName = "Must be at least 4 characters ";
      valid = false;
    }
    if (registerData.LastName.length < 4) {
      newErrors.lastName = "Must be at least 4 characters ";
      valid = false;
    }
    if (registerData.Password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      valid = false;
    }
    if (registerData.Password != registerData.ConfirmPassword) {
      newErrors.confirmPassword = "Password does not match";
      valid = false;
    }
    if (registerData.BirthDate == "") {
      newErrors.birthDate = "This field is required";
      valid = false;
    }
    if (registerData.Address == "") {
      newErrors.address = "This field is required";
      valid = false;
    }
    setErrors(newErrors);

    return valid;
  };
  //VALIDATOR

  //STEPPER BUTTON
  const handeCLick = async (direction) => {
    // if (!validate()) return;
    let newStep = currentStep;
    direction == "next" ? newStep++ : newStep--;
    if (newStep > 0 && newStep <= steps.length) {
      if (newStep == 3) {
        const resultAction = await dispatch(registerUser(registerData));

        if (registerUser.fulfilled.match(resultAction)) {
          localStorage.setItem("token", resultAction.payload.token);
          setCurrents(newStep);
        }
      } else {
        setCurrents(newStep);
      }

      setCurrents(newStep);
    } else {
      console.log(otp);
      const resultAction1 = await dispatch(verifyOtp(otp));
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
        }}
      >
        {displaySteps(currentStep)}
      </StepperContext.Provider>

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
