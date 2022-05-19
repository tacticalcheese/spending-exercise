import React from 'react';
import ReactDOM from 'react-dom';
import CurrencyFilter from '../components/FiltersAndOrderings';
import '@testing-library/jest-dom'
import { screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  ReactDOM.unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('renders without crashing', () => {
  ReactDOM.render(<CurrencyFilter />, container);
});

it('handles ordering', () => {
  const setFiltersMock = jest.fn();
  ReactDOM.render(<CurrencyFilter setFilters={setFiltersMock}/>, container);

  userEvent.selectOptions(
    screen.getByRole('combobox'),
    screen.getByRole('option', { name: 'Sort by Amount descending' })
  );
  expect(screen.getByRole('option', { name: 'Sort by Amount descending' }).selected).toBe(true);
});

it('handles currency filtering', () => {
  const setFiltersMock = jest.fn();
  ReactDOM.render(<CurrencyFilter setFilters={setFiltersMock}/>, container);

  const currencyButton = screen.getByRole('button', { name: 'HUF' });
  fireEvent.click(currencyButton);
  expect(setFiltersMock).toHaveBeenCalledTimes(1);
  expect(setFiltersMock).toHaveBeenCalledWith('/?currency=HUF&orderBy=-spent_at')
});