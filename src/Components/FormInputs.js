import React from "react";
import CheckingFields from "./CheckingFields";
import DebitFields from "./DebitFields";

export default function FormInputs({
  handleSubmit,
  formData,
  handleChange,
  formErrors,
  selectedOption,
  handleOptionChange,
  isSuccess,
}) {
  return (
    <form onSubmit={handleSubmit}>
      <p>Fill out the form below to complete your payment.</p>
      <div className="form-container">
        <div className="row border-bottom loan-number">
          <div className="p-0">
            <div className="p-2">
              <label className="d-block" for="loanAccNumber">
                Loan Account Number
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
            {/* Render form depending on the options selected for debit card or
            bank account */}
            {selectedOption === "checking" ? (
              <CheckingFields
                formData={formData}
                handleChange={handleChange}
                errors={formErrors}
              />
            ) : (
              <DebitFields
                formData={formData}
                handleChange={handleChange}
                errors={formErrors}
              />
            )}
          </div>
          <div className="d-flex flex-column justify-content-center align-items-center img-container p-3">
            {/* Render images depending on the options selected for debit card or
            bank account */}
            {selectedOption === "checking" ? (
              <>
                <p className="text-center">
                  Where can I find the routing and
                  <br /> account number?
                </p>
                <img src="imgs/check.png" alt="" />
              </>
            ) : (
              <>
                <p className="text-center">Where can I find the CVV number?</p>
                <img src="imgs/cvv.png" alt="" />
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
}
