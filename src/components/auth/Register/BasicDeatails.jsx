/* eslint-disable no-unused-vars */
import RegisterInputs from "../miniComponents/RegisterInputs";
import { StepperContext } from "../../../context/StepperContext";
import { useContext, useState } from "react";
import UploadAvatar from "../miniComponents/UploadAvatar";
export default function BasicDeatails() {
  const content = useContext(StepperContext);
  // const [selected, setSelected] = useState("option1");
  return (
    <div className="flex flex-col items-center justify-center w-full  ">
      <div className="felx flex-col">
        <UploadAvatar />
      </div>
      <form className="w-11/12 " action="">
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10 w-full ">
          {RegisterInputs({
            registerData: content.registerData,
            errors: content.errors,
            setregisterData: content.setregisterData,
          })}
          <div className="flex flex-col justify-around w-full md:mt-0 mt-5 ">
            <h4 className="font-bold font-cairo  text-black">Gender</h4>
            <div className="flex items-end justify-center">
              <label className="flex items-center cursor-pointer mr-5">
                <input
                  type="radio"
                  name="option"
                  value="male"
                  className="hidden w-full"
                  checked={content.gender === "male"}
                  onChange={() => content.setGender("male")}
                />
                <div
                  className={` w-5 h-5 transition duration-300 rounded-2xl border-2 flex items-center justify-center 
            ${
              content.gender === "male"
                ? "bg-curawell border-curawell"
                : "border-gray-400"
            }`}
                >
                  {content.gender === "male" && (
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>
                <span className="ml-2"> Male</span>
              </label>

              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="option"
                  value="female"
                  className="hidden w-full  "
                  checked={content.gender === "female"}
                  onChange={() => content.setGender("female")}
                />
                <div
                  className={`w-5 h-5  transition duration-300 rounded-2xl border-2 flex items-center justify-center 
            ${
              content.gender === "female"
                ? "bg-curawell border-curawell"
                : "border-gray-400"
            }`}
                >
                  {content.gender === "female" && (
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>
                <span className="ml-2">Female</span>
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
