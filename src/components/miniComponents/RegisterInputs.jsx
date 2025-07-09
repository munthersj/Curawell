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
      value: registerData.first_name,
      errors: errors.firstName,
      pass: false,

      onChange: (e) => {
        setregisterData((prev) => ({ ...prev, first_name: e.target.value }));
      },
    },
    {
      placeholder: "Enter your lastname",
      label: "Last Name",
      value: registerData.last_name,
      errors: errors.lastName,
      pass: false,

      onChange: (e) => {
        setregisterData((prev) => ({ ...prev, last_name: e.target.value }));
      },
    },
    {
      placeholder: "Enter your email",
      label: "Email",
      value: registerData.email,
      pass: false,
      errors: errors.email,
      onChange: (e) => {
        setregisterData((prev) => ({ ...prev, email: e.target.value.trim() }));
      },
    },
    {
      placeholder: "Confirm your phone number",
      label: "PhoneNumber",
      value: registerData.phone,
      errors: errors.phoneNumber,
      pass: false,

      onChange: (e) => {
        setregisterData((prev) => ({
          ...prev,
          phone: e.target.value,
        }));
      },
    },
    {
      placeholder: "Enter your civil id number",
      label: "Civil Id number",
      value: registerData.civil_id_number,
      errors: errors.civilIdNumber,
      pass: false,

      onChange: (e) => {
        setregisterData((prev) => ({
          ...prev,
          civil_id_number: e.target.value,
        }));
      },
    },
    {
      placeholder: "Enter your address",
      label: "Address",
      value: registerData.address,
      errors: errors.address,
      pass: false,

      onChange: (e) => {
        setregisterData((prev) => ({ ...prev, address: e.target.value }));
      },
    },
    {
      placeholder: "Enter your password",
      label: "Password",
      value: registerData.password,
      errors: errors.password,
      pass: true,
      onChange: (e) => {
        setregisterData((prev) => ({ ...prev, password: e.target.value }));
      },
    },
    {
      placeholder: "Confirm your password",
      label: "ConfirmPassword",
      value: registerData.password_confirmation,
      errors: errors.confirmPassword,
      pass: true,

      onChange: (e) => {
        setregisterData((prev) => ({
          ...prev,
          password_confirmation: e.target.value,
        }));
      },
    },
    {
      placeholder: "",
      label: "BirthDate",
      value: registerData.birthday,
      errors: errors.birthDate,
      pass: false,

      onChange: (e) => {
        setregisterData((prev) => ({ ...prev, birthday: e.target.value }));
      },
    },
  ];
  const inputs = inputsTitles.map((props) => {
    return <DataInputs key={props.label} {...props} />;
  });

  return inputs;
}
