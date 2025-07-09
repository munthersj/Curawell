import { useState } from "react";

export default function useLoginForm() {
  const [loginData, setloginData] = useState({
    login: "",
    password: "",
  });
  const [isVisibleVal, setisVisibleVal] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });
  return {
    loginData,
    setloginData,
    isVisibleVal,
    setisVisibleVal,
    errors,
    setErrors,
  };
}
