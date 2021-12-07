import { createContext, useReducer } from 'react';

import Cookies from 'js-cookie';

import { parseData, stringifyData } from '.';

export const StoreContext = createContext();

const initialState = {
  darkMode: false,
  // darkMode: Cookies.get('darkMode') === 'ON' ? true : false,
  cart: {
    cartItems: Cookies.get('cartItems')
      ? parseData(Cookies.get('cartItems'))
      : [],
    shippingAddress: Cookies.get('shippingAddress')
      ? parseData(Cookies.get('shippingAddress'))
      : {},
    paymentMethod: Cookies.get('paymentMethod')
      ? Cookies.get('paymentMethod')
      : '',
  },
  userInfo: Cookies.get('userInfo') ? parseData(Cookies.get('userInfo')) : null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'DARK_MODE_ON':
      return { ...state, darkMode: true };
    case 'DARK_MODE_OFF':
      return { ...state, darkMode: false };
    case 'CART_ADD_ITEM':
      const newItem = action.payload;

      const existentItem = state.cart.cartItems.find(
        (item) => item._id === newItem._id
      );

      const cartItems = existentItem
        ? state.cart.cartItems.map((item) =>
            item.name === existentItem.name ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      Cookies.set('cartItems', stringifyData(cartItems));

      return { ...state, cart: { ...state.cart, cartItems } };

    case 'CART_REMOVE_ITEM': {
      const cartItems = state.cart.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      Cookies.set('cartItems', stringifyData(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }

    case 'CART_CLEAR':
      Cookies.remove('cartItems');

      return {
        ...state,
        cart: {
          ...state.cart,
          cartItems: [],
          shippingAddress: {},
          paymentMethod: '',
        },
      };

    case 'USER_LOGIN':
      Cookies.set('userInfo', stringifyData(action.payload));
      return { ...state, userInfo: action.payload };

    case 'USER_LOGOUT':
      Cookies.remove('userInfo');
      Cookies.remove('cartItems');
      Cookies.remove('paymentMethod');
      Cookies.remove('shippingAddress');
      return {
        ...state,
        userInfo: null,
        cart: { cartItems: [], shippingAddress: {}, paymentMethod: '' },
      };

    case 'SAVE_SHIPPING_ADDRESS':
      Cookies.set('shippingAddress', stringifyData(action.payload));
      return {
        ...state,
        cart: { ...state.cart, shippingAddress: action.payload },
      };

    case 'SAVE_PAYMENT_METHOD':
      Cookies.set('paymentMethod', action.payload);
      return {
        ...state,
        cart: { ...state.cart, paymentMethod: action.payload },
      };

    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  return (
    <StoreContext.Provider value={value}>
      {props.children}
    </StoreContext.Provider>
  );
}
