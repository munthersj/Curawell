import { Eye } from "lucide-react";
import { EyeOff } from "lucide-react";
import useLoginForm from "../../hooks/useLoginForm";

export default function DataInputs(props) {
  const { isVisibleVal, setisVisibleVal } = useLoginForm();

  return (
    <div>
      <h4 className="font-bold font-cairo mt-5 text-black">{props.label}</h4>
      <div
        className={`w-full flex p-3.5 justify-center items-center mt-3  bg-grayc rounded-md border border-gray-400  text-sm font-cairo text-gray-400 `}
      >
        <input
          onChange={props.onChange}
          value={props.value}
          className={`w-full bg-grayc text-sm font-cairo  ${
            props.value != "" ? "text-black" : "text-gray-400"
          } focus:text-black  focus:outline-0 focus:text-md  focus:p-1 transition-all `}
          type={
            props.label === "BirthDate"
              ? "date"
              : !isVisibleVal && props.pass
              ? "password"
              : props.label === "Gender"
              ? "radio"
              : "text"
          }
          placeholder={props.placeholder}
        />
        {props.pass ? (
          <button
            type="button"
            className="hover:cursor-pointer"
            onClick={() => {
              isVisibleVal ? setisVisibleVal(false) : setisVisibleVal(true);
            }}
          >
            {isVisibleVal ? <Eye /> : <EyeOff />}
          </button>
        ) : (
          <></>
        )}
      </div>
      {props.errors && <p className="text-red-500 text-xs">{props.errors}</p>}
    </div>
  );
}
