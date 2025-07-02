import { useContext } from "react";
import { StepperContext } from "../../context/StepperContext";
import IllCard from "../miniComponents/IllCard";
export default function MedicalDeatails() {
  const content = useContext(StepperContext);
  const inputs = content.illneses.map((props, index) => {
    return <IllCard key={index} name={props}></IllCard>;
  });
  return (
    <div className="flex flex-col w-full justify-center items-center">
      <h4 className="font-cairo text-2xl font-bold">Add Your illneses</h4>
      <div className="flex w-1/2">
        <input
          value={content.illInput}
          onChange={(e) => {
            content.setillInput(e.target.value);
          }}
          className="w-full p-3 bg-grayc text-sm font-cairo focus:text-black  focus:outline-0 focus:text-md  focus:p-1 transition-all border-2 rounded-lg focus:p-3"
          type="text"
        />
        <button
          onClick={() => {
            const newTask = content.illInput;
            content.setillneses([...content.illneses, newTask]);
            content.setillInput("");
          }}
          className="bg-curawell border-2 rounded-lg p-3 text-white "
        >
          Add
        </button>
      </div>

      {inputs}
    </div>
  );
}
