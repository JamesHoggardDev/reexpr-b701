import React, { useState, useEffect, useRef } from 'react';

const initialProducts = [
  {
    title: 'Brother-MFC20x',
    url: 'https://rjs.org/',
    author: 'Joan Vicke',
    num_comms: 3,
    points: 4887,
    objectID: 0,
  },
  {
    title: 'Brother-MFC10x',
    url: 'https://www.js.org/',
    author: 'Ervin Kimb',
    num_comms: 2,
    points: 5007,
    objectID: 1,
  },
  {
    title: 'Epson-C5560i',
    url: 'https://www.js.org/',
    author: 'Mary Kib',
    num_comms: 2,
    points: 5007,
    objectID: 2,
  },
  {
    title: 'Canon-PP7C0rx',
    url: 'https://www.js.org/',
    author: 'B. Montgomery',
    num_comms: 2,
    points: 5007,
    objectID: 3,
  },
];

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

  useEffect(() => {
    getAsyncProducts().then(result => {
      setProducts(result.data.products);
    });
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

  const [bkEndData, setBkEndData] = useState([{}]);

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
        <List list={searchedProducts} onRemoveItem={handleRemoveProduct} />
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
