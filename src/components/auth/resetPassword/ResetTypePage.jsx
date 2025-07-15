import { StepperContext } from "../../../context/StepperContext";
import { Mail, Phone } from "lucide-react";

import { useContext } from "react";
export default function RestTypePage() {
  const { resetType, setResetType } = useContext(StepperContext);
  return (
    <>
      <h1 className="text-curawell font-bold font-cairo text-4xl mb-6 ">
        Forget Your Password?
      </h1>
      <h4 className="text-gray-400 font-cairo">
        Please Select option to send verfiication code{" "}
      </h4>
      <div className="flex mt-14 ">
        <input
          checked={resetType == "email"}
          type="radio"
          name="resetType"
          id="1"
          className="hidden"
          onChange={() => {
            setResetType("email");
          }}
        />
        <label
          htmlFor="1"
          className={`${
            resetType == "email" ? "border-curawell " : "border-grayc"
          }  border-2 rounded-2xl cursor-pointer   transition-all duration-500 p-5`}
        >
          <div className="flex justify-center items-center">
            <div className="flex justify-start">
              <Mail
                className={`${
                  resetType == "email"
                    ? "text-curawell "
                    : "text-gray-300 transition-all duration-500"
                }`}
                size={40}
              />
            </div>
            <div className="flex flex-col justify-start ">
              <h3
                className={`${
                  resetType == "email" ? "text-curawell " : ""
                } font-cairo font-bold ml-4 transition-all duration-500 `}
              >
                Reset via Email{" "}
              </h3>
              <h4 className="text-gray-400 font-cairo ml-4  ">
                we will send a verfiication code to your
                <br /> email{"   "}
              </h4>
            </div>
          </div>
        </label>
      </div>
      <div className="flex mt-10 ">
        <input
          type="radio"
          name="resetType"
          id="2"
          className="hidden"
          checked={resetType === "phone"}
          onChange={() => {
            setResetType("phone");
          }}
        />
        <label
          htmlFor="2"
          className={`${
            resetType == "phone" ? "border-curawell " : "border-grayc"
          } border-2 rounded-2xl p-5 cursor-pointer transition-all duration-700`}
        >
          <div className="flex justify-center items-center ">
            <div className="flex justify-start">
              <Phone
                className={`${
                  resetType == "phone"
                    ? "text-curawell "
                    : "text-gray-300 transition-all duration-500"
                }`}
                size={40}
              />
            </div>
            <div className="">
              <h3
                className={`${
                  resetType == "phone" ? "text-curawell " : ""
                } font-cairo font-bold ml-4 transition-all duration-500`}
              >
                Reset via whatsapp{" "}
              </h3>
              <h4 className="text-gray-400 font-cairo ml-4    ">
                we will send a verfiication code to your <br /> whatsapp
              </h4>
            </div>
          </div>
        </label>
      </div>
    </>
  );
}
