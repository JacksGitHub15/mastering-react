// Next is to add another feature to our Search component in the form of another React hook. We'll make sure the
// Search component remembers the most recent search interaction, so the application opens it whenever the browser
// restarts.

const App = () => {
    ...
const [searchTerm, setSearchTerm] = React.useState(
    localStorage.getItem('search') || 'React'
);
const handleSearch = event => {
    setSearchTerm(event.target.value);
    localStorage.setItem('search', event.target.value);
};
    ...
);

// When using the input field and refreshing the tab, the browser will remember the last search term. Using local 
// storage in React can be seen as a side-effect because we interact outside of React's domain by using the browser's
// API.
// There is a flaw tho. The handler function should mostly be concerned about updating the state, but now it has a
// side-effect. If we use the setSearchTerm function elsewhere in our application, we will break the feature we 
// implemented because we can't be sure the local storage will also get updated.
// We can fix this by handling the side-effect at a dedicated place. We'll use React useEffect Hook to trigger the
// side-effect each time the searchTerm changes:

const App = () => {
    ...

const [searchTerm, setSearchTerm] = React.useState(
    localStorage.getItem('search') || 'React'
);

React.useEffect(() => {
    localStorage.setItem('search', searchTerm);
}, [searchTerm]);

const handleSearch = event => {
    setSearchTerm(event.target.value);
};
    ...
);

// React's useEffect Hook takes two arguments: The first is a function where the side-effect occurs. In our case, 
// the side-effect is when the user types the searchTerm into the browser's local storage. 
// The optional second argument is a dependency array of variables. If one of thesse variables changes, the
// function for the side-effect is called. In our case, the function is called every time the searchTerm changes;
// and it's also called initially when the component renders for the first time.

// Leaving out the second argument, would make the function for the side-effect run on every render of the component.
// If the dependency array of React's useEffect is an empty array, the function for the side-effect is only called
// once, after the component renders for the first time. The hook lets us opt into React's component lifecycle.
// It can be triggered when the component is first mounted, but also one of its dependencies are updated.

// Using React useEffect instead of managing the side-effect in the handler has made the application more robust.
// Whenever and wherever searchTerm is updated via setSearchTerm, local storage will always be in sync with it.