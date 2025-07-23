import { useState } from "react";

export default function useRegisterForm() {
  const [gender, setGender] = useState();
  const resetType = "phone";
  const [registerData, setregisterData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
    birthday: "",
    civil_id_number: "",
    address: "",
    phone: "",
    gender: "",
    hereditary_diseases: [],
    allergies: [],
    chronic_diseases: [],
    blood_group: "A+",
    weight: 0,
    alternative_phone: "0988123456",
    height: 0,
  });
  const [isVisibleVal, setisVisibleVal] = useState(false);
  const [currentStep, setCurrents] = useState(1);
  const [newStep, setNewStep] = useState([]);
  const [illneses, setillneses] = useState([]);
  const [illInput, setillInput] = useState("");
  const [otp, setOtp] = useState("");

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    civilIdNumber: "",
    birthDate: "",
    address: "",
  });
  return {
    registerData,
    setregisterData,
    isVisibleVal,
    setisVisibleVal,
    errors,
    setErrors,
    currentStep,
    setCurrents,
    newStep,
    setNewStep,
    gender,
    setGender,
    illneses,
    setillneses,
    illInput,
    setillInput,
    otp,
    setOtp,
    resetType,
  };
}
