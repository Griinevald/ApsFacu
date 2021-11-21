import React from 'react';
import Routes from './routes'

import { UsuarioProvider } from './context/user'

import { GlobalStyle } from './GlobalStyled'
import {
  Main,
  Box
} from './GlobalStyled'


import "./services/firebase"

function App() {
  return (
    <>
      <UsuarioProvider>
        <GlobalStyle />
            <Routes />
      </UsuarioProvider>
    </>
  );
}

export default App;
