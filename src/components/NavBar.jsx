import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../firebase'; 
import { useCart } from '../context/CartContext';

function NavBar() {
  const [categories, setCategories] = useState([]);
  const { getTotalUnits } = useCart();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await getCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error al obtener categorías:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Mi Ecommerce</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active" to="/">Inicio</Link>
            </li>
            {categories.length > 0 ? (
              categories.map(category => (
                <li key={category} className="nav-item">
                  <Link className="nav-link" to={`/category/${category}`}>{category}</Link>
                </li>
              ))
            ) : (
              <li className="nav-item"><span className="nav-link">Cargando categorías...</span></li>
            )}
          </ul>
        </div>
        
        <Link className="nav-link d-flex align-items-center" to="/cart" style={{ color: 'white' }}>
          <i className="bi bi-cart" style={{ fontSize: '24px', marginRight: '10px' }}></i>
          {getTotalUnits() > 0 && (
            <span className="badge bg-danger" style={{ position: 'absolute', top: '10px', right: '10px' }}>
              {getTotalUnits()}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
