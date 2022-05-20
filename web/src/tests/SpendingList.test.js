import React from 'react';
import ReactDOM from 'react-dom';
import SpendingListBackend from '../components/SpendingListBackend';

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
  ReactDOM.render(<SpendingListBackend />, container);
});