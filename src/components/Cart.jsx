import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

function Cart() {
  const { cart, removeFromCart, clearCart, getTotalPrice, increaseQuantity, decreaseQuantity } = useCart();

  const handleRemoveProduct = (item) => {
    if (window.confirm(`¿Estás seguro de que deseas eliminar ${item.name} del carrito?`)) {
      removeFromCart(item.name, item.quantity);
    }
  };

  const handleDecreaseQuantity = (item) => {
    if (item.quantity === 1) {
      if (window.confirm(`¿Quieres eliminar ${item.name} del carrito?`)) {
        handleRemoveProduct(item);
      }
    } else {
      decreaseQuantity(item.name, item.quantity);
    }
  };

  const handleCheckout = () => {};

  return (
    <div className="cart-container">
      <h2>Tu Carrito</h2>
      {cart.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <div>
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.images[0]} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p>Precio: ${item.price}</p>
                  <p>Cantidad: {item.quantity}</p>
                </div>
                <div className="cart-item-actions">
                  <button onClick={() => handleDecreaseQuantity(item)}>-</button>
                  <button onClick={() => increaseQuantity(item.name, item.quantity)}>+</button>
                  <button onClick={() => handleRemoveProduct(item)}>Eliminar</button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h3>Total: ${getTotalPrice()}</h3>
          </div>
          <button className="clear-cart-button" onClick={clearCart}>Vaciar carrito</button>
          <Link to="/checkout">
            <button className="finalize-purchase-button" disabled={cart.length === 0}>
              Finalizar la Compra
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Cart;
