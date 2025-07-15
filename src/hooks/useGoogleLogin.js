import { useState } from "react";

export default function useGoogleLogin() {
  const [gender, setGender] = useState();
  //   const resetType = "phone";
  const [googleData, setgoogleData] = useState({
    first_name: "",
    last_name: "",
    birthday: "",
    civil_id_number: "",
    address: "",
    phone: "",
    chronic_diseases: [],
    hereditary_diseases: [],
    allergies: [],
    blood_group: "A+",
    weight: "75",
    height: "180",
  });
  const [isVisibleVal, setisVisibleVal] = useState(false);
  //   const [currentStep, setCurrents] = useState(1);
  //   const [newStep, setNewStep] = useState([]);
  const [illneses, setillneses] = useState([]);
  const [illInput, setillInput] = useState("");
  //   const [otp, setOtp] = useState("");

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    civilIdNumber: "",
    birthDate: "",
    address: "",
  });
  return {
    googleData,
    setgoogleData,
    isVisibleVal,
    setisVisibleVal,
    errors,
    setErrors,
    illneses,
    setillneses,
    illInput,
    setillInput,
    setGender,
    gender,
  };
}
