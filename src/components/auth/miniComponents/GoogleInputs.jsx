import DataInputs from "./DataInput";
export default function GoogleInputs({ googleData, errors, setgoogleData }) {
  const inputsTitles = [
    {
      placeholder: "Enter your firstname",
      label: "First Name",
      value: googleData.first_name,
      errors: errors.firstName,
      pass: false,

      onChange: (e) => {
        setgoogleData((prev) => ({ ...prev, first_name: e.target.value }));
      },
    },
    {
      placeholder: "Enter your lastname",
      label: "Last Name",
      value: googleData.last_name,
      errors: errors.lastName,
      pass: false,

      onChange: (e) => {
        setgoogleData((prev) => ({ ...prev, last_name: e.target.value }));
      },
    },

    {
      placeholder: "Confirm your phone number",
      label: "PhoneNumber",
      value: googleData.phone,
      errors: errors.phoneNumber,
      pass: false,

      onChange: (e) => {
        setgoogleData((prev) => ({
          ...prev,
          phone: e.target.value,
        }));
      },
    },
    {
      placeholder: "Enter your civil id number",
      label: "Civil Id number",
      value: googleData.civil_id_number,
      errors: errors.civilIdNumber,
      pass: false,

      onChange: (e) => {
        setgoogleData((prev) => ({
          ...prev,
          civil_id_number: e.target.value,
        }));
      },
    },
    {
      placeholder: "Enter your address",
      label: "Address",
      value: googleData.address,
      errors: errors.address,
      pass: false,

      onChange: (e) => {
        setgoogleData((prev) => ({ ...prev, address: e.target.value }));
      },
    },
    // {
    //   placeholder: "Enter your password",
    //   label: "Password",
    //   value: googleData.password,
    //   errors: errors.password,
    //   pass: true,
    //   onChange: (e) => {
    //     setgoogleData((prev) => ({ ...prev, password: e.target.value }));
    //   },
    // },
    // {
    //   placeholder: "Confirm your password",
    //   label: "ConfirmPassword",
    //   value: googleData.password_confirmation,
    //   errors: errors.confirmPassword,
    //   pass: true,

    //   onChange: (e) => {
    //     setgoogleData((prev) => ({
    //       ...prev,
    //       password_confirmation: e.target.value,
    //     }));
    //   },
    // },
    {
      placeholder: "",
      label: "BirthDate",
      value: googleData.birthday,
      errors: errors.birthDate,
      pass: false,

      onChange: (e) => {
        setgoogleData((prev) => ({ ...prev, birthday: e.target.value }));
      },
    },
  ];
  const inputs = inputsTitles.map((props) => {
    return <DataInputs key={props.label} {...props} />;
  });

  return inputs;
}
