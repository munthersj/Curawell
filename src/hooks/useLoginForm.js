import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function useLoginForm() {
  const [loginData, setloginData] = useState({
    login: "",
    password: "",
  });
  const [isVisibleVal, setisVisibleVal] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.login);

  const validate = () => {
    let valid = true;
    let newErrors = { email: "", password: "" };

    const emailRegex = /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^09\d{8}$/;
    if (!emailRegex.test(loginData.login)) {
      if (phoneRegex.test(loginData.login)) {
        valid = true;
      } else {
        newErrors.email = "Please enter a valid Credit";
        valid = false;
      }
    }

    if (loginData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      valid = false;
    }

    setErrors(newErrors);

    return valid;
  };

  return {
    loginData,
    setloginData,
    isVisibleVal,
    setisVisibleVal,
    errors,
    setErrors,
    loading,
    error,
    dispatch,
    validate,
    navigate,
  };
}
