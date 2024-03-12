import React from 'react';
import { GlobalProvider } from './GlobalContext';
import App from './App';

const Root = () => {
  return (
    <GlobalProvider>
      <App />
    </GlobalProvider>
  );
};

export default Root;