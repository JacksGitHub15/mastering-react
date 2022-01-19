// You'll often work with asynchronous data in React, so it's good to know alternative syntax for handling promises: 
// async/await. The following refactoring of the handleFetchStories function without error handling shows how:

const App = () => {
    ...

const handleFetchStories = React.useCallback(async () => {
    dispatchStories({ type: 'STORIES_FETCH_INIT' });
    const result = await axios.get(url);
    dispatchStories({
        type: 'STORIES_FETCH_SUCCESS',
        payload: result.data.hits,
    });
}, [url]);
    ...
};

// To use async/await, our function requires the async keyword. Once you start using the await keyword, everything reads
// like synchronous code. Actions after the await keyword are not executed until promise resolves, meaning the code will wait.

const App = () => {
    ...

const handleFetchStories = React.useCallback(async () => {
    dispatchStories({ type: 'STORIES_FETCH_INIT' });
    try {
        const result = await axios.get(url);
        dispatchStories({
            type: 'STORIES_FETCH_SUCCESS',
            payload: result.data.hits,
        });
    } catch {
        dispatchStories({ type: 'STORIES_FETCH_FAILURE' });
    }
}, [url]);
    ...
};

// To include error handling as before, the try and catch blocks are there to help. If something goes wrong in the try 
// block, the code will jump into the catch block to handle the error. then/catch blocks and async/await with try/catch 
// blocks are both valid for handling asynchronous data in JS and React.