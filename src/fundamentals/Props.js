// Currently using the list variable as a global variable in the app. It was used directly from the 
// global scope in the App & List component. This would work if only one variable but it doesn't scale
// with multiple variables across multiple components from many different files.

// Using so called props, we can pass wariables as info from one component to another. 
// Before using props, we'll moce the list from the global scope into the App component and rename
// it to its actual domain:

const App = () => {
    const stories = [
        {
            title: 'React',
            url: 'https://reactjs.org/',
            author: 'Jordan Walke',
            num_comments: 3,
            points: 4,
            objectID: 0,
        },
        {
            title: 'Redux',
            url: 'https://redux.js.org/',
            author: 'Dan Abramov, Andrew Clark',
            num_comments: 2,
            points: 5,
            objectID: 1,
        },
    ];
    const handleChange = event => { ... };
    return (
        <div>
            <h1>My Hacker Stories</h1>

            <label htmlFor="search">Search: </label>
            <input id="search" type="text" onChange={handleChange} />

            <hr />

            <List list={stories} />
        </div>
    );
    
// The variable is called stories in the App component, and we pass it under this name to the List component
// In the List component's instantiation, it is assigned to the list attribute. We access it as a list from 
// the props object in the List component's function signature

    const List = (props) => (
        <ul>
            {props.list.map((item) => (
                <li key={item.objectID}>
                    <span>
                        <a href={item.url}>{item.title}</a>
                    </span>
                    <span>{item.author}</span>
                    <span>{item.num_comments}</span>
                    <span>{item.points}</span>
                </li>
            ))}
        </ul>
    );
};

// Using props, we've prevented the list/stories variable from polluting the global scope in the App component
// Since stories is not used in the App component directly, but in one of its child components we passed as props 
// to the List component
// There we can access it through the first function signature's argument, called props
