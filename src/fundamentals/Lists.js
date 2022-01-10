import React from 'react';

// Rendering a list of items in JSX
// Firstly define the array as a variable

const list = [
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

// JSX to render each item of the list
// Assigning a key attribute to each list's items element, React can identify modified items if the list changes

function Lists() {

    return (
        <div>
            <h1>My Hacker Stories</h1>

            <label htmlFor="search">Search: </label>
            <input id="search" type="text" />

            {list.map(function (item) {
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
            })}

            <hr />

        </div>
    );
}

export default Lists;