import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import './App.css'
import { Form } from './components/Form'
import { Lista } from './components/Lista'

import { indigo }from '@mui/material/colors'


function App() {
  const color = indigo[50]

  return (
    <div className = 'containerApp' style = {{backgroundColor: color}}>
      <Form />
      <Lista />
    </div>
  )
}

export default App
