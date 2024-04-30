import React from 'react'
import ReactDOM from 'react-dom/client'
import theme from './components/theme'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'

import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <App />
    </ChakraProvider>
  </React.StrictMode>,
)
