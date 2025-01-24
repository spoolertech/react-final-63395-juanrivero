import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart-ecommerce'));
    if (savedCart) {
      setCart(savedCart);
    }
  }, []);

  const addToCart = (product, quantity) => {
    const existingProductIndex = cart.findIndex(item => item.name === product.name);

    if (existingProductIndex >= 0) {
      const updatedCart = [...cart];
      updatedCart[existingProductIndex].quantity += quantity;
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, quantity }]);
    }
  };

  const removeFromCart = (name, quantity) => {
    setCart(cart.filter(item => !(item.name === name && item.quantity === quantity)));
  };

  const clearCart = () => {
    setCart([]);
  };

  const increaseQuantity = (name, quantity) => {
    const updatedCart = cart.map(item =>
      item.name === name && item.quantity === quantity
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    setCart(updatedCart);
  };

  const decreaseQuantity = (name, quantity) => {
    const updatedCart = cart.map(item =>
      item.name === name && item.quantity === quantity && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCart(updatedCart);
  };

  const getTotalUnits = () => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  useEffect(() => {
    localStorage.setItem('cart-ecommerce', JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider value={{
      cart, addToCart, removeFromCart, clearCart,
      increaseQuantity, decreaseQuantity, getTotalUnits, getTotalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
};
