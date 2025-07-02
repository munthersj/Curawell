/* eslint-disable no-unused-vars */
import { PhoneCall } from "lucide-react";
import DataInputs from "./miniComponents/DataInput";
import useLoginForm from "../hooks/useLoginForm";
import LoginInputs from "./miniComponents/LoignInputs";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/loginSlice";
import { useNavigate } from "react-router-dom";
export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loginData, setloginData, setErrors, errors } = useLoginForm();
  const { loading, error } = useSelector((state) => state.login);

  const validate = () => {
    let valid = true;
    let newErrors = { email: "", password: "" };

    const emailRegex = /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(loginData.Email)) {
      newErrors.email = "Please enter a valid email address";
      valid = false;
    }

    if (loginData.Password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      valid = false;
    }

    setErrors(newErrors);

    return valid;
  };

  function handelSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    dispatch(loginUser(loginData));
  }
  return (
    /***MAIN CONTAINER***/
    <div className="md:flex md:flex-row md:h-screen  w-screen justify-center items-center ">
      {/***IMG CONTAINER***/}
      <div className="bg-gray-300 md:h-screen md:w-3/5 p-0  hidden md:block  ">
        <img
          className="md:h-screen w-screen object-cover "
          src="src/assets/login.png"
        />
      </div>
      {/***IMG CONTAINER***/}

      {/***LOGIN FORM CONTAINER***/}
      <div className=" bg-white h-screen md:w-2/5">
        <div className=" flex flex-col m-11 md:m-16">
          <h1 className="text-curawell font-bold font-cairo text-4xl mb-6 ">
            Welcome!
          </h1>
          <form>
            {LoginInputs({ loginData, errors, setloginData })}
            <div className="flex ml-3">
              <h4 className="text-xs font-bold font-cairo mt-2 text-black">
                I don't have an account yet,
              </h4>
              <a
                className="ml-1 text-xs font-bold font-cairo mt-2 text-curawell underline"
                href=""
              >
                SignUp
              </a>
            </div>
            <hr className="mt-9 border-gray-400" />
            <div className="flex flex-col justify-center items-center mx-3.5">
              <button
                type="submit"
                onClick={handelSubmit}
                className=" w-full mt-2  bg-curawell rounded-lg p-3.5 text-white font-cairo hover:cursor-pointer hover:bg-curawell/80 transition-all"
              >
                {!loading ? "Login" : "glgeg"}
              </button>
              <h4 className="text-xs font-bold font-cairo mt-5 mb-3 text-black">
                or login via
              </h4>
              <button
                type="button"
                className=" w-full bg-curawell rounded-lg p-3.5 text-white font-cairo hover:cursor-pointer hover:bg-curawell/80 transition-all duration-500"
              >
                Google
              </button>
            </div>
          </form>
          <h4 className="font-bold font-cairo mt-5 text-black">
            For all questions:
          </h4>
          <div className="flex justify-center items-center mt-3 p-2.5 bg-grayc rounded-md border border-gray-400 text-lg font-bold font-cairo text-black">
            <PhoneCall className="text-curawell mr-5" />
            +963 984939389
          </div>
        </div>
      </div>
      {/***LOGIN FORM CONTAINER***/}
    </div>

    /***MAIN CONTAINER***/
  );
}
