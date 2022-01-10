import React from 'react';

// function declaration
function () { ... }

// arrow function declaration
const () => { ... }
// you can remove the () if it has only one argument, multiple arguments require ():
// Allowed
const item => { ... }
const (item) => { ... }
const (item, index) => { ... }

// Not allowed
const item, index => { ... }

// Using arrow functions is more concise
const App = () => {
    return (
        <div>
            ...
        </div>
    );
};

const List = () => {
    return list.map(function (item) {
        return (
            <div key={item.objectID}>
                ...
            </div>
        );
    });
};

// Holds true for other functions such as JS array's map method from earlier
// Example taken from Lists.js:
const List = () => {
    return list.map(item => {
        return (
            <div key={item.objectID}>
                <span>
                    <a href={item.url}>{item.title}</a>
                </span>
                <span>{item.author}</span>
                <span>{item.num_comments}</span>
                <span>{item.points}</span>
            </div>
        );
    });
};

// If an arrow function doesn't perform any task & only returns information, you can remove the {} (block body) of the function
// In a concise body, an implicit return statement is attached, so you can remove the return statement:

// with block body 
count => {
    //perform any task in between
    return count + 1;
}

// with concise body
count =>
    count + 1;


// This can be done for the App and Lists components as they only return JSX and don't perform any task in between,
// while also the arrow can be applied to the map function

const App = () => (
    <div>
        ...
    </div>
);

const List = () =>
    list.map(item => (
        <div key={item.objectID}>
            <span>
                <a href={item.url}>{item.title}</a>
            </span>
            <span>{item.author}</span>
            <span>{item.num_comments}</span>
            <span>{item.points}</span>
        </div>
    ));

// Omitting the function statement, curly braces & return statement is optional.
// Sometimes block bodies are needed to add more business logic between function signature & return statement.

const App = () => {
    // perform any task in between
    return (
        <div>
            ...
        </div>
    );
};