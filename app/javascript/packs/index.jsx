import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Home from './pages/Home';
import NavMain from './components/NavMain';

const App = () => {

  return (
    <div>
      <NavMain />
      <Home />
    </div>
  )

}


document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App />,
    document.getElementById('root'),
  )
})
