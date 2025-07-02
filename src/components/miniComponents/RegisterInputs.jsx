import DataInputs from "./DataInput";
export default function RegisterInputs({
  registerData,
  errors,
  setregisterData,
}) {
  const inputsTitles = [
    {
      placeholder: "Enter your firstname",
      label: "First Name",
      value: registerData.FirstName,
      errors: errors.firstName,
      pass: false,

      onChange: (e) => {
        setregisterData((prev) => ({ ...prev, FirstName: e.target.value }));
      },
    },
    {
      placeholder: "Enter your lastname",
      label: "Last Name",
      value: registerData.LastName,
      errors: errors.lastName,
      pass: false,

      onChange: (e) => {
        setregisterData((prev) => ({ ...prev, LastName: e.target.value }));
      },
    },
    {
      placeholder: "Enter your email",
      label: "Email",
      value: registerData.Email,
      pass: false,
      errors: errors.email,
      onChange: (e) => {
        setregisterData((prev) => ({ ...prev, Email: e.target.value }));
      },
    },
    {
      placeholder: "Confirm your phone number",
      label: "PhoneNumber",
      value: registerData.PhoneNumber,
      errors: errors.phoneNumber,
      pass: false,

      onChange: (e) => {
        setregisterData((prev) => ({
          ...prev,
          PhoneNumber: e.target.value,
        }));
      },
    },
    {
      placeholder: "Enter your civil id number",
      label: "Civil Id number",
      value: registerData.CivilIdNumber,
      errors: errors.civilIdNumber,
      pass: false,

      onChange: (e) => {
        setregisterData((prev) => ({ ...prev, CivilIdNumber: e.target.value }));
      },
    },
    {
      placeholder: "Enter your address",
      label: "Address",
      value: registerData.Address,
      errors: errors.address,
      pass: false,

      onChange: (e) => {
        setregisterData((prev) => ({ ...prev, Address: e.target.value }));
      },
    },
    {
      placeholder: "Enter your password",
      label: "Password",
      value: registerData.Password,
      errors: errors.password,
      pass: true,
      onChange: (e) => {
        setregisterData((prev) => ({ ...prev, Password: e.target.value }));
      },
    },
    {
      placeholder: "Confirm your password",
      label: "ConfirmPassword",
      value: registerData.ConfirmPassword,
      errors: errors.confirmPassword,
      pass: true,

      onChange: (e) => {
        setregisterData((prev) => ({
          ...prev,
          ConfirmPassword: e.target.value,
        }));
      },
    },
    {
      placeholder: "",
      label: "BirthDate",
      value: registerData.BirthDate,
      errors: errors.birthDate,
      pass: false,

      onChange: (e) => {
        setregisterData((prev) => ({ ...prev, BirthDate: e.target.value }));
      },
    },
  ];
  const inputs = inputsTitles.map((props) => {
    return <DataInputs key={props.label} {...props} />;
  });

  return inputs;
}
