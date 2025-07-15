import DataInputs from "./DataInput";
export default function LoginInputs({ loginData, errors, setloginData }) {
  const inputsTitles = [
    {
      placeholder: "Enter your email or phone number",
      label: "Login",
      value: loginData.login,
      pass: false,
      errors: errors.email,
      onChange: (e) => {
        setloginData((prev) => ({ ...prev, login: e.target.value }));
      },
    },
    {
      placeholder: "Enter your password",
      label: "Password",
      value: loginData.password,
      errors: errors.password,
      pass: true,

      onChange: (e) => {
        setloginData((prev) => ({ ...prev, password: e.target.value }));
      },
    },
  ];
  const inputs = inputsTitles.map((props) => {
    return <DataInputs key={props.label} {...props} />;
  });
  return inputs;
}
