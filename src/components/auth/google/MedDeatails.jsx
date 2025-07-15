/* eslint-disable no-unused-vars */
import GoogleInputs from "../miniComponents/googleInputs";
import useGoogleLogin from "../../../hooks/useGoogleLogin";
import { useContext, useState } from "react";
import UploadAvatar from "../miniComponents/UploadAvatar";
export default function MedDeatails() {
  const {
    googleData,
    setgoogleData,
    errors,
    setErrors,
    gender,
    setGender,
    illInput,
    setillInput,
    illneses,
    setillneses,
  } = useGoogleLogin();

  // const [selected, setSelected] = useState("option1");
  return (
    <div className="flex flex-col bg-gray-200 justify-center  items-center h-full lg:mx-96 ">
      <h1 className="text-4xl text-curawell font-cairo font-bold">
        Enter Your Deatails
      </h1>
      <div className="flex flex-col items-center justify-center w-full ">
        <form className="w-11/12 " action="">
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10 w-full ">
            {GoogleInputs({
              googleData: googleData,
              errors: errors,
              setgoogleData: setgoogleData,
            })}
            <div className="flex flex-col justify-around w-full md:mt-0 mt-5 ">
              <h4 className="font-bold font-cairo  text-black">Gender</h4>
              <div className="flex items-end justify-center ">
                <label className="flex items-center cursor-pointer mr-5">
                  <input
                    type="radio"
                    name="option"
                    value="male"
                    className="hidden w-full"
                    checked={gender === "male"}
                    onChange={() => setGender("male")}
                  />
                  <div
                    className={` w-5 h-5 transition duration-300 rounded-2xl border-2 flex items-center justify-center 
            ${
              gender === "male"
                ? "bg-curawell border-curawell"
                : "border-gray-400"
            }`}
                  >
                    {gender === "male" && (
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
                    checked={gender === "female"}
                    onChange={() => setGender("female")}
                  />
                  <div
                    className={`w-5 h-5  transition duration-300 rounded-2xl border-2 flex items-center justify-center 
            ${
              gender === "female"
                ? "bg-curawell border-curawell"
                : "border-gray-400"
            }`}
                  >
                    {gender === "female" && (
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
        <button className="w-1/2 mt-10 bg-curawell rounded-lg py-3 text-white font-cairo hover:bg-curawell/80 transition-all ">
          Continue
        </button>
      </div>
    </div>
  );
}
