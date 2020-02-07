import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { reset, themes, NumberField, Button, TextArea } from 'react95'

const ResetStyles = createGlobalStyle`
  ${reset}
`

const App = (props) => {
  const [ pin, setPin ] = useState(7)
  const [ pinData, setPinData ] = useState('')

  useEffect(() => {
    const interval = setInterval(() => {
      fetch('./pins')
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          console.log(data)
          setPinData(data)
        })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

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
          <br />
          <br />
          <TextArea
            width={600}
            height={600}
            value={JSON.stringify(pinData, null, 4)} onChange={console.log} />

        </div>
      </ThemeProvider>
    </div>
  )
}

const rootElement = document.getElementById('root')

ReactDOM.render(<App />, rootElement)
