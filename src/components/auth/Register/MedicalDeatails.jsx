/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { StepperContext } from "../../../context/StepperContext";
import IllCard from "../miniComponents/IllCard";
import { Check } from "lucide-react";
import YesNoInputGroup from "../miniComponents/YesNoInputGroup";
export default function MedicalDeatails() {
  const content = useContext(StepperContext);
  content.registerData.gender = content.gender;

  // const [inputs, setInputs] = useState([""]);
  // const [hasIllness, setHasIllness] = useState(false); // checkbox: yes/no

  // const handleAddInput = () => {
  //   if (hasIllness) {
  //     setInputs([...inputs, ""]);
  //   }
  // };

  // const handleChange = (index, value) => {
  //   const newInputs = [...inputs];
  //   newInputs[index] = value;
  //   setInputs(newInputs);
  // };

  // const handleRemoveInput = (indexToRemove) => {
  //   const filteredInputs = inputs.filter((_, index) => index !== indexToRemove);
  //   setInputs(filteredInputs);
  // };

  const handleIllnessChange = (illnessList) => {
    console.log("قائمة الأمراض:", illnessList);
    // content.registerData.illnesses = illnessList; ← إذا كنت تستخدم Context
  };
  return (
    <div className="flex flex-col w-full justify-center items-center gap-3">
      {/* ✅ CheckBox */}
      {/* <div className="flex items-center gap-4 w-full px-10">
        <label className=" text-gray-700 font-cairo font-bold text-xl ">
          Do you have any chronic illnesses?
        </label>
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input
            type="radio"
            name="hasIllness"
            className="hidden"
            checked={hasIllness === true}
            onChange={() => setHasIllness(true)}
          />
          <span
            className={`w-5 h-5 border rounded-sm flex items-center justify-center ${
              hasIllness === true ? "bg-curawell text-white" : "border-gray-400"
            }`}
          >
            {hasIllness === true && <Check size={15} />}
          </span>
          <span>Yes</span>
        </label>
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input
            type="radio"
            name="hasIllness"
            className="hidden"
            checked={hasIllness === false}
            onChange={() => setHasIllness(false)}
          />
          <span
            className={`w-5 h-5 border rounded-sm flex items-center justify-center ${
              hasIllness === false
                ? "bg-curawell text-white"
                : "border-gray-400"
            }`}
          >
            {hasIllness === false && <Check size={15} />}
          </span>
          <span>No</span>
        </label>
        <h1 className="font-cairo font-bold text-blimo">
          ( If yes, please specify)
        </h1>
      </div> */}

      {/* ✅ زر الإضافة */}
      {/* <div className="flex justify-start w-full px-10">
        <button
          onClick={handleAddInput}
          disabled={!hasIllness}
          className={`px-4 py-2 rounded transition ${
            hasIllness
              ? "bg-[#cd9bb8] text-curawell hover:bg-curawell hover:text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          + Add Illness
        </button>
      </div> */}

      {/* ✅ الحقول */}
      {/* <div className=" px-10 py-5 flex flex-wrap w-full gap-15">
        {hasIllness &&
          inputs.map((value, index) => (
            <div key={index} className="relative w-64">
              <input
                type="text"
                className="border bg-[#ececec] border-gray-400 px-4 py-3    rounded-lg w-full"
                placeholder="Enter your illness"
                value={value}
                onChange={(e) => handleChange(index, e.target.value)}
              />
              <button
                onClick={() => handleRemoveInput(index)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-blimo hover:text-blimo/50"
                title="Remove"
              >
                ✕
              </button>
            </div>
          ))}
      </div> */}
      <YesNoInputGroup
        question="Do you have any chronic illnesses?"
        placeholder="اكتب اسم المرض"
        onChange={handleIllnessChange}
      />
    </div>
  );
}
