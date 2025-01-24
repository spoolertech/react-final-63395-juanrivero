import React from 'react';
import { Link } from 'react-router-dom';
import './ItemList.css';

function ItemList({ products }) {
  return (
    <div className="container mt-4">
      <div className="row">
        {products.map(product => (
          <div key={product.id} className="col-md-4 mb-4">
            <div className="product-card">
              {}
              <img src={product.images[0]} alt={product.name} className="product-image" />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">Precio: ${product.price}</p>
                <Link to={`/item/${product.id}`} className="btn btn-primary">Ver detalles</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ItemList;
