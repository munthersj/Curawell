import DataInputs from "./DataInput";
export default function LoginInputs({ loginData, errors, setloginData }) {
  const inputsTitles = [
    {
      placeholder: "Enter your email",
      label: "Email",
      value: loginData.Email,
      pass: false,
      errors: errors.email,
      onChange: (e) => {
        setloginData((prev) => ({ ...prev, Email: e.target.value }));
      },
    },
    {
      placeholder: "Enter your password",
      label: "Password",
      value: loginData.Password,
      errors: errors.password,
      pass: true,

      onChange: (e) => {
        setloginData((prev) => ({ ...prev, Password: e.target.value }));
      },
    },
  ];
  const inputs = inputsTitles.map((props) => {
    return <DataInputs key={props.label} {...props} />;
  });
  return inputs;
}
