// ProductContext.jsx
// Manages products state for Store Admin.
// Simulates backend database for products.

import { createContext, useContext, useState } from "react";
import { products as initialProducts } from "../data/mockData";

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState(initialProducts);

  // Add new product
  const addProduct = (product) => {
    setProducts((prev) => [
      ...prev,
      { ...product, id: Date.now() },
    ]);
  };

  // Delete product
  const deleteProduct = (id) => {
    setProducts((prev) =>
      prev.filter((product) => product.id !== id)
    );
  };

  // Update stock
  const updateStock = (id, stock) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id
          ? { ...product, stock }
          : product
      )
    );
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        addProduct,
        deleteProduct,
        updateStock,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductContext);
}
