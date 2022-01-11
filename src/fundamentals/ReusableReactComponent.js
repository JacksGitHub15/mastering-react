// Upon closer inspection of the Search component, the label element has the "Search: "; the id/htmlFor attributes have the 
// search identifier; the value is called search; and the callback handler is called onSearch. The component is tied to the
// search feature, which makes it less reusable for the rest of the application and non search-related tasks. 
// It also risks intorducing bugs if two of these Search components are rendered side by side, because the htmlFor/id 
// combination is duplicated, breaking the focus when one of the labels is clicked by the user.

// Since the Search component doesn't have any actual "search" functionality, it takes little effort to generalize other 
// search domain properties to make the comnponent reusable for the rest of the application. Let's pass an additional id and
// label prop to the Search component, rename the actual value and callback handler to something more abstract, and rename 
// component accordingly:

const App = () => {
    ...
return (
    <div>
        <h1>My Hacker Stories</h1>
        <InputWithLabel
            id="search"
            label="Search"
            value={searchTerm}
            onInputChange={handleSearch}
        />
        ...
    </div>
);
};
const InputWithLabel = ({ id, label, value, onInputChange }) => (
    <>
        <label htmlFor={id}>{label}</label>
        &nbsp;
        <input
            id={id}
            type="text"
            value={value}
            onChange={onInputChange}
        />
    </>
);

// It's not fully reusable yet, if we want an input field for data like a number(number) or phone number (tel), the 
// type attribute of the input field needs to be accessible from the outside too:

const InputWithLabel = ({
    id,
    label,
    value,
    type = 'text',
    onInputChange,
}) => (
    <>
        <label htmlFor={id}>{label}</label>
        &nbsp;
        <input
            id={id}
            type={type}
            value={value}
            onChange={onInputChange}
        />
    </>
);

// From the App component, no type prop is passed to the InputWithLabel component, so it is not specified from the outside. 
// The default parameter from the function signature takes over for the input field.
// With just a few changes we turned a specialized Search component into a more reusable component.
// We generalized the naming of the internal implementation details and gave the new component a larger API surface to provide
// all the necessary info from the outside. We aren't using the component elsewhere, but we increased its ability to handle 
// the task if we do.