import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../firebase';
import { useCart } from '../context/CartContext';

const ItemDetailContainer = () => {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const product = await getProductById(id);
        setItem(product || null);
      } catch (error) {
        console.error("Error al obtener el producto:", error);
        setItem(null);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  const handleAddToCart = () => {
    if (item) {
      addToCart(item, quantity);
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (!item) return <p>Producto no encontrado.</p>;

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
              {item.images.map((img, index) => (
                <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                  <img src={img} className="d-block w-100" alt={item.name} />
                </div>
              ))}
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
        <div className="col-md-6">
          <h2>{item.name}</h2>
          <p>{item.detailedDescription}</p>
          <p><strong>Precio:</strong> ${item.price}</p>
          <div className="mb-3">
            <label htmlFor="quantity" className="form-label">Cantidad</label>
            <input 
              type="number" 
              id="quantity" 
              className="form-control" 
              value={quantity} 
              onChange={(e) => setQuantity(Number(e.target.value))} 
              min="1" 
              max={item.stock} 
            />
          </div>
          <button className="btn btn-primary" onClick={handleAddToCart}>Añadir al carrito</button>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailContainer;
