// Here we will learn how to use a React element in the same fashion as an HTML element, with an opening and closing tag:

const App = () => {
    ...
return (
    <div>
        <h1>My Hacker Stories</h1>
        <InputWithLabel
            id="search"
            value={searchTerm}
            onInputChange={handleSearch}
        >
            Search
        </InputWithLabel>
        ...
    </div>
);
};

// Instead of using the label prop from before, we inserted the text "Search:" between the component's element's tags. 
// In the InputWithLabel component, you have access to this info via React's children prop. Instead of using the label prop,
// we use the children prop to render everything that has been passed down from above where you want it:

const InputWithLabel = ({
    id,
    value,
    type = 'text',
    onInputChange,
    children,
}) => (
    <>
        <label htmlFor={id}>{children}</label>
        &nbsp;
        <input
            id={id}
            type={type}
            value={value}
            onChange={onInputChange}
        />
    </>
);

// Now the React component's elements behave similar to native HTML. Everything that's passed between a component's 
// elements can be accessed as children in the component and be rendered somewhere. Sometimes when using a React component,
// you want to have more freedom from the outside what to render in the inside of a component:

const App = () => {
    ...
return (
    <div>
        <h1>My Hacker Stories</h1>
        <InputWithLabel
            id="search"
            value={searchTerm}
            onInputChange={handleSearch}
        >
            <strong>Search:</strong>
        </InputWithLabel>
        ...
    </div>
);
};

// With this React feature, we can compose React components into each other. We've used it with a JS string and with a string
// wrapped in an HTML <strong> element, but it doesn't end here. You can pass components via React children as well.

