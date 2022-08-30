import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Shell from './components/AppShell';

import { MantineProvider, ColorSchemeProvider, ColorScheme } from '@mantine/core';

function App() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('dark');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));


  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
        <Shell />
      </MantineProvider>
    </ColorSchemeProvider>
  )
}

export default App
