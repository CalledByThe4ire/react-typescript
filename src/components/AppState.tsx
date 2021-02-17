import React, { createContext, useEffect, useReducer, useContext } from 'react';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface AppStateValue {
  cart: {
    items: CartItem[];
  };
}

interface Action<T> {
  type: T;
}

interface AddToCartAction extends Action<'ADD_TO_CART'> {
  payload: {
    item: Omit<CartItem, 'quantity'>;
  };
}

interface InitializeCartAction extends Action<'INITIALIZE_CART'> {
  payload: {
    cart: AppStateValue['cart'];
  };
}

const reducer = (
  state: AppStateValue,
  action: AddToCartAction | InitializeCartAction
) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const itemToAdd = action.payload.item;
      const isItemExists = state.cart.items.find(
        (item) => item.id === itemToAdd.id
      );

      return {
        ...state,
        cart: {
          ...state.cart,
          items: isItemExists
            ? state.cart.items.map((item) => {
                if (item.id === itemToAdd.id) {
                  return { ...item, quantity: item.quantity + 1 };
                }

                return item;
              })
            : [...state.cart.items, { ...itemToAdd, quantity: 1 }],
        },
      };
    case 'INITIALIZE_CART':
      return { ...state, cart: action.payload.cart };
    default:
      return state;
  }
};

const defaultStateValue: AppStateValue = {
  cart: {
    items: [],
  },
};

export const AppStateContext = createContext(defaultStateValue);
export const AppDispatchContext = createContext<
  React.Dispatch<AddToCartAction> | undefined
>(undefined);

export const useStateDispatch = () => {
  const dispatch = useContext(AppDispatchContext);

  if (!dispatch) {
    throw new Error(
      'useStateDispatch was called outside of the AppDispatchContext Provider'
    );
  }

  return dispatch;
};

const AppStateProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultStateValue);

  useEffect(() => {
    const cart = window.localStorage.getItem('cart');

    if (cart) {
      dispatch({
        type: 'INITIALIZE_CART',
        payload: { cart: JSON.parse(cart) },
      });
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('cart', JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
};

export default AppStateProvider;
