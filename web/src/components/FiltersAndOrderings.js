import React, { useState } from 'react';

import { FiltersWrapper, Orderings, CurrencyFilters, CurrencyButton, FilterSwitchWrapper } from '../styles/ComponentStyles';
import '../styles/ToggleSwitch.css';

export default function CurrencyFilter({setFilters, filterSwitch, setFilterSwitch}) {
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
        setFilters(`/?orderBy=${e.target.value}&currency=${currency}`);
      }
    }
    if (e.type === 'click') {
      console.log(1, `/?orderBy=${ordering}&currency=${e.target.value}`)
      setFilters(`/?orderBy=${ordering}&currency=${e.target.value}`);
    }
  }

  function handleSwitch() {
    setFilterSwitch(!filterSwitch)
  }

  return (
    <>
      <FilterSwitchWrapper>
        <p className='label'>Switch to frontend filtering</p>
        <label className='switch'>
          <input type='checkbox' onChange={handleSwitch}/>
          <span className='slider'></span>
        </label>
      </FilterSwitchWrapper>
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
