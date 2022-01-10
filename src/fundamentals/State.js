// React props are used to pass info down the component tree; React state is used to make apps interactive
// We'll be able to change apps appearance by interacting with it

// First there is a React utility function called useState for managing state. 
// The useState function is called a hook. There is more than one React hook related to state management.

const App = () => {
    const stories = [... ];
    const [searchTerm, setSearchTerm] = React.useState('');
    ...
};

// useState hook takes an initial state as an argument. We'll use an empty string and the function will return
// an array with two values:
// searchTerm represents the current state 
// setSearchTerm represents a function to update this state


// Below is examples of JS array destructuring. It is used to read from an array more concisely

// basic array definition
const list = ['a', 'b'];

// no array destructuring
const itemOne = list[0];
const itemTwo = list[1];

// array destructuring
const [firstItem, secondItem] = list;


// In the case of React, useState hook is a function which returns an array. Example below:
function getAlphabet() {
    return ['a', 'b'];
}

// no array destructuring
const itemOne = getAlphabet()[0];
const itemTwo = getAlphabet()[1];

// array destructuring
const [firstItem, secondItem] = getAlphabet();


// Array destructuring is just accessing each item one by one, but it makes code much more readable
const App = () => {
    const stories = [... ];
    // less readable version without array destructuring
    const searchTermState = React.useState('');
    const searchTerm = searchTermState[0];
    const setSearchTerm = searchTermState[1];
    ...
};


// Array destructuring is very useful because of its concise syntax and ability to name destructured variables:
const App = () => {
    const stories = [... ];
    const [searchTerm, setSearchTerm] = React.useState('');
    ...
};


// After initializing the state and have access to the current state and the state updater function, 
// use them to display the current state and update it withing the App's component's event handler:

const App = () => {
    const stories = [... ];
    const [searchTerm, setSearchTerm] = React.useState('');
    const handleChange = event => {
        setSearchTerm(event.target.value);
    };
    return (
        <div>
            <h1>My Hacker Stories</h1>
            <label htmlFor="search">Search: </label>
            <input id="search" type="text" onChange={handleChange} />
            <p>
                Searching for <strong>{searchTerm}</strong>.
            </p>
            <hr />
            <List list={stories} />
        </div>
    );
};

// When the user types into the input field, the input field's change event is captured by the handler with
// it's current internal value. The handler's logic uses the state updater function to set the new state.
// After the new state is set in a component, the component renders again, meaning the component function 
// runs again. The new state becomes the current state and can be displayed in the component's JSX.