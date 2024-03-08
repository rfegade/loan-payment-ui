import React, { useState } from "react";
import FormInputs from "./FormInputs";

const Form = () => {
  const [formData, setFormData] = useState({
    loanAccNumber: "",
    accountNumber: "",
    confAccountNumber: "",
    routingNumber: "",
    nameOnCard: "",
    expirationDate: "",
    cardNumber: "",
    cvv: "",
  });

  const [selectedOption, setSelectedOption] = useState("checking");
  const [formErrors, setFormErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    // Extracting name and value from input field
    const { name, value } = e.target;

    const errors = validateFields(name, value);

    // Update the form data with the new value
    setFormData({
      ...formData,
      [name]: value,
    });

    // Update the form errors with the errors for the current field
    setFormErrors({
      ...formErrors,
      [name]: errors[name],
    });
  };

  const validateFields = (name, value) => {
    const errors = {};

    // Validation check for Checking page
    if (selectedOption === "checking") {
      switch (name) {
        case "loanAccNumber":
        case "accountNumber":
        case "confAccountNumber":
        case "routingNumber":
          if (!value) {
            errors[name] = "This field is required";
          } else if (
            !/^\d+$/.test(value) &&
            (name === "loanAccNumber" ||
              name === "accountNumber" ||
              name === "confAccountNumber" ||
              name === "routingNumber")
          ) {
            errors[name] = "Please enter only numbers";
          } else if (value.length !== 9 && name === "routingNumber") {
            errors[name] = "Please enter valid 9 digits routing number";
          } else {
            errors[name] = "";
          }
          break;
        default:
          break;
      }
    } else {
      // Validation check for Debit card page
      switch (name) {
        case "loanAccNumber":
        case "nameOnCard":
        case "expirationDate":
        case "cardNumber":
        case "cvv":
          if (!value) {
            errors[name] = "This field is required";
          } else if (
            !/^\d+$/.test(value) &&
            (name === "loanAccNumber" ||
              name === "cardNumber" ||
              name === "cvv")
          ) {
            errors[name] = "Please enter only numbers";
          } else if (value.length !== 3 && name === "cvv") {
            errors[name] = "Please enter 3 digits CVV";
          } else if (value.length !== 16 && name === "cardNumber") {
            errors[name] = "Please enter valid 16 digits card number";
          } else {
            errors[name] = "";
          }
          break;
        default:
          break;
      }
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = {};

    // Check for empty fields before submission - form should not submit if fields are empty
    for (const field in formData) {
      if (!formData[field]) {
        if (
          (selectedOption === "checking" &&
            field !== "nameOnCard" &&
            field !== "expirationDate" &&
            field !== "cvv" &&
            field !== "cardNumber") ||
          (selectedOption === "debitCard" &&
            field !== "routingNumber" &&
            field !== "accountNumber" &&
            field !== "confAccountNumber")
        ) {
          errors[field] = "This field is required";
        }
      }
    }

    if (Object.keys(errors).length > 0) {
      // set errors if exists
      setFormErrors(errors);
    } else {
      setFormErrors({}); // if no errors, set formErrors to blank object
      setIsSuccess(true);
      console.log("Form submitted:", formData);
    }
  };

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <FormInputs
      handleSubmit={handleSubmit}
      formData={formData}
      handleChange={handleChange}
      formErrors={formErrors}
      selectedOption={selectedOption}
      handleOptionChange={handleOptionChange}
      isSuccess={isSuccess}
    />
  );
};

export default Form;
