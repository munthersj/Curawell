/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { StepperContext } from "../../../context/StepperContext";
import YesNoInputGroup from "../miniComponents/YesNoInputGroup";
export default function MedicalDeatails() {
  const content = useContext(StepperContext);

  const bloodOptions = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  const handleIllnessChange3 = (illnessList) => {
    // console.log("قائمة الأمراض:", illnessList1);
    content.registerData.chronic_diseases = illnessList;
  };
  const handleIllnessChange1 = (illnessList) => {
    // console.log("قائمة الأمراض:", illnessList);
    content.registerData.hereditary_diseases = illnessList;
  };
  const handleIllnessChange2 = (illnessList) => {
    // console.log("قائمة الأمراض:", illnessList);
    content.registerData.allergies = illnessList;
  };

  const handleBloodChange = (e) => {
    const selectedBlood = e.target.value;
    content.registerData.blood_group = selectedBlood;
  };
  const handleHeightChange = (e) => {
    const height = e.target.value;
    content.registerData.height = height;
  };
  const handleWeightChange = (e) => {
    const weight = e.target.value;
    content.registerData.weight = weight;
  };
  return (
    <div className="flex flex-col w-full justify-center items-center gap-3">
      <div className="text-start w-11/12 mt-5 text-blimo font-bold font-cairo text-2xl ml-5">
        Medical History{" "}
      </div>
      <hr className="w-11/12  border-blimo" />
      <YesNoInputGroup
        question="Do you have any chronic illnesses?"
        placeholder="Enter illness name"
        onChange={handleIllnessChange3}
      />
      <YesNoInputGroup
        question="Do you have any hereditary disease?"
        placeholder="Enter illness name"
        onChange={handleIllnessChange1}
      />
      <YesNoInputGroup
        question="Do you have any allergies ?"
        placeholder="Enter allergie name"
        onChange={handleIllnessChange2}
      />

      <div className="text-start w-11/12 mt-5 text-blimo font-bold font-cairo text-2xl ml-5">
        Patient Basic Information{" "}
      </div>
      <hr className="w-11/12  border-blimo" />
      <div className="flex w-11/12 gap-5 px-5 ">
        <label>
          <h1 className="font-bold font-cairo">Height</h1>
          <input
            onChange={handleHeightChange}
            type="number"
            placeholder="Enter your Height"
            className="border border-gray-400 p-2 rounded w-full"
          />
        </label>

        <label>
          <h1 className="font-bold font-cairo">Weight</h1>
          <input
            onChange={handleWeightChange}
            type="number"
            placeholder="Enter your Weight"
            className="border border-gray-400 p-2 rounded w-full"
          />
        </label>
        <label>
          <h1 className="font-bold font-cairo">Blood</h1>
          <select
            onChange={handleBloodChange}
            className="border border-gray-400 p-2 rounded w-full"
          >
            <option value="">Enter your Blood type</option>
            {bloodOptions.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}
