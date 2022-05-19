import React from 'react';
import ReactDOM from 'react-dom';
import SpendingList from '../components/SpendingList';


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SpendingList />, div);
  ReactDOM.unmountComponentAtNode(div);
});