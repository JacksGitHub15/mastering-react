import React from 'react';

// The App component has an input field and label which haven't being used.
// Input fields have an onchange handler with React component's JSX.

const App = () => {
    // do something in between

    return (
        <div>
            <h1>My Hacker Stories</h1>
            <label htmlFor="search">Search: </label>
            <input id="search" type="text" />
            <hr />
            <List />
        </div>
    );
};

// Next define a function, normal or arrow, for the change event of the input field, an event handler.
// This function can be passed to the onChange attribute of the input field

const App = () => {
    const handleChange = event => {
        console.log(event);
    };
    return (
        <div>
            <h1>My Hacker Stories</h1>
            <label htmlFor="search">Search: </label>
            <input id="search" type="text" onChange={handleChange} />
            <hr />
            <List />
        </div>
    );
};

// The console is now logging input. This is called a synthetic event defined by a JS object.
// Through this object, we can access the emitted value of the input field:

const App = () => {
    const handleChange = event => {
        console.log(event.target.value);
    };
    return (... );
};

// The synthetic event is a wrapper around the browser's native event, with more functions that are useful
// to prevent native browser behaviour (refreshing a page after a form submitted)
// This is how JSX tales HTML elements to respond to user interactions.
// Always pass functions to these handlers, not the return value of the function, except whne the return value is a function:

// don't do this:
<input
    id="search"
    type="text"
    onChange={handleChange()}
/>

// do this instead
<input
    id="search"
    type="text"
    onChange={handleChange}
/>


// JS in HTML can display objects and pass JS primitives to HTML attributes (href -> <a>)
// and can pass functions to an element's attributes for handling events

