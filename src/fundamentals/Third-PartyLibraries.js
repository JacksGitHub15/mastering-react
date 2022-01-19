// When testing applications in a headless browser environments, you may experience issues with the fetch API requests.
// A solution is to substitute the native fetch API with a stable library like axios, which performs asynchronous 
// requests to remote APIs. In this section, we will discover how to substitute a library, a native API of the browser in 
// this case - with another library from the npm registry. First, install axios on the command line:

'npm install axios'

// Second, import axios into the App component's file:

import React from 'react';
import axios from 'axios';

// You can use axios instead of fetch, and its usage looks almost identical to the native fetch API. It takes the URL as an
// argument and returns a promise. You don't have to transform the returned response to JSON anymore, since axios wraps the 
// result into a data object in JS. Just make sure to adapt the code to the returned data structure:

const App = () => {
    ...

const handleFetchStories = React.useCallback(() => {
    dispatchStories({ type: 'STORIES_FETCH_INIT' });

    axios
        .get(url)
        .then(result => {
            dispatchStories({
                type: 'STORIES_FETCH_SUCCESS',
                payload: result.data.hits,
            });
        })
        .catch(() =>
            dispatchStories({ type: 'STORIES_FETCH_FAILURE' })
        );
}, [url]);
    ...
};

// In this code, we call axios axios.get() for an explicit HTTP GET request, which is the same HTTP method we used by 
// default with the browser's native fetch API. You can use other HTTP methods such as HTTP POST with axios.post() as well.
// We can see with these examples that axios is a powerful library for perfoming requests to remote APIs. 