import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { AppShell, Navbar, Header, Aside, Footer, Container, Button } from '@mantine/core';
import Shell from './components/AppShell';

function App() {
  const [count, setCount] = useState(0)

  return (
  
   <Shell/>
  )
}

export default App
