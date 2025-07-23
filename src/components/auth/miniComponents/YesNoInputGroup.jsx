import { useState } from "react";
import { Check } from "lucide-react";

export default function YesNoInputGroup({ question, placeholder, onChange }) {
  const [hasField, setHasField] = useState(null); // null | true | false
  const [inputs, setInputs] = useState([""]);

  const handleAddInput = () => {
    if (hasField) {
      const updated = [...inputs, ""];
      setInputs(updated);
      onChange && onChange(updated); // أرسل القيم للخارج إذا في onChange
    }
  };

  const handleChange = (index, value) => {
    const updated = [...inputs];
    updated[index] = value;
    setInputs(updated);
    onChange && onChange(updated);
  };

  const handleRemoveInput = (indexToRemove) => {
    const updated = inputs.filter((_, index) => index !== indexToRemove);
    setInputs(updated);
    onChange && onChange(updated);
  };

  return (
    <div className="flex flex-col my-5 px-14 gap-4 w-full">
      {/* السؤال + نعم/لا */}
      <div className="flex items-center gap-4">
        <label className="font-bold font-cairo text-xl text-gray-700">
          {question}
        </label>

        {/* نعم */}
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input
            type="radio"
            name={question}
            className="hidden"
            checked={hasField === true}
            onChange={() => setHasField(true)}
          />
          <span
            className={`w-5 h-5 border rounded-sm flex items-center justify-center ${
              hasField === true ? "bg-curawell text-white" : "border-gray-400"
            }`}
          >
            {hasField === true && <Check size={15} />}
          </span>
          <span>Yes</span>
        </label>

        {/* لا */}
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input
            type="radio"
            name={question}
            className="hidden"
            checked={hasField === false}
            onChange={() => setHasField(false)}
          />
          <span
            className={`w-5 h-5 border rounded-sm flex items-center justify-center ${
              hasField === false ? "bg-curawell text-white" : "border-gray-400"
            }`}
          >
            {hasField === false && <Check size={15} />}
          </span>
          <span>No</span>
        </label>
        <h1 className="font-cairo font-bold text-blimo">
          ( If yes, please specify)
        </h1>
      </div>

      {/* زر الإضافة */}
      <div>
        <button
          onClick={handleAddInput}
          disabled={!hasField}
          className={`px-4 py-2 rounded transition ${
            hasField
              ? "bg-[#cd9bb8] text-curawell hover:bg-curawell hover:text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          + Add Illness
        </button>
      </div>

      {/* الحقول */}
      {hasField && (
        <div className="flex flex-wrap gap-4">
          {inputs.map((value, index) => (
            <div key={index} className="relative w-64">
              <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={(e) => handleChange(index, e.target.value)}
                className="border border-gray-400 p-2 pr-8 rounded w-full"
              />
              <button
                onClick={() => handleRemoveInput(index)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-blimo hover:text-blimo/50"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
