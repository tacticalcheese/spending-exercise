import React, { useState } from 'react';
import { InputStyles } from '../styles/InputStyles';
import { SelectStyles } from '../styles/SelectStyles';
import { FormStyles } from '../styles/ComponentStyles';
import { ErrorStyles } from '../styles/ErrorStyles';


export default function Form({refresh, refreshList}) {
  const [state, setState] = useState({
    description: '',
    amount: 0,
    currency: 'USD',
  });
  const [error, setError] = useState('');

  function handleChange(e) {
    const { name, value } = e.target;

    setState({
      ...state,
      [name]: value,
    });
    if (state.description !== '' && state.amount !== 0 && state.amount !== '') {
      setError('');
    }
  }

  function validateForm() {
    if (state.description !== '' && state.amount !== 0 && state.amount !== '') {
      setError('');
      return true;
    } else {
      errorHandling();
    }
  }

  function errorHandling() {
    if (state.description === '' && (state.amount === 0 || state.amount === '')) {
      setError('Please give a description and an amount!');
    } else if (state.amount === 0 || state.amount === '') {
      setError('Please give an amount other than zero!');
    } else if (!error.descValid) {
      setError('Please give a description!');
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (validateForm()) {
      const body = {
        description: state.description,
        amount: parseFloat(state.amount).toFixed(2),
        currency: state.currency
      }
      fetch(`/spendings/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      })
        .then(async (res) => {
          const body = await res.json();
          return {
            status: res.status,
            body,
          };
        })
        .then((response) => {
          if (response.status === 201) {
            setState({description: '', amount: 0, currency: state.currency});
            refreshList(true);
          }
        })
        .catch((err) => {
          console.error(err);
        })
    }
  }

  return (
    <>
      <FormStyles onSubmit={handleSubmit}>
        <InputStyles
          type='text'
          placeholder='description'
          name='description'
          value={state.description}
          onChange={handleChange}
        />
        <InputStyles
          type='number'
          placeholder='amount'
          name='amount'
          value={state.amount}
          onChange={handleChange}
        />
        <SelectStyles
          name='currency'
          value={state.currency}
          onChange={handleChange}
        >
          <option value='HUF'>HUF</option>
          <option value='USD'>USD</option>
        </SelectStyles>
        <InputStyles type='submit' value='Save'/>
      </FormStyles>
      <ErrorStyles>{error}</ErrorStyles>
    </>
  );
}
