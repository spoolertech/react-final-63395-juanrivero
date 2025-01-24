import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartWidget = () => {
  const { getTotalUnits } = useCart();

  return (
    <div>
      <Link to="/cart">
        <i className="fas fa-shopping-cart"></i> Carrito ({getTotalUnits()})
      </Link>
    </div>
  );
};

export default CartWidget;
