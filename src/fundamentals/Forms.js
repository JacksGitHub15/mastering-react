// Earlier we introduced a new button to fetch data explicity with a button click. We'll advance its use its proper HTML
// form, which encapsulates the button and input field for the search term with its label.

// Forms aren't much different in React's JSX than in HTML. We'll implement it in two refactoring steps with some HTML/JS.
// First, wrap the input field and button into an HTML form element:

const App = () => {
    ...

return (
    <div>
        <h1>My Hacker Stories</h1>

        <form onSubmit={handleSearchSubmit}>
            <InputWithLabel
                id="search"
                value={searchTerm}
                isFocused
                onInputChange={handleSearchInput}
            >
                <strong>Search:</strong>
            </InputWithLabel>

            <button type="submit" disabled={!searchTerm}>
                Submit
            </button>
        </form>
        <hr />
        ...
    </div>
);
};

// Instead of passing the handleSearchSubmit handler to the button, it's used in the new form element. The button receives a
// new type attribute called submit, which indicates that the form element handles the click and not the button.

// Since the handler is used for the form event, it executes preventDefault in React's synthetic event. This prevents the 
// HTML form's native behaviour, which leads to a browser reload.

const App = () => {
    ...

const handleSearchSubmit = event => {
    setUrl(`${API_ENDPOINT}${searchTerm}`);
    event.preventDefault();
};
    ...
};

// Now we can execute the search feature with the keyboard's Enter key. In the next two steps, we will only seperate the
// component into its standalone SearchForm component:

const SearchForm = ({
    searchTerm,
    onSearchInput,
    onSearchSubmit,
}) => (
    <form onSubmit={onSearchSubmit}>
        <InputWithLabel
            id="search"
            value={searchTerm}
            isFocused
            onInputChange={onSearchInput}
        >
            <strong>Search:</strong>
        </InputWithLabel>

        <button type="submit" disabled={!searchTerm}>
            Submit
        </button>
    </form>
);

// The new component is used by the App component. The App component still manages the state for the form, because the 
// state is used in the App component to fetch data passed as props (stories.data) to the List component:

const App = () => {
    ...

return (
    <div>
        <h1>My Hacker Stories</h1>
        <SearchForm
            searchTerm={searchTerm}
            onSearchInput={handleSearchInput}
            onSearchSubmit={handleSearchSubmit}
        />
        <hr />
        {stories.isError && <p>Something went wrong ...</p>}
        {stories.isLoading ? (
            <p>Loading ...</p>
        ) : (
            <List list={stories.data} onRemoveItem={handleRemoveStory} />
        )}
    </div>
);
};

// Forms aren't much different in React than HTML. When we have input fields and a button to submit data from them, 
// we can give our HTML more structure by wrapping it into a form element with a onSubmit handler. The button that executes
// the submission needs only the "subtmit" type.