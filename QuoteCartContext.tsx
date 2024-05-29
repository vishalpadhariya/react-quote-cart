import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useEffect,
} from "react";

// Define the types
export interface Product {
  id: number;
  imageUrl: string;
  uri: string;
  name: string;
  price: number;
}

export interface QuoteCartItem extends Product {
  quantity: number;
}

interface QuoteCartState {
  items: QuoteCartItem[];
}

interface QuoteCartAction {
  type: string;
  payload?: any;
}

const initialState: QuoteCartState = {
  items: [],
};

// Local Storage Keys
const LOCAL_STORAGE_KEY = "quoteCart";

// Load state from local storage
const loadState = (): QuoteCartState => {
  try {
    const serializedState = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (serializedState === null) {
      return initialState;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return initialState;
  }
};

// Save state to local storage
const saveState = (state: QuoteCartState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(LOCAL_STORAGE_KEY, serializedState);
  } catch (err) {
    // Ignore write errors
  }
};

// Reducer function to handle cart actions
function quoteCartReducer(
  state: QuoteCartState,
  action: QuoteCartAction
): QuoteCartState {
  switch (action.type) {
    case "ADD_TO_CART":
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.product.id
      );
      if (existingItemIndex !== -1) {
        // Update quantity if item already exists
        const updatedItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
        return { ...state, items: updatedItems };
      } else {
        // Add new item to cart
        return {
          ...state,
          items: [
            ...state.items,
            { ...action.payload.product, quantity: action.payload.quantity },
          ],
        };
      }
    case "REMOVE_FROM_CART":
      return {
        ...state,
        items: state.items.filter(
          (item) => item.id !== action.payload.productId
        ),
      };
    case "UPDATE_CART":
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.productId
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    case "EMPTY_CART":
      return { ...state, items: [] }; // Empty the cart
    default:
      return state;
  }
}

// Create context
const QuoteCartContext = createContext<{
  state: QuoteCartState;
  dispatch: React.Dispatch<QuoteCartAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

// QuoteCart Provider Component
export const QuoteCartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(
    quoteCartReducer,
    initialState,
    loadState
  );
  useEffect(() => {
    saveState(state);
  }, [state]);
  return (
    <QuoteCartContext.Provider value={{ state, dispatch }}>
      {children}
    </QuoteCartContext.Provider>
  );
};

// Hook to use the quote cart context
export const useQuoteCart = () => {
  return useContext(QuoteCartContext);
};
