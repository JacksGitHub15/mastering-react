// Controlled components are moreso HTML elements than React components.
// Here we will turn the Search component and its input field into a controlled component

// Example demonstrating the concept of controlled components throughout our React application.
// Give the searchTerm an initial state:
const App = () => {
    const stories = [... ];
    const [searchTerm, setSearchTerm] = React.useState('React');
    ...
};

// The list has been filtered to the initial search (React), but the input field doesn't reflect this.
// We need to convert the Search component w/ its input field into a controlled component. The input 
// field doesn't know anything about the searchTerm at this point. It only uses the change event to inform 
// of a change. The input field has a value attribute.

const App = () => {
    const stories = [... ];
    const [searchTerm, setSearchTerm] = React.useState('React');
    ...
return (
    <div>
        <h1>My Hacker Stories</h1>
        <Search search={searchTerm} onSearch={handleSearch} />
        ...
    </div>
);
};
const Search = props => (
    <div>
        <label htmlFor="search">Search: </label>
        <input
            id="search"
            type="text"
            value={props.search}        // value attribute
            onChange={props.onSearch}
        />
    </div>
);

// Now the input field starts with the correct initial searh term. This is done via props by forcing the 
// input field to use the value from React's state. Before this, the input field managed its own state
// natively with just HTML.



// Unidirectional data flow

// Another concept that can be visualised as:
// UI -> Side-Effect -> State -> UI -> ...

// A React application and its components start with an initial state, which may be passed down as props 
// to other components. It's rendered for the first time as sa UI, then a side-effect occurs such as user
// input or data loading from an API, the change is caputred in React's state. Once state has been changed,
// all the components affected by the modified state or the implicity modified props are re-rendered.

// In the previous sections we learned about React's component lifecycle. First, all components are 
// instatiated from the top to the bottom of the component hierarchy. This includes all hooks (useState)
// that are instatiated with their initial values. From there, the UI awaits side-effects like user interactions.
// Once state is changed, all components are affected by modified state/props render again.

// Every run through a comonent's function takes the recent value (current state) from the hooks and doesn't
// reinitialize them again (e.g initial state). This might seem odd and one might assume useState hooks 
// function re-initializes again with its initial value, but it doesn't. Hooks initialize only once when the
// component renders for the first time, after which React tracks them internally with their most recent values.