// The Search component still has its internal state. While we established a callback handler to pass information
// up to the App component, we are not using it yet. Next step is to share the Search component's
// state across multiple components

// The search term is needed in the App to filter the list before passing it to the List component as props
// We'll need to *lift state up* from Search to App component to share the state with more components

const App = () => {
    const stories = [... ];
    const [searchTerm, setSearchTerm] = React.useState('');
    const handleSearch = event => {
        setSearchTerm(event.target.value);
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
const Search = props => (
    <div>
        <label htmlFor="search">Search: </label>
        <input id="search" type="text" onChange={props.onSearch} />
    </div>
);


// The callback handler allows us to keep an open communication channel between Search and App component.
// The Search component doesn't manage the state anymore but only passes up the event to the App
// component after text is entered into the input field.
// searchTerm could also be displayed in the App component again or Search component by passing it down
// as a prop.

// It is important to always mange the state at a component where every component that's interested in it
// is one that either manages the state, or a component below the managing component.
// If a component below needs to update the state, pass a callback handler down to it (see Search component).
// If a component handler needs to use the state, pass it down as props.

// By managing the search feature state in the App component, we can finally filter the list with the 
// stateful searchTerm before passing the list to the List component

const App = () => {
    const stories = [... ];
    const [searchTerm, setSearchTerm] = React.useState('');
    const handleSearch = event => {
        setSearchTerm(event.target.value);
    };
    const searchedStories = stories.filter(function (story) {
        return story.title.includes(searchTerm);
    });
    return (
        <div>
            <h1>My Hacker Stories</h1>
            <Search onSearch={handleSearch} />
            <hr />
            <List list={searchedStories} />
        </div>
    );
};

// A JS built-in filter function is used to create a new filtered array. The filter function takes a 
// function as an argument, which accessses each item in the array and returns T or F.
// If T, the item stays in the newly created array; if F; it is removed.

// Example below:
const words = [
    'spray',
    'limit',
    'elite',
    'exuberant',
    'destruction',
    'present'
];

const filteredWords = words.filter(function (word) {
    return word.length > 6;
});

console.log(filteredWords);
// ["exuberant", "destruction", "present"]

// The filter function checks whether searchTerm is present in our story item's title, but it's still
// too opionated about the letter case. If we searched for "react", there is no filtered "React" story
// in the rendered list. To fix this, we have to lower case the story's title and the searchTerm.

const App = () => {
    ...

const searchedStories = stories.filter(function (story) {
    return story.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
});
    ...
    };

// We can make the function more concise using a JS arrow function:
const App = () => {
    ...

const searchedStories = stories.filter(story => {
    return story.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
});
    ...
    };

// And, by turning the return statement into an immediate return, beacuse no other task happens 
// before the return:
const App = () => {
    ...
const searchedStories = stories.filter(story =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
);
    ...
    };

// Now we can manipulate state in React using the Search component's callback handler in the 
// App component to update it. The current state is used as a filter for the list. 
// With the callback handler, we used information from the Search component in the App component
// to update the shared state and indirectly in the List component for the filtered list.