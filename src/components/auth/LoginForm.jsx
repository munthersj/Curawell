/* eslint-disable no-unused-vars */
import { PhoneCall } from "lucide-react";
import DataInputs from "./miniComponents/DataInput";
import useLoginForm from "../../hooks/useLoginForm";
import LoginInputs from "./miniComponents/LoignInputs";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../features/auth/loginSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { CircleX } from "lucide-react";
import GoogleLoginButton from "./google/GoogleLOginButton";
export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loginData, setloginData, setErrors, errors } = useLoginForm();

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

  async function handelSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    const result = await dispatch(loginUser(loginData));
    if (loginUser.fulfilled.match(result)) {
      toast.custom((t) => (
        <div className="flex items-center gap-3 bg-green-50 border-l-4 border-curawell text-curawell p-4 rounded-md shadow-md">
          {/* <span className="font-bold"></span> */}
          <span className="ml-2 font-bold font-cairo">
            Succesfully logged in
          </span>
          <button
            onClick={() => toast.dismiss(t)}
            className="ml-auto text-curawell hover:text-black font-bold cursor-pointer"
          >
            <CircleX className="" />
          </button>
        </div>
      ));
      navigate("/home");
    } else {
      const [message, _] = result.payload.split(".");
      console.log(result);
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
  }
  return (
    /***MAIN CONTAINER***/
    <div className="flex flex-col md:flex-row h-screen w-screen overflow-hidden">
      {/* IMG CONTAINER */}
      <div className="hidden md:block md:w-3/5 h-full">
        <img
          src="src/assets/login.png"
          alt="login"
          className="w-full h-full object-cover"
        />
      </div>

      {/* LOGIN FORM CONTAINER */}
      <div className="w-full md:w-2/5 bg-white flex items-center justify-center">
        <div className="w-full h-full max-h-screen overflow-y-auto px-6 sm:px-10 md:px-12 lg:px-16">
          <div className="min-h-screen flex flex-col justify-center py-8">
            <h1 className="text-curawell font-bold font-cairo text-3xl md:text-4xl mb-6 text-center md:text-left">
              Welcome!
            </h1>

            <form className="space-y-4" onSubmit={handelSubmit}>
              {LoginInputs({ loginData, errors, setloginData })}

              <div className="flex justify-between flex-wrap text-xs font-cairo">
                <div className="flex">
                  <span className=" text-black font-cairo font-bold">
                    I don't have an account yet,
                  </span>
                  <button
                    type="button"
                    className="ml-1  text-curawell underline font-cairo font-bold"
                    onClick={() => navigate("/register")}
                  >
                    SignUp
                  </button>
                </div>
                <button
                  type="button"
                  className=" text-curawell underline font-cairo font-bold"
                  onClick={() => navigate("/resetPassword")}
                >
                  Forget my password
                </button>
              </div>

              <hr className="mt-6 border-gray-300" />

              <div className="flex flex-col gap-4 items-center w-full mt-2">
                <button
                  type="submit"
                  className="w-full bg-curawell rounded-lg py-3 text-white font-cairo hover:bg-curawell/80 transition-all"
                >
                  {loading ? (
                    <span className="animate-pulse">Loading...</span>
                  ) : (
                    "Login"
                  )}
                </button>
                <span className="text-xs font-bold text-black">
                  or login via
                </span>
                <GoogleLoginButton />
                {/* <button
                  type="button"
                  className="w-full bg-curawell rounded-lg py-3 text-white font-cairo hover:bg-curawell/80 transition-all"
                >
                  Google
                </button> */}
              </div>
            </form>

            <div className="mt-6">
              <h4 className="font-bold font-cairo text-black">
                For all questions:
              </h4>
              <div className="flex justify-center items-center mt-3 p-2.5 bg-gray-100 rounded-md border border-gray-400 text-sm font-bold font-cairo text-black">
                <PhoneCall className="text-curawell mr-3" />
                +963 984939389
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    /***MAIN CONTAINER***/
  );
}
