import React from 'react';
import ReactDOM from 'react-dom';
import { screen, fireEvent } from '@testing-library/react';
import Form from '../components/Form';

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
  ReactDOM.render(<Form />, container);
});

it('ables to create spending', async () => {
  const refreshListMock = jest.fn();
  ReactDOM.render(<Form refreshList={refreshListMock}/>, container);

  fireEvent.change(screen.getByRole('textbox'), {
    target: {value: 'Tickets'},
  });
  fireEvent.change(screen.getByRole('spinbutton'), {
    target: {value: '2000'},
  });

  expect(screen.getByPlaceholderText('description').value).toBe('Tickets')
  expect(screen.getByRole('spinbutton').value).toBe('2000')

  fireEvent.submit(await screen.findByRole('button'));
});

it('validates form with no values', () => {
  const refreshListMock = jest.fn();
  ReactDOM.render(<Form refreshList={refreshListMock}/>, container);

  fireEvent.click(screen.getByRole('button'));

  expect(screen.getByText('Please give a description and an amount!')).toBeTruthy()
});

it('validates form with no description', () => {
  const refreshListMock = jest.fn();
  ReactDOM.render(<Form refreshList={refreshListMock}/>, container);

  fireEvent.change(screen.getByRole('spinbutton'), {
    target: {value: '2000'},
  });

  fireEvent.click(screen.getByRole('button'));

  expect(screen.getByText('Please give a description!')).toBeTruthy()
});