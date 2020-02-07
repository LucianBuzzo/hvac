import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { reset, themes, NumberField, Button } from 'react95'

const ResetStyles = createGlobalStyle`
  ${reset}
`

const App = (props) => {
  const [ pin, setPin ] = useState(7)

  const send = () => {
    fetch('./pin/' + pin)
  }

  return (
    <div className='App'>
      <ResetStyles />
      <ThemeProvider theme={themes.default}>
        <div

          style={{

            padding: '5rem',

            background: 'teal',

            height: '100%',
            position: 'fixed',
            width: '100%'
          }}

        >
          <NumberField value={pin} onChange={setPin} />
          <br />
          <br />
          <Button onClick={send}>Test</Button>

        </div>
      </ThemeProvider>
    </div>
  )
}

const rootElement = document.getElementById('root')

ReactDOM.render(<App />, rootElement)
