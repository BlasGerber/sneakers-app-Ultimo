import React, { createContext, useState, useEffect } from 'react';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [fav, setFav] = useState([])
  
  const loadProducts = async () => {
    try {
      const res = await fetch('https://665683ed9f970b3b36c5aab8.mockapi.io/api/v1/sneakersFP');
      const data = await res.json()
      console.log(data)
      setProducts(data);
    } catch (error) {
      console.error('Error cargando productos:', error);
    }
};
  useEffect(() => {

    loadProducts();
  }, []);
  
  const updateFav = async (sneakerId, suma) => {
    
    const apiUrl = 'https://665683ed9f970b3b36c5aab8.mockapi.io/api/v1/sneakersFP';
    const bodyData = suma ? { favsCount: favsCount + 1 } : { favsCount: favsCount - 1 };

    try {
      const respuesta = await fetch('`${apiUrl}/${sneakerId}`',{
        method: 'PUT',
        headers: {
            'Content-Type':'application/json',
       },
        body: JSON.stringify({ bodyData })
     });

      if (!respuesta.ok) {
       throw new Error('Error al actualizar el valor');
      }
    } catch (error) {
      console.error('Hubo un problema al actualizar el objeto:', error);
    }
  }

  const addFav = (sneaker) => {
    setFav((prevFav) => [...prevFav, sneaker]);
    updateFav(sneaker.id, true)
  }

  const removeFav = (sneakerId) => {
    setFav((prevFav) => prevFav.filter((item) => item._id !== sneakerId));
    updateFav(sneakerId, false)
  };

  const isFav = (sneakerId) => {
    return fav.some((item) => item._id === sneakerId);
  };

  const getTopFav = () => {
    const sortedFav = [...fav].sort(
      (a, b) => b.favsCount - a.favsCount
    );
    return sortedFav.slice(0, 3);
  };

  return (
    <ProductContext.Provider value={{ products, fav, addFav, isFav, removeFav, getTopFav, loadProducts}}>
      {children}
    </ProductContext.Provider>
  );
};