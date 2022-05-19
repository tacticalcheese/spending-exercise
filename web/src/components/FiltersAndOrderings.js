import React, { useState } from 'react';

import { FiltersWrapper, Orderings, CurrencyFilters, CurrencyButton } from '../styles/ComponentStyles';

export default function CurrencyFilter({setFilters}) {
  const [currency, setCurrency] = useState('');
  const [ordering, setOrdering] = useState('-spent_at');

  function handleCurrency(e) {
    const value = e.target.value;
    setCurrency(value);
    handleFilters(e);
  }

  function handleOrdering(e) {
    const value = e.target.value;
    setOrdering(value);
    handleFilters(e);
  }

  function handleFilters(e) {
    if (e.type === 'change') {
      if (currency === '') {
        setFilters(`/?orderBy=${e.target.value}`);
      } else {
        setFilters(`/?currency=${currency}&orderBy=${e.target.value}`);
      }
    }
    if (e.type === 'click') {
      setFilters(`/?currency=${e.target.value}&orderBy=${ordering}`);
    }
  }

  return (
    <>
      <FiltersWrapper>
        <Orderings>
          <select onChange={handleOrdering}>
            <option value='-spent_at'>Sort by Date descending (default)</option>
            <option value='spent_at'>Sort by Date ascending</option>
            <option value='-amount_normalized'>Sort by Amount descending</option>
            <option value='amount_normalized'>Sort by Amount ascending</option>
          </select>
        </Orderings>
        <CurrencyFilters onClick={handleCurrency}>
          <li>
            <CurrencyButton
              value=''
              currencyFilter={currency}
            >
              ALL
            </CurrencyButton>
          </li>
          <li>
            <CurrencyButton
              value='HUF'
              currencyFilter={currency}
            >
              HUF
            </CurrencyButton>
          </li>
          <li>
            <CurrencyButton
              value='USD'
              currencyFilter={currency}
            >
              USD
            </CurrencyButton>
          </li>
        </CurrencyFilters>
      </FiltersWrapper>
    </>
  );
}
