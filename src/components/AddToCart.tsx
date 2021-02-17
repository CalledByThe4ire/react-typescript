import React from 'react';
import { useStateDispatch, CartItem } from './AppState';

export interface AddToCartProps {
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
}

function withAddToCart<T extends AddToCartProps>(
  Component: React.ComponentType<T>
) {
  const addToCart: React.FC<Omit<T, keyof AddToCartProps>> = (props) => {
    const dispatch = useStateDispatch();

    const handleAddToCartClick: AddToCartProps['addToCart'] = (item) => {
      dispatch({
        type: 'ADD_TO_CART',
        payload: {
          item,
        },
      });
    };
    return <Component {...(props as T)} addToCart={handleAddToCartClick} />;
  };

  addToCart.displayName = `withAddToCart(${
    Component.displayName || Component.name
  }`;

  return addToCart;
}

export default withAddToCart;

export const WithAddToCartProps: React.FC<{
  children: (props: AddToCartProps) => JSX.Element;
}> = ({ children }) => {
  const dispatch = useStateDispatch();

  const addToCart: AddToCartProps['addToCart'] = (item) => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        item,
      },
    });
  };

  return children({ addToCart });
};

export const useAddToCart = () => {
  const dispatch = useStateDispatch();

  const addToCart: AddToCartProps['addToCart'] = (item) => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        item,
      },
    });
  };

  return addToCart;
};
