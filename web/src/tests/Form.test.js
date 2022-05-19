import React from 'react';
import ReactDOM from 'react-dom';
import From from '../components/Form';


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<From />, div);
  ReactDOM.unmountComponentAtNode(div);
});