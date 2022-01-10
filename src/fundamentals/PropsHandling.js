// Props are passed from parent to child down the component tree. Since we use props to transport info
// from component to component frequently, and sometimes via other components which are in between, it is
// useful to know a few tricks to make passing props more convenient.

// React props are a JS object, else we couldn't access props.list or props.onSearch in React components. 
// An example of some JS tricks we can apply to props, accessing an objects's properties with modern JS
// object destructuring:

const user = {
    firstName: 'Robin',
    lastName: 'Wieruch',
};

// without object destructuring
const firstName = user.firstName;
const lastName = user.lastName;
console.log(firstName + ' ' + lastName);
// "Robin Wieruch"

// with object destructuring
const { firstName, lastName } = user;
console.log(firstName + ' ' + lastName);
// "Robin Wieruch"

// If we need to access multiple properties of an object using one line of code instead of multiple line 
// is often simpler and more elegant. That's why object destructuring is already widely used in JS.
// Apply this to the React props in our Search component, but first we have to refactor the Search component's
// arrow function from concise body into block body:

const Search = props => {
    return (
        <div>
            <label htmlFor="search">Search: </label>
            <input
                id="search"
                type="text"
                value={props.search}
                onChange={props.onSearch}
            />
        </div>
    );
};

// And second we can apply the destructuring of the props object in the component's function body:
const Search = props => {
    const { search, onSearch } = props;
    return (
        <div>
            <label htmlFor="search">Search: </label>
            <input
                id="search"
                type="text"
                value={search}
                onChange={onSearch}
            />
        </div>
    );
};

// This is a basic destructuring of the props object so that the object's properties can be easily used in the 
// component. However, we also had to refractor the Search component's arrow function from concise body into 
// block body to access the properties of props with the object destructuring in the function's body.
// By destructuring the props we don't have to constantly refactor our components. 
// We can take this one step further by destructuring the props object right away in the function signature of 
// our component, omitting the function's block body of the component again:
const Search = ({ search, onSearch }) => (
    <div>
        <label htmlFor="search">Search: </label>
        <input
            id="search"
            type="text"
            value={search}
            onChange={onSearch}
        />
    </div>
);


// React props are rarely used in components by themselves; rather, all the info that is contained in the props 
// object is used. By destructuring props right away in the function signature, we can conveniently access all info 
// without dealing with its props container. We can go even further.
// Here is another scenario to explore advanced props handling in React; preceding this example, we will 
// extract a new Item component from the List component with the previous lesson learned about object destructuring
// for React's props object:

const List = ({ list }) =>
    list.map(item => <Item key={item.objectID} item={item} />);

const Item = ({ item }) => (
    <div>
        <span>
            <a href={item.url}>{item.title}</a>
        </span>
        <span>{item.author}</span>
        <span>{item.num_comments}</span>
        <span>{item.points}</span>
    </div>
);

// Now the incoming item in the Item component has something with props, they are both JS objects. Even though
// the item object has already been destructured from the props in the Item component's function
// signature, it isn't directly used in the Item component. The item object only passes its information
// (object properties) to the elements.
// There are more variations to this destructuring example; another one is nested destructuring:

const user = {
    firstName: 'Robin',
    pet: {
        name: 'Trixi',
    },
};

// without object destructuring
const firstName = user.firstName;
const name = user.pet.name;
console.log(firstName + ' has a pet called ' + name);
// "Robin has a pet called Trixi"

// with nested object destructuring
const {
    firstName,
    pet: {
        name,
    },
} = user;

console.log(firstName + ' has a pet called ' + name);
// "Robin has a pet called Trixi"


// Nested destructuring helps us to access properties from objects which are deeply nested. Now in our Item 
// components, because the item object is never directly used in the Item component's JSX, we can perform a 
// nested destructuring in the component's function signature too:

// Variation 1: Nested Destructuring
const Item = ({
    item: {
        title,
        url,
        author,
        num_comments,
        points,
    },
}) => (
    <div>
        <span>
            <a href={url}>{title}</a>
        </span>
        <span>{author}</span>
        <span>{num_comments}</span>
        <span>{points}</span>
    </div>
);

// Nested destructuring helps us to gather all the needed info of the item object in the function
// signature for its immediate usage in the component's elements. However, nested destructuring introduces 
// lots of clutter through indentation in the function signature. 
// Another approach with is with JS spread and rest operators. In order to prepare for it, we will refactor 
// List and Item components to the following implementation. Rather than passing the item as object from List 
// to Item component we are passing every property of the item object:

// Variation 2: Spread and Rest Operators
// 1. Iteration
const List = ({ list }) =>
    list.map(item => (
        <Item
            key={item.objectID}
            title={item.title}
            url={item.url}
            author={item.author}
            num_comments={item.num_comments}
            points={item.points}
        />
    ));
const Item = ({ title, url, author, num_comments, points }) => (
    <div>
        <span>
            <a href={url}>{title}</a>
        </span>
        <span>{author}</span>
        <span>{num_comments}</span>
        <span>{points}</span>
    </div>
);

// Now even though the Item component's function signature is more concise, the clutter ended up in 
// the List component instead, because every property is passed to the Item component individually.
// We can improve this using JS' spread operator:

const profile = {
    firstName: 'Robin',
    lastName: 'Wieruch',
};

const address = {
    country: 'Germany',
    city: 'Berlin',
    code: '10439',
};

const user = {
    ...profile,
    gender: 'male',
    ...address,
};

console.log(user);
// {
// firstName: "Robin",
// lastName: "Wieruch",
// gender: "male"
// country: "Germany,
// city: "Berlin",
// code: "10439"
// }

// JS' spread operator allows us to literally spread all key/value pairs of an object to another 
// object. This can be done in React's JSX. Instead of passing each property one at a time via props from List to 
// Item component as before, we can use JS' spread operator to pass all the object's key/value pairs as 
// attribute/value pairs to a JSX element:

// Variation 2: Spread and Rest Operators
// 2. Iteration
const List = ({ list }) =>
    list.map(item => <Item key={item.objectID} {...item} />);
const Item = ({ title, url, author, num_comments, points }) => (
    <div>
        <span>
            <a href={url}>{title}</a>
        </span>
        <span>{author}</span>
        <span>{num_comments}</span>
        <span>{points}</span>
    </div>
);


// This refactoring made the process of passing the info from List to Item more concise. Finally we'll use JS' rest
// parameters as the icing on the cake. The JS rest operator happens always as the last part of an object destructuring:
const user = {
    id: '1',
    firstName: 'Robin',
    lastName: 'Wieruch',
    country: 'Germany',
    city: 'Berlin',
};

const { id, country, city, ...userWithoutAddress } = user;
console.log(userWithoutAddress);
// {
// firstName: "Robin",
// lastName: "Wieruch"
// }

console.log(id);
// "1"
console.log(city);
// "Berlin"


// Even though both have the same syntax (...), the rest operator shouldn't be mistaken with the spread operator.
// Whereas the rest operator happens on the right side of an assignment, the spread operator happens on the left side.
// The rest operator is always used to seperate an object from some of its properties.
// Now it can be used in our List component to separate the objectID from the item, because the objectID is only
// used as key and isn't used in the Item component. Only the remaining (rest) item gets spread as attribute/value 
// pairs into the Item component:

// Variation 2: Spread and Rest Operators (final)
const List = ({ list }) =>
    list.map(({ objectID, ...item }) => <Item key={objectID} {...item} />);
const Item = ({ title, url, author, num_comments, points }) => (
    <div>
        <span>
            <a href={url}>{title}</a>
        </span>
        <span>{author}</span>
        <span>{num_comments}</span>
        <span>{points}</span>
    </div>
);


// In this final variation, the rest operator is used to destructure the objectID from the rest of the item object.
// Afterward, the item is spread with its key/value pairs into the Item component. While this final variation is 
// very concise, it comes with advanced JS features.

// Lets look back at the original version:

const List = ({ list }) =>
    list.map(item => <Item key={item.objectID} item={item} />);

const Item = ({ item }) => (
    <div>
        <span>
            <a href={item.url}>{item.title}</a>
        </span>
        <span>{item.author}</span>
        <span>{item.num_comments}</span>
        <span>{item.points}</span>
    </div>
);

// It may not be the most concise, but it is the easiest to read.
// Variation 1 with nested destructuring didn't add much benefit in this particular example, while variation 2
// perhaps added to many JS features (spread, rest).
// After all, these variations have their pros and cons. When refactoring a component, always aim for readability,
// especially when working in teams.