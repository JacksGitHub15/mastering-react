import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();



// The ReactDOM.render() function above uses an HTML node to replace it with JSX
// While integrating React into HTML, the function expects two arguments, the first is to render the JSX
// It creates an insance of your App component
// The second argument specifies where the React application enters your HTML. It expects an element with an id = 'root'
// found in the public/index.html file. This is a basic HTML file