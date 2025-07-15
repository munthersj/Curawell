import { StepperContext } from "../../../context/StepperContext";
import { useContext, useState } from "react";
import { EyeOff, Eye } from "lucide-react";

export default function ResetPassPage() {
  const [focus, setFocus] = useState(false);
  const { errors1, inputs, setInputs, isVisibleVal, setisVisibleVal } =
    useContext(StepperContext);
  return (
    <div className="w-full h-full flex flex-col items-center">
      <h1 className="text-curawell font-bold font-cairo text-3xl mb-6 ">
        Reset Your Password!
      </h1>
      <form className="w-1/2">
        <div
          className={`flex p-3.5   mt-3  bg-grayc rounded-md border border-gray-400  text-sm font-cairo text-gray-400 `}
        >
          <input
            onFocus={() => {
              setFocus(true);
            }}
            onChange={(e) => {
              setInputs((prev) => ({ ...prev, password: e.target.value }));
            }}
            value={inputs.password}
            className={`w-full h-full bg-grayc text-sm font-cairo  ${
              focus != "" ? "text-black" : "text-gray-400"
            } focus:text-black  focus:outline-0 focus:text-md  focus:p-1 transition-all `}
            type={isVisibleVal ? "text" : "password"}
            placeholder={`Enter your new password`}
          />
          <button
            type="button"
            className="hover:cursor-pointer"
            onClick={() => {
              isVisibleVal ? setisVisibleVal(false) : setisVisibleVal(true);
            }}
          >
            {isVisibleVal ? <Eye /> : <EyeOff />}
          </button>
        </div>
        {errors1.password && (
          <p className="text-red-500 text-xs">{errors1.password}</p>
        )}
        <div
          className={` flex  p-3.5   mt-3  bg-grayc rounded-md border border-gray-400  text-sm font-cairo text-gray-400 `}
        >
          <input
            onFocus={() => {
              setFocus(true);
            }}
            onChange={(e) => {
              setInputs((prev) => ({
                ...prev,
                password_confirmation: e.target.value,
              }));
            }}
            value={inputs.password_confirmation}
            className={`w-full h-full bg-grayc text-sm font-cairo  ${
              focus != "" ? "text-black" : "text-gray-400"
            } focus:text-black  focus:outline-0 focus:text-md  focus:p-1 transition-all `}
            type={isVisibleVal ? "text" : "password"}
            placeholder={`Enter your new password confirm`}
          />
          <button
            type="button"
            className="hover:cursor-pointer"
            onClick={() => {
              isVisibleVal ? setisVisibleVal(false) : setisVisibleVal(true);
            }}
          >
            {isVisibleVal ? <Eye /> : <EyeOff />}
          </button>
        </div>

        {errors1.confirmPassword && (
          <p className="text-red-500 text-xs">{errors1.confirmPassword}</p>
        )}
      </form>
    </div>
  );
}
