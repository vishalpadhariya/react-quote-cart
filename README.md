# react-quote-cart

`react-quote-cart` is a simple and flexible React context provider for managing a quote cart in your application. It provides hooks and components to add, remove, update, and get products in a quote cart.

## Installation

Install the package via npm:

```bash
npm i @padhariyavishal/react-quote-cart
```

## Usage

### Setting Up the Provider

Wrap your application with the QuoteCartProvider to provide the quote cart context to your components.

```bash
import React from 'react';
import ReactDOM from 'react-dom';
import { QuoteCartProvider } from 'react-quote-cart';
import App from './App';

ReactDOM.render(
  <QuoteCartProvider>
    <App />
  </QuoteCartProvider>,
  document.getElementById('root')
);
```

### Adding Items to the Cart

Use the `useQuoteCartActions` hook to add items to the quote cart.

```bash
// src/App.tsx
import React from 'react';
import { useQuoteCartActions, QuoteCart } from 'react-quote-cart';

const App = () => {
  const { addToQuoteCart } = useQuoteCartActions();

  const sampleProduct = { id: 1, name: 'Product 1', uri: 'product-1', imageUrl:'https://placehold.co/150', price: 100 };
  const anotherProduct = { id: 2, name: 'Product 2', uri: 'product-2',imageUrl:'https://placehold.co/150', price: 200 };

  return (
    <div>
      <h1>Quote Cart Example</h1>
      <button onClick={() => addToQuoteCart(sampleProduct)}>Add Product 1</button>
      <button onClick={() => addToQuoteCart(anotherProduct, 3)}>Add Product 2 (3 units)</button>
      <QuoteCart />
    </div>
  );
};

export default App;
```

### Updating Item Quantities in the Cart

Use the updateQuoteCart function from the useQuoteCartActions hook to update item quantities directly in the cart.

**Displaying Cart Items**

```bash
// src/components/QuoteCart.tsx
import React from 'react';
import { useQuoteCart } from 'react-quote-cart';
import { useQuoteCartActions } from 'react-quote-cart';

const QuoteCart = () => {
  const { state } = useQuoteCart();
  const { removeFromCart, updateQuoteCart } = useQuoteCartActions();

  const handleQuantityChange = (id: number, quantity: number) => {
    if (quantity >= 0) {
      updateQuoteCart(id, quantity);
    }
  };

  return (
    <div>
      <h2>Quote Cart</h2>
      <ul>
        {state.items.map(item => (
          <li key={item.id}>
            {item.name} -
            <input
              type="number"
              value={item.quantity}
              onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
              min="0"
            />
            x ${item.price}
            <button onClick={() => removeFromCart(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuoteCart;
```

## API

### `QuoteCartProvider`

Wrap your application with QuoteCartProvider to enable the quote cart context.

```bash
import { QuoteCartProvider } from 'react-quote-cart';

<QuoteCartProvider>
  {children}
</QuoteCartProvider>
```

### `useQuoteCart`

Hook to access the quote cart state.

```bash
import { useQuoteCart } from 'react-quote-cart';

const { state } = useQuoteCart();
```

### `useQuoteCartActions`

Hook to access actions to modify the quote cart.

```bash
import { useQuoteCartActions } from 'react-quote-cart';

const { addToQuoteCart, removeFromCart, updateQuoteCart, emptyQuoteCart } = useQuoteCartActions();
```

`addToQuoteCart(product: Product, quantity: number = 1)`

Adds a product to the quote cart or increases the quantity if it already exists.

**- product:** The product object to add.

**- quantity:** The quantity of the product to add. Defaults to 1.

`removeFromCart(productId: number)`

Removes a product from the quote cart based on its ID.

**- productId:** The ID of the product to remove.

`updateQuoteCart(productId: number, quantity: number)`

Updates the quantity of a product in the quote cart.

**- productId:** The ID of the product to update.

**- quantity:** The new quantity of the product.

`emptyQuoteCart`

Remove all items from the cart.

## Example

Here's a full example of how to use react-quote-cart in your application:

```bash
// src/App.tsx
import React from 'react';
import { QuoteCartProvider, useQuoteCartActions, QuoteCart } from 'react-quote-cart';

const App = () => {
  const { addToQuoteCart } = useQuoteCartActions();

  const sampleProduct = { id: 1, name: 'Product 1',uri: 'product-1', imageUrl:'https://placehold.co/150', price: 100 };
  const anotherProduct = { id: 2, name: 'Product 2',uri: 'product-2', imageUrl:'https://placehold.co/150', price: 200 };

  return (
    <QuoteCartProvider>
      <div>
        <h1>Quote Cart Example</h1>
        <button onClick={() => addToQuoteCart(sampleProduct)}>Add Product 1</button>
        <button onClick={() => addToQuoteCart(anotherProduct, 3)}>Add Product 2 (3 units)</button>
        <QuoteCart />
      </div>
    </QuoteCartProvider>
  );
};

export default App;
```

**Displaying Cart Items**

```bash
// src/components/QuoteCart.tsx
import React from 'react';
import { useQuoteCart } from 'react-quote-cart';
import { useQuoteCartActions } from 'react-quote-cart';

const QuoteCart = () => {
  const { state } = useQuoteCart();
  const { removeFromCart, updateQuoteCart, emptyQuoteCart } = useQuoteCartActions();

  const handleQuantityChange = (id: number, quantity: number) => {
    if (quantity >= 0) {
      updateQuoteCart(id, quantity);
    }
  };

  return (
    <div>
      <h2>Quote Cart</h2>
       <button onClick={() => emptyQuoteCart()}>Empty Cart</button>
      <ul>
        {state.items.map(item => (
          <li key={item.id}>
            {item.name} -
            <input
              type="number"
              value={item.quantity}
              onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
              min="0"
            />
            x ${item.price}
            <button onClick={() => removeFromCart(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuoteCart;
```
