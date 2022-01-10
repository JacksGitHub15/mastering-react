// Next we'll focus on the input field and label, by separating a Search component and 
// creating a component instance of it in the App component. Doing this, the Search component
// becomes a sibling of the List component and vice versa. We'll also move the handler and 
// the state into the Search component to keep our functionality intact.

const App = () => {
    const stories = [... ];
    return (
        <div>
            <h1>My Hacker Stories</h1>
            <Search />
            <hr />
            <List list={stories} />
        </div>
    );
};

const Search = () => {
    const [searchTerm, setSearchTerm] = React.useState('');
    const handleChange = event => {
        setSearchTerm(event.target.value);
    };
    return (
        <div>
            <label htmlFor="search">Search: </label>
            <input id="search" type="text" onChange={handleChange} />
            <p>
                Searching for <strong>{searchTerm}</strong>.
            </p>
        </div>
    );
};


// We have an extracted Search component that handles state and shows state without revealing
// its content. The component displays the searchTerm as text but doesn't share this information
// with its parent or sibling components yet. Since Search component does nothing except show the 
// search term, it becomes useless for the other components.

// There is no way to pass information as JS data types up the component tree since props are 
// naturally only passed downwards. However, we can introduce a callback handler as a function:
// A callback function gets introduced (A), is used elsewhere (B) but "calls back" to the place 
// it was introduced (C).

const App = () => {
    const stories = [... ];
    // A
    const handleSearch = event => {
        // C
        console.log(event.target.value);
    };
    return (
        <div>
            <h1>My Hacker Stories</h1>
            <Search onSearch={handleSearch} />
            <hr />
            <List list={stories} />
        </div>
    );
};
const Search = props => {
    const [searchTerm, setSearchTerm] = React.useState('');
    const handleChange = event => {
        setSearchTerm(event.target.value);
        // B
        props.onSearch(event);
    };
    return (... );
};

// The concept behind the callback handler: We pass a function from one component (App) to 
// another component (Search); we call it in the second component (Search); but have the actual 
// implementation of the function call in the first component (App). This way, we can communicate
// up the component tree. A handler function used in one component becomes a callback handler, 
// which is passed down to components via React props. Props are always passed down as information
// the component tree and callback handlers passed as function in props can be used to communicate 
// up the component hierarchy
