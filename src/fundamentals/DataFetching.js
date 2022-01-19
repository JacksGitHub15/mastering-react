// We are currently fetching psuedo data coming from a promise we set up ourselves. The lessons up to now about 
// asynchronous React and advanced state management were preparing for fetching data from a real third-party API.
// We will use the Hacker News API (https://hn.algolia.com/api) to request popular tech stories.

// Instead of using the initialStories array and getAsyncStories function (these can be removed), we will fetch the data
// directly from the API:

// A
const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query=';

const App = () => {
...

React.useEffect(() => {
    dispatchStories({ type: 'STORIES_FETCH_INIT' });
    fetch(`${API_ENDPOINT}react`) // B
        .then(response => response.json()) // C
        .then(result => {
            dispatchStories({
                type: 'STORIES_FETCH_SUCCESS',
                payload: result.hits, // D
            });
        })
        .catch(() =>
            dispatchStories({ type: 'STORIES_FETCH_FAILURE' })
        );
}, []);
...
};

// First, the API_ENDPOINT (A) is used to fetch popular stories for a certain query (a search topic). In this case, we 
// fetch stories about React (B). Second, the native browser's fetch API is used to make this request (B). For the 
// fetch API, the response needs to be translated into JSON (C). Finally, the returned result follows a different data 
// structure (D), which we send as payload to our component's state.

// In the previous code example, we used JS's Template Literals for a string interpolation. When this feature wasn't
// available in JS, we'd have used the + operator on strings instead:

const greeting = 'Hello';

// + operator
const welcome = greeting + ' React';
console.log(welcome);
// Hello React

// template literals
const anotherWelcome = `${greeting} React`;
console.log(anotherWelcome);
// Hello React

// Check the browser to see strories related to the initial query from the Hacker News API. Since we used the same data
// structure for a story for the sample stories, we didn't need to change anything, and it's still possible to filter
// the stories after fetching them with the search feature. We will change this behaviour in one of the next sections.
// For the App component, there wasn't much data fetching to implement here, though it's all part of learning how to
// manage asynchronous data as state in React.