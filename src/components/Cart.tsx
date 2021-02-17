import React, { createRef } from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import CartCSS from './Cart.module.css';
import { AppStateContext } from './AppState';

interface CartProps {}

interface CartState {
  isOpen: boolean;
}

class Cart extends React.Component<CartProps, CartState> {
  #containerRef: React.RefObject<HTMLDivElement>;

  //   state = { isOpen: false };
  constructor(props: CartProps) {
    super(props);
    this.state = { isOpen: false };

    this.#containerRef = createRef();
    // this.handleClick = this.handleClick.bind(this);
  }

  handleCartClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    this.setState((prevState) => ({ isOpen: !prevState.isOpen }));
  };

  handleOutsideClick = (event: MouseEvent) => {
    if (
      this.#containerRef.current &&
      !this.#containerRef.current.contains(event.target as Node)
    ) {
      this.setState({ isOpen: false });
    }
  };

  componentDidMount() {
    document.addEventListener('mousedown', this.handleOutsideClick);
  }

  componentWillUnmount() {
    document.addEventListener('mousedown', this.handleOutsideClick);
  }

  // example of useEffect usage for RFC
  // useEffect(() => {
  //   const listener = () => alert('Hello!');

  //   document.addEventListener('mousedown', listener);

  //   return () => {
  //     document.removeEventListener('mousedown', listener)
  //   }
  // }, []);

  render() {
    return (
      <AppStateContext.Consumer>
        {(state) => {
          const itemsCount = state.cart.items.reduce(
            (acc, item) => acc + item.quantity,
            0
          );

          return (
            <div className={CartCSS.cartContainer} ref={this.#containerRef}>
              <button
                className={CartCSS.button}
                type="button"
                onClick={this.handleCartClick}
                disabled={!itemsCount}
              >
                <FiShoppingCart />
                <span>{itemsCount} pizza(s)</span>
              </button>
              <div
                className={CartCSS.cartDropDown}
                style={{ display: this.state.isOpen ? 'block' : 'none' }}
              >
                <ul>
                  {state.cart.items.map((item) => (
                    <li key={item.id}>
                      {item.name} &times; {item.quantity}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        }}
      </AppStateContext.Consumer>
    );
  }
}

export default Cart;
