import React from 'react'
import '../../src/App.css'
import { useState } from 'react';

export default function Calculator() {
   //storage the user input value 
   const [userValues, setUserValues] = useState({
    loanAmount: '',
    interest: '5.77',
    years: '',
  });

  //storage the results of the calculation
  const [results, setResults] = useState({
    monthlyPayment: '',
    totalPayment: '',
    totalInterest: '',
    isResult: false,
  });

  //storage error message
  const [error, setError] = useState('');

  //update state when the user values
    const handleInputChange = (event) =>
    setUserValues({ ...userValues, [event.target.name]: event.target.value });

  //error messages under validation
  const isValid = () => {
    const { loanAmount, interest, repaymentYears } = userValues;
    let actualError = '';
    if (!loanAmount || !interest || !repaymentYears) {
      actualError = 'Tänk på att ange korrekta och aktuella uppgifter. Detta gör att du får besked snabbare från våra anslutna långivare.';
    }
    if (isNaN(loanAmount) || isNaN(interest) || isNaN(repaymentYears)) {
      actualError = 'Tänk på att ange korrekta och aktuella uppgifter. Detta gör att du får besked snabbare från våra anslutna långivare.';
    }
    if (Number(loanAmount) <= 0 || Number(interest) <= 0 || Number(repaymentYears) <= 0) {
      actualError = 'Tänk på att ange korrekta och aktuella uppgifter. Detta gör att du får besked snabbare från våra anslutna långivare.';
    }
    if (actualError) {
      setError(actualError);
      return false;
    }
    return true;
  };

  //collect submited values
  const handleSubmitValues = (e) => {
    e.preventDefault();
    if (isValid()) {
      setError('');
      calculateResults(userValues);
    }
  };

  //calculation
  const calculateResults = ({ loanAmount, interest, repaymentYears }) => {
    const userloanAmount = Number(loanAmount);
    const calculatedInterest = Number(interest) / 100 / 12;
    const calculatedPayments = Number(repaymentYears) * 12;
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (userloanAmount * x * calculatedInterest) / (x - 1);

    if (isFinite(monthly)) {
      const monthlyPaymentCalculated = monthly.toFixed(2);
      const totalPaymentCalculated = (monthly * calculatedPayments).toFixed(2);
      const totalInterestCalculated = (
        monthly * calculatedPayments -
        userloanAmount
      ).toFixed(2);

      // Set up results to the state to be displayed to the user
      setResults({
        monthlyPayment: monthlyPaymentCalculated,
        totalPayment: totalPaymentCalculated,
        totalInterest: totalInterestCalculated,
        isResult: true,
      });
    }
    return;
  };

  // Clear input fields
  const clearFields = () => {
    setUserValues({
      loanAmount: '',
      repaymentYears: '',
      interest: '',
    });

    setResults({
      monthlyPayment: '',
      totalPayment: '',
      totalInterest: '',
      isResult: false,
    });
  };

  return (
    <div id='app'>
      <div className='form'>
        <h1>Låna med lägst ränta</h1>
        <p className='error'>{error}</p>
        <form onSubmit={handleSubmitValues}>
          {!results.isResult ? (
            <div className='form-items'>
              <div>
                <label id='label'>Månadskostnad</label>
                <input
                  type='text'
                  name='loanAmount'
                  placeholder='250 000kr'
                  value={userValues.loanAmount}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label id='label'>Återbetalningstid</label>
                <input
                  type='text'
                  name='repaymentYears'
                  placeholder='14 år'
                  value={userValues.repaymentYears}
                  onChange={handleInputChange}
                />
              </div>
              <input type='submit' 
              value='Ansök nu'
              className='button' />
            </div>
          ) : (
            <div className='form-items'>
              <h3>Månadskostnad: {results.monthlyPayment} kr</h3>
              <h4>
                Lönnebelopp: {userValues.loanAmount} kr <br /> Renta: {' '}
                {userValues.interest}% <br /> Att återbetala: {userValues.repaymentYears} år
              </h4>
              <input
                className='button'
                value='Jämför igen'
                type='button'
                onClick={clearFields}
              />
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

