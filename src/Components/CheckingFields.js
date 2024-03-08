import React from "react";

export default function CheckingFields({ formData, handleChange, errors }) {
  return (
    <>
      <div className="p-0 border-bottom">
        <div className="p-2">
          <label className="d-block" for="routingNumber">
            Routing Number
          </label>
          <input
            type="text"
            id="routingNumber"
            name="routingNumber"
            maxLength="9"
            value={formData.routingNumber}
            onChange={handleChange}
          />
        </div>
        {errors.routingNumber && (
          <div className="alert alert-danger p-1 mb-0 " role="alert">
            {errors.routingNumber}
          </div>
        )}
      </div>
      <div className="p-0 border-bottom">
        <div className="p-2">
          <label className="d-block" for="accountNumber">
            Bank Account Number
          </label>
          <input
            type="text"
            id="accountNumber"
            name="accountNumber"
            value={formData.accountNumber}
            onChange={handleChange}
          />
        </div>
        {errors.accountNumber && (
          <div className="alert alert-danger p-1 mb-0" role="alert">
            {errors.accountNumber}
          </div>
        )}
      </div>
      <div className="p-0">
        <div className="p-2">
          <label className="d-block" for="confAccountNumber">
            Confirm Bank Account Number
          </label>
          <input
            type="text"
            id="confAccountNumber"
            name="confAccountNumber"
            value={formData.confAccountNumber}
            onChange={handleChange}
          />
        </div>
        {errors.confAccountNumber && (
          <div className="alert alert-danger p-1 mb-0" role="alert">
            {errors.confAccountNumber}
          </div>
        )}
      </div>
    </>
  );
}
