import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { createOrder } from '../firebase';

function Checkout() {
  const { cart, getTotalPrice, clearCart } = useCart();
  const [formData, setFormData] = useState({ name: '', surname: '', phone: '', email: '', emailConfirm: '' });
  const [orderId, setOrderId] = useState(null);
  const [formError, setFormError] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const isValid =
      formData.name &&
      formData.surname &&
      formData.phone &&
      formData.email &&
      formData.emailConfirm &&
      formData.email === formData.emailConfirm;

    setIsFormValid(isValid);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid) {
      setFormError('Por favor, completa todos los campos correctamente.');
      return;
    }

    const orderData = {
      buyer: formData,
      items: cart,
      total: getTotalPrice(),
      date: new Date(),
    };

    try {
      const orderId = await createOrder(orderData);
      setOrderId(orderId);
      clearCart();
      setFormData({ name: '', surname: '', phone: '', email: '', emailConfirm: '' });
    } catch (error) {
      console.error('Error al crear la orden:', error);
      setFormError('Hubo un error al procesar tu compra.');
    }
  };

  return (
    <div>
      <h2>Resumen de la Compra</h2>
      {cart.map((item) => (
        <div key={item.id}>
          <p>
            {item.name} x {item.quantity} - ${item.price * item.quantity}
          </p>
        </div>
      ))}
      <h3>Total: ${getTotalPrice()}</h3>

      {orderId ? (
        <div>
          <p>¡Gracias por tu compra! Tu número de orden es: {orderId}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {formError && <div className="error">{formError}</div>}

          <input
            type="text"
            name="name"
            placeholder="Nombre"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="surname"
            placeholder="Apellido"
            value={formData.surname}
            onChange={handleChange}
          />
          <input
            type="text"
            name="phone"
            placeholder="Teléfono"
            value={formData.phone}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="email"
            name="emailConfirm"
            placeholder="Confirmar Email"
            value={formData.emailConfirm}
            onChange={handleChange}
          />
          <button type="submit" disabled={!isFormValid}>
            Confirmar Compra
          </button>
        </form>
      )}
    </div>
  );
}

export default Checkout;
