// The two hooks we've used thus far: useState and useEffect.
// useState is used to make an application interactive
// useEffect is used to opt into the lifecycle of a component

// We can also use React custom Hooks, building a hook yourself.
// We will use the two aforementioned hooks to create a new custom hook called useSemiPersistentState, names as such
// because it manages the state yet synchronizes with the local storage. It's not fully persistent because clearing
// the local storage of the browser deletes relevant data for the application. 
// Start by extracting all relevant implementation details from the App component into this new custom hook:

const useSemiPersistentState = () => {
    const [searchTerm, setSearchTerm] = React.useState(
        localStorage.getItem('search') || ''
    );
    React.useEffect(() => {
        localStorage.setItem('search', searchTerm);
    }, [searchTerm]);
};

const App = () => {
    ...
};

// So far it's just a function in working around useState and useEffect. We need to return the values that are needed
// in our App component from this custom hook.

const useSemiPersistentState = () => {
    const [searchTerm, setSearchTerm] = React.useState(
        localStorage.getItem('search') || ''
    );

    React.useEffect(() => {
        localStorage.setItem('search', searchTerm);
    }, [searchTerm]);

    return [searchTerm, setSearchTerm];
};

// We are following two conventions of React's built-in hooks. Firstly the naming convention with the 'use' prefix
// and secondly the returned values are returned as an array. Now we can use the custom hook with its returned 
// values in the App component with the usual array destructuring:

const App = () => {
    const stories = [... ];
    const [searchTerm, setSearchTerm] = useSemiPersistentState();
    const handleSearch = event => {
        setSearchTerm(event.target.value);
    };

    const searchedStories = stories.filter(story =>
        story.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        ...
    );
};

// Another goal of a custom hook should be reusablility. All of this custom hook's internals are about the search 
// domain, but the hook should be for a value that's set in the state and synchronized in local storage. 
// Let's adjust the naming therefore:

const useSemiPersistentState = () => {
    const [value, setValue] = React.useState(
        localStorage.getItem('value') || ''
    );

    React.useEffect(() => {
        localStorage.setItem('value', value);
    }, [value]);

    return [value, setValue];
};

// We handle an abstracted "value" within the custom hook. Using it in the App component, we can name the returned
// current state and state updater function anything domain-related with array destructuring.
// There is still a problem with this custom hook. Using it more than once in a React application leads to an
// overwrite of the "value"-allcocated item in the local storage. To fix this, pass in a key:

const useSemiPersistentState = key => {
    const [value, setValue] = React.useState(
        localStorage.getItem(key) || ''
    );

    React.useEffect(() => {
        localStorage.setItem(key, value);
    }, [value, key]);

    return [value, setValue];
};
const App = () => {
    ...

const [searchTerm, setSearchTerm] = useSemiPersistentState(
    'search'
);
    ...
};

// Since the key comes from outside, the hook assumes it could change, so it needs to be included in the dependency 
// array of the useEffect hook. Without it, the side-effect may run with an outdated key (also called stale) if the
// key changed between renders:

const useSemiPersistentState = (key, initialState) => {
    const [value, setValue] = React.useState(
        localStorage.getItem(key) || initialState
    );
    ...
};

const App = () => {
    ...

const [searchTerm, setSearchTerm] = useSemiPersistentState(
    'search',
    'React'
);
    ...
};

// We created a custom hook. If it is too convoluted, it can be reverted back to useState and useEffect hooks. 
// However, knowing more about custom hooks gives you lots of new options. A custom hook can encapsulate non-trivial 
// implementation details that should be kept away from a component; can be used in more than one React component;
// and can even be opn-sourced as an external library.