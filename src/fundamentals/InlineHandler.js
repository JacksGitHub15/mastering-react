// The list of stories we have so far is only an unstateful variable. We can filter the rendered the list with the search
// feature, but the list itself stays intact if we remove the filter. The filter is just a temporary change through a 
// third part, but we can't manipulate the real list yet.

// To gain control over the list, make it stateful by using it as initial state in React's useState Hook. The returned values
// are the current state (stories) and the state updater function (setStories). 
// We aren't using the custom useSemiPersistentState hook yet, because we don't want to open the browser with cached list each
// time. Instead, we always want to start with the initial list.

const initialStories = [
    {
        title: 'React',
        ...
    },
    {
        title: 'Redux',
        ...
    },
];
const useSemiPersistentState = (key, initialState) => { ... };
const App = () => {
    const [searchTerm, setSearchTerm] = ...
    const [stories, setStories] = React.useState(initialStories);
    ...
};

// The application behaves the same because the stories, now returned from the useState, are still filtered into searchedStories
// and displayed in the List. Next we'll manipulate the list by removing an item from it:

const App = () => {
    ...
const [stories, setStories] = React.useState(initialStories);
const handleRemoveStory = item => {
    const newStories = stories.filter(
        story => item.objectID !== story.objectID
    );
    setStories(newStories);
};
    ...
return (
    <div>
        <h1>My Hacker Stories</h1>
        ...
        <hr />
        <List list={searchedStories} onRemoveItem={handleRemoveStory} />
    </div>
);
};

// The callback handler in the App component receives an item to be removed as an argument, and filters the current stories 
// based on this information by removing all items that don't meet its condition(s). The returned stories are then set as 
// the new state, and the List component passes the function to its child component. It's not using this new information;
// it's just passing it on:

const List = ({ list, onRemoveItem }) =>
    list.map(item => (
        <Item
            key={item.objectID}
            item={item}
            onRemoveItem={onRemoveItem}
        />
    ));

// Finally, we use the incoming function in another handler in the Item component to pass the item to it. A button element 
// is used to trigger the actual event:

const Item = ({ item, onRemoveItem }) => {
    const handleRemoveItem = () => {
        onRemoveItem(item);
    };
    return (
        <div>
            <span>
                <a href={item.url}>{item.title}</a>
            </span>
            <span>{item.author}</span>
            <span>{item.num_comments}</span>
            <span>{item.points}</span>
            <span>
                <button type="button" onClick={handleRemoveItem}>
                    Dismiss
                </button>
            </span>
        </div>
    );
};

// We could have passed only the item's objectID, since that's all we need in the App component's callback handler, 
// but we aren't sure what information the hadnler might need later. It may need more than an indentifier to remove an item.
// If we call the handler onRemoveItem, it should be the item being passed, not just its identifier.

// We have made the list of stories stateful with React's useState Hook; passed the still searched stories down as props to
// the List component; and implemented a callback handler (handleRemoveStory) and handler (handleRemoveItem) to be used in
// their respective components. Since a handler is just a function, and in this case it doesn't return anything, we could
// remove the block body for it for the sake of completeness:

const Item = ({ item, onRemoveItem }) => {
    const handleRemoveItem = () =>
        onRemoveItem(item);
    ...
};

// This change makes our source code less readable as we accumulate handlers in the function component. Sometimes I refactor 
// handlers in a function component from an arrow function back to a normal function statement, just to make the component
// more explorable:

const Item = ({ item, onRemoveItem }) => {
    function handleRemoveItem() {
        onRemoveItem(item);
    }
    ...
};

// In this sectin we applied props, handlers, callback handlers and state. That are all lessons learned from before. 
// Now we'll tackle inline handlers, which allow us to execute the function right in the JSX. There are two solutions using 
// the incoming function in the Item component as an inline handler. 
// First, using JS's bind method:

const Item = ({ item, onRemoveItem }) => (
    <div>
        <span>
            <a href={item.url}>{item.title}</a>
        </span>
        <span>{item.author}</span>
        <span>{item.num_comments}</span>
        <span>{item.points}</span>
        <span>
            <button type="button" onClick={onRemoveItem.bind(null, item)}>
                Dismiss
            </button>
        </span>
    </div>
);

// Using JS's bind method on a function allows us to bind arguments to that function that should be used when executing it.
// The bind methods returns a new function with the bound agrument attached. 

// The second and more popular solution is to use a wrapping arrow function, which allows us to sneak in arguments like item:

const Item = ({ item, onRemoveItem }) => (
    <div>
        <span>
            <a href={item.url}>{item.title}</a>
        </span>
        <span>{item.author}</span>
        <span>{item.num_comments}</span>
        <span>{item.points}</span>
        <span>
            <button type="button" onClick={() => onRemoveItem(item)}>
                Dismiss
            </button>
        </span>
    </div>
);

// This is a quick solution, sometimes we don't want to refactor a function component's concise function body back to a block
// body to define an appropiate handler between function singnature and return statement. While this way is more concise than
// the others, it can also be more difficult to debug because JS logic may be hidden in JSX. It becomes even more verbose if
// the wrapping arrow functino encapsulates more than one line of implementation logic, by using a block body instead of a 
// concise body. This should be avoided:

const Item = ({ item, onRemoveItem }) => (
    <div>
        ...
        <span>
            <button
                type="button"
                onClick={() => {
                    // do something else
                    // note: avoid using complex logic in JSX
                    onRemoveItem(item);
                }}
            >
                Dismiss
            </button>
        </span>
    </div>
);

// All three handler versions, two of which are inline and the normal handler, are acceptable. The non-inlined handler moves
// the implementation details into the funtion component's block body; the inline handler move the implementation details 
// into the JSX.