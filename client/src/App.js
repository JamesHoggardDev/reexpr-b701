import React, { useState, useEffect, useRef } from 'react';
import { getInitProducts } from './data';

const initialProducts = getInitProducts()

const getAsyncProducts = () =>
  new Promise(resolve =>
    setTimeout(
      () => resolve({ data: { products: initialProducts } }),
      2000
    )
  );

const useSemiPersistentState = (key, initialState) => {
  const [value, setValue] = useState(
    localStorage.getItem(key) || initialState
  );

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
};

const App = () => {
  const [searchTerm, setSearchTerm] = useSemiPersistentState(
    'search',
    'React'
  );

  const [products, setProducts] = useState([]);
  const [bkEndData, setBkEndData] = useState([{}]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getAsyncProducts().then(result => {
      setProducts(result.data.products);
      setIsLoading(false);
    })
    .catch(() => setIsError(true));
  }, []);

  const handleRemoveProduct = item => {
    const newProducts = products.filter(
      product => item.objectID !== product.objectID
    );
    setProducts(newProducts);
  };

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };
  const searchedProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const opening = {
    greeting: "Hello",
    title: "BarheKry188",
  };
  useEffect(() => {
    fetch('/api').then(
      res => res.json()
    ).then(
      data => {
        setBkEndData(data);
      }
    )
  }, []);

  return (
    <div>
      <div>
        <h1>
          {opening.greeting} {opening.title}
        </h1>
        <InputWithLabel
          id="search"
          value={searchTerm}
          isFocused
          onInputChange={handleSearch}
        >
          <strong>Search:</strong>
        </InputWithLabel>
        <hr />
        <h2>Top Reviewers: </h2>
        {isError && <p>Something went wrong ...</p>}

        {isLoading ? (
          <p>Loading ...</p>
        ) : (
          <List
              list={searchedProducts}
              onRemoveItem={handleRemoveProduct}
          />
        )}
      </div>

      {(typeof bkEndData.users === 'undefined') ? (
        <p>Loading users</p>
      ) : (
        bkEndData.users.map((user) => (
          <div key={user.objectID} className="comment-display">
            <p key={user.objectID}>
              <span>{user.num_comms}</span>
              <span style={{ padding: 20, color: 'blue' }}>{user.objectID}</span>
              <span style={{ padding: 20 }}>{user.num_comms}</span>
              <span style={{ padding: 20 }}>{user.comment}</span>
            </p>
            <hr style={{ padding: 20 }} />
          </div>
        ))
      )}
    </div>
  )
};

const InputWithLabel = ({
  id,
  value,
  type = 'text',
  onInputChange,
  isFocused,
  children,
}) => {
  const inputRef = useRef();

  useEffect(() => {
    if (isFocused) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  return (
    <>
      <label htmlFor={id}>{children}</label>
      &nbsp;
      <input
        ref={inputRef}
        id={id}
        type={type}
        value={value}
        onChange={onInputChange}
      />
    </>
  );
};

const List = ({ list, onRemoveItem }) =>
  list.map(item => (
    <Item
      key={item.objectID}
      item={item}
      onRemoveItem={onRemoveItem}
    />
  ));

const Item = ({ item, onRemoveItem }) => (
  <div>
    <span style={{ padding: "20px" }}>
      <a href={item.url}>{item.title}</a>
    </span>
    <span >{item.author}</span>
    <span style={{ padding: "20px" }}>{item.num_comms}</span>
    <span>Rating: {item.points}</span>
    <span style={{ padding: "20px" }}>
      <button type="button" onClick={() => onRemoveItem(item)}>
        Dismiss
      </button>
    </span>
    <hr />
  </div>
);

export default App;
