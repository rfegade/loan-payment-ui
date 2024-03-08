import React from "react";

export default function DebitFields({ formData, handleChange, errors }) {
  return (
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
            maxLength="16"
            value={formData.cardNumber}
            onChange={handleChange}
          />
        </div>
        {errors.cardNumber && (
          <div className="alert alert-danger p-1 mb-0" role="alert">
            {errors.cardNumber}
          </div>
        )}
      </div>
      <div className="p-0 border-bottom">
        <div className="p-2 ">
          <label className="d-block" for="nameOnCard">
            Name On Card
          </label>
          <input
            type="text"
            id="nameOnCard"
            name="nameOnCard"
            value={formData.nameOnCard}
            onChange={handleChange}
          />
        </div>
        {errors.nameOnCard && (
          <div className="alert alert-danger p-1 mb-0" role="alert">
            {errors.nameOnCard}
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
          {errors.expirationDate && (
            <div className="alert alert-danger p-1 mb-0" role="alert">
              {errors.expirationDate}
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
              maxLength="3"
              value={formData.cvv}
              onChange={handleChange}
            />
          </div>
          {errors.cvv && (
            <div className="alert alert-danger p-1 mb-0" role="alert">
              {errors.cvv}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
