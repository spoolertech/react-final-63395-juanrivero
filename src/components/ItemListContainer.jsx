import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProducts, getProductsByCategory } from '../firebase';
import ItemList from './ItemList';

function ItemListContainer() {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      let productsData;
      if (categoryId) {
        productsData = await getProductsByCategory(categoryId);
      } else {
        productsData = await getProducts();
      }
      setProducts(productsData);
    };

    fetchProducts();
  }, [categoryId]);

  return <ItemList products={products} />;
}

export default ItemListContainer;
