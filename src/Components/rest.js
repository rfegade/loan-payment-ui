import React, { useEffect, useState } from "react";
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
    const { name, value } = e.target;

    const errors = validateFields(name, value);

    setFormData({
      ...formData,
      [name]: value,
    });

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
            (name === "accountNumber" ||
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
            (name === "cardNumber" || name === "cvv")
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

    // Check for empty fileds before submission
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
      setFormErrors(errors);
    } else {
      setFormErrors({});
      setIsSuccess(true);
      console.log("Form submitted:", formData);
    }
  };

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <p>Fill out the form below to complete your payment.</p>
      <div className="form-container">
        <div className="row border-bottom loan-number">
          <div className="p-0">
            <div className="p-2">
              <label className="d-block" for="loanAccNumber">
                Loan Account Number:
              </label>
              <input
                type="text"
                id="loanAccNumber"
                name="loanAccNumber"
                value={formData.loanAccNumber}
                onChange={handleChange}
              />
            </div>
            {formErrors.loanAccNumber && (
              <div className="alert alert-danger  p-1 mb-0" role="alert">
                {formErrors.loanAccNumber}
              </div>
            )}
          </div>
        </div>
        <div className="row acc-info">
          <div className="border-right p-0">
            <div className="p-2 border-bottom">
              <label className="d-block mb-2" for="accType">
                Type of Account:
              </label>
              <div className="col-5 radio-container d-inline-block form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  id="checking"
                  value="checking"
                  checked={selectedOption === "checking"}
                  onChange={handleOptionChange}
                />
                <label
                  for="checking"
                  className="d-inline-flex form-check-label"
                >
                  Checking
                </label>
              </div>
              <div className="col-5 radio-container d-inline-block form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  id="debitCard"
                  value="debitCard"
                  checked={selectedOption === "debitCard"}
                  onChange={handleOptionChange}
                />
                <label
                  for="debitCard"
                  className="d-inline-flex form-check-label"
                >
                  Debit card
                </label>
              </div>
            </div>
            {selectedOption === "checking" ? (
              <>
                <div className="p-0 border-bottom">
                  <div className="p-2">
                    <label className="d-block" for="routingNumber">
                      Routing Number:
                    </label>
                    <input
                      type="text"
                      id="routingNumber"
                      name="routingNumber"
                      value={formData.routingNumber}
                      onChange={handleChange}
                    />
                  </div>
                  {formErrors.routingNumber && (
                    <div className="alert alert-danger p-1 mb-0 " role="alert">
                      {formErrors.routingNumber}
                    </div>
                  )}
                </div>
                <div className="p-0 border-bottom">
                  <div className="p-2">
                    <label className="d-block" for="accountNumber">
                      Bank Account Number:
                    </label>
                    <input
                      type="text"
                      id="accountNumber"
                      name="accountNumber"
                      value={formData.accountNumber}
                      onChange={handleChange}
                    />
                  </div>
                  {formErrors.accountNumber && (
                    <div className="alert alert-danger p-1 mb-0" role="alert">
                      {formErrors.accountNumber}
                    </div>
                  )}
                </div>
                <div className="p-0">
                  <div className="p-2">
                    <label className="d-block" for="confAccountNumber">
                      Confirm Bank Account Number:
                    </label>
                    <input
                      type="text"
                      id="confAccountNumber"
                      name="confAccountNumber"
                      value={formData.confAccountNumber}
                      onChange={handleChange}
                    />
                  </div>
                  {formErrors.confAccountNumber && (
                    <div className="alert alert-danger p-1 mb-0" role="alert">
                      {formErrors.confAccountNumber}
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="p-0 border-bottom">
                  <div className="p-2">
                    <label className="d-block" for="cardNumber">
                      Card Number:
                    </label>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleChange}
                    />
                  </div>
                  {formErrors.cardNumber && (
                    <div className="alert alert-danger p-1 mb-0" role="alert">
                      {formErrors.cardNumber}
                    </div>
                  )}
                </div>
                <div className="p-0 border-bottom">
                  <div className="p-2 ">
                    <label className="d-block" for="nameOnCard">
                      Name On card
                    </label>
                    <input
                      type="text"
                      id="nameOnCard"
                      name="nameOnCard"
                      value={formData.nameOnCard}
                      onChange={handleChange}
                    />
                  </div>
                  {formErrors.nameOnCard && (
                    <div className="alert alert-danger p-1 mb-0" role="alert">
                      {formErrors.nameOnCard}
                    </div>
                  )}
                </div>
                <div className="row">
                  <div className="col-md-6 exp-date">
                    <div className="px-2 py-2">
                      <label className="d-block" for="expirationDate">
                        Expiration Date
                      </label>
                      <input
                        type="text"
                        id="expirationDate"
                        name="expirationDate"
                        value={formData.expirationDate}
                        onChange={handleChange}
                      />
                    </div>
                    {formErrors.expirationDate && (
                      <div className="alert alert-danger p-1 mb-0" role="alert">
                        {formErrors.expirationDate}
                      </div>
                    )}
                  </div>
                  <div className="col-md-6 cvv">
                    <div className="px-2 py-2">
                      <label className="d-block" for="cvv">
                        CVV
                      </label>
                      <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleChange}
                      />
                    </div>
                    {formErrors.cvv && (
                      <div className="alert alert-danger p-1 mb-0" role="alert">
                        {formErrors.cvv}
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="d-flex flex-column justify-content-center align-items-center img-container py-3">
            {selectedOption === "checking" ? (
              <>
                <p className="text-center">
                  Where can I find the routing and account number?
                </p>
                <img src="/imgs/check.png" alt="" />
              </>
            ) : (
              <>
                <p className="text-center">Where can I find the CVV number?</p>
                <img src="/imgs/cvv.png" alt="" />
              </>
            )}
          </div>
        </div>
      </div>
      {isSuccess && (
        <div className="text-success mb-2">
          Form is successfully submitted!!
        </div>
      )}
      <button
        class="col-12 col-md-4 py-3 text-center text-uppercase"
        type="submit"
      >
        Make Payment
      </button>
    </form>
  );
};

export default Form;
