import React from 'react'
import ReactDOM from 'react-dom'
import ExampleComponent from './components/ExampleComponent'

const App = () => {
  return (
    <div>
      <h1>Bienvenue sur Easy Riding !</h1>
      <ExampleComponent />
    </div>
  )
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App />,
    document.getElementById('root'),
  )
})