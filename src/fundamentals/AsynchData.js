// We have two interactions in our application: searching the list, and removing items from the list.
// The first interaction is a fluctuant interference through a third-party state (searchTerm) applied on the list; 
// the second interaction is a non-reversible deletion of an item from the list.

const initialStories = [... ];
const getAsyncStories = () =>
    Promise.resolve({ data: { stories: initialStories } });

// In the App component, instead of using the initialStories, use an empty array for the initial state. We want to start 
// off with an empty list of stories, and simulate fetching these stories asynchronously.
// In a new useEffect hook, call the function and resolve the returned promise. Due to the empty dependency array, 
// the side-effect only runs once the component renders for the first time:

const App = () => {
    ...
const [stories, setStories] = React.useState([]);
React.useEffect(() => {
    getAsyncStories().then(result => {
        setStories(result.data.stories);
    });
}, []);

    ...
};

// Though the data should arrive aysnchronously when we start the application, it appears to arrive synchronously, because
// it's rendered immediately. Let's change this by giving it a bit of a realistic delay because every network request to 
// an API would come with a delay. First, remove the shorthand version for the promise:

const getAsyncStories = () =>
    new Promise(resolve =>
        resolve({ data: { stories: initialStories } })
    );

// And second, when resolving the promise, delay if for a few seconds:

const getAsyncStories = () =>
    new Promise(resolve =>
        setTimeout(
            () => resolve({ data: { stories: initialStories } }),
            2000
        )
    );

// Once the application is restarted, there should be a delayed rendering of the list. The intial state for the stories 
// is an empty array. After the App compponent rendered, the side-effect hook runs once to fetch the asynchronous data.
// After resolving the promise and setting the data in the component's state, the component renders again and displays
// the list of asynchronously loaded stories.