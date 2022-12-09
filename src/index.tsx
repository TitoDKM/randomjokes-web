import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import Home from './Pages/Home';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const rjTheme = extendTheme({
  styles: {
    global: () => ({
      body: {
        bg: 'cyan.400',
        color: 'white'
      }
    })
  }
});

root.render(
  <ChakraProvider theme={rjTheme}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  </ChakraProvider>
);