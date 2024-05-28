import { useQuoteCart } from "../context/QuoteCartContext";
import { Product } from "../context/QuoteCartContext";

export const useQuoteCartActions = () => {
  const { dispatch } = useQuoteCart();

  const addToQuoteCart = (product: Product, quantity: number = 1) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: { product, quantity },
    });
  };

  const removeFromCart = (productId: number) => {
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: { productId },
    });
  };

  const updateQuoteCart = (productId: number, quantity: number) => {
    dispatch({
      type: "UPDATE_CART",
      payload: { productId, quantity },
    });
  };

  const emptyQuoteCart = () => {
    dispatch({
        type: 'EMPTY_CART'
    });
};

  return {
    addToQuoteCart,
    removeFromCart,
    updateQuoteCart,
    emptyQuoteCart
  };
};
