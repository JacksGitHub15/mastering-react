import React from 'react';

// App component is really just a JavaScript function, that returns HTML

// Method 1:
const welcome = {
  greeting: 'Hey',
  title: 'React',
};

// Method 2:
function getTitle(title) {
  return title;
}

function App() {
  // variables defined in the functions body will be re-defined everytime this function runs
  // anything in curly braces in JSX can be used for JS expressions (function execution)
  // JSX was initially invented for React but is now popular in other libraries and frameworks

  return (
    <div>
      {/* Method 1: */}
      <h1>{welcome.greeting} {welcome.title}</h1>

      {/* Method 2: */}
      <h1>Hello {getTitle('React')}</h1>

      <label htmlFor="search">Search: </label>
      <input id="search" type="text" />

      <hr />
    </div>
  );
}

export default App;