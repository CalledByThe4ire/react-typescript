import React from 'react';
import PizzaCSS from './Pizza.module.css';
import { useAddToCart } from './AddToCart';
import { Pizza } from '../../types';

interface PizzaProps {
  pizza: Pizza;
}

const PizzaItem: React.FC<PizzaProps> = ({ pizza }) => {
  const addToCart = useAddToCart();
  const handleAddToCartClick = () => {
    addToCart({ id: pizza.id, name: pizza.name, price: pizza.price });
  };
  return (
    <li className={PizzaCSS.container}>
      <h2>{pizza.name}</h2>
      <p>{pizza.description}</p>
      <p>{pizza.price}</p>
      <button type="button" onClick={handleAddToCartClick}>
        Add to Cart
      </button>
    </li>
  );
};

export default PizzaItem;
