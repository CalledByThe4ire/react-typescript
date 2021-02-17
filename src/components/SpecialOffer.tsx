import React from 'react';
import SpecialOfferCSS from './SpecialOffer.module.css';
import { Pizza } from '../../types';
import { WithAddToCartProps } from './AddToCart';

interface SpecialOfferProps {
  pizza: Pizza;
}

const SpecialOffer: React.FC<SpecialOfferProps> = ({ pizza }) => (
  <div className={SpecialOfferCSS.container}>
    <h2>{pizza.name}</h2>
    <p>{pizza.description}</p>
    <p>{pizza.price}</p>

    <WithAddToCartProps>
      {({ addToCart }) => (
        <button
          type="button"
          onClick={() =>
            addToCart({
              id: pizza.id,
              name: pizza.name,
              price: pizza.price,
            })
          }
        >
          Add to Cart
        </button>
      )}
    </WithAddToCartProps>
  </div>
);

export default SpecialOffer;
