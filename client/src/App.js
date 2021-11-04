import React from 'react';
import Navbar from './Navbar';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import { hot } from 'react-hot-loader';
import theme from './theme';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Navbar/>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default hot(module)(App);
