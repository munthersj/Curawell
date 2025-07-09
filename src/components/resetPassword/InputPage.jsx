import { StepperContext } from "../../context/StepperContext";
import { Mail, Phone } from "lucide-react";

import { useContext, useState } from "react";
export default function InputPage() {
  const [focus, setFocus] = useState(false);
  const { input, setInput, resetType, errors } = useContext(StepperContext);
  const content = useContext(StepperContext);
  console.log(content);
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <h1 className="text-curawell font-bold font-cairo text-3xl mb-6 ">
        Enter your {resetType} to continue...
      </h1>
      <div
        className={`w-1/2  p-3.5   mt-3  bg-grayc rounded-md border border-gray-400  text-sm font-cairo text-gray-400 `}
      >
        <form>
          <input
            onFocus={() => {
              setFocus(true);
            }}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            value={input}
            className={`w-full h-full bg-grayc text-sm font-cairo  ${
              focus != "" ? "text-black" : "text-gray-400"
            } focus:text-black  focus:outline-0 focus:text-md  focus:p-1 transition-all `}
            type="text"
            placeholder={`Enter your ${resetType}`}
          />
        </form>
      </div>
      {errors && <p className="text-red-500 text-xs">{errors}</p>}
    </div>
  );
}
