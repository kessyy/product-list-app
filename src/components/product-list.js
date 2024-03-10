import React from 'react';

const ProductList = ({ products }) => {
  return (
    <div>
      <h1 className="mb-3">Products</h1>
      {products.length > 0 ? (
        <ul className="list-group">
          {products.map((product) => (
            <li key={product.id} className="list-group-item">
              {`ID: ${product.id}, Name: ${product.product}, Price: ${product.price}, Brand: ${product.brand || 'N/A'}`}
            </li>
          ))}
        </ul>
      ) : (
        <p>No product found.</p>
      )}
    </div>
  );
};

export default ProductList;
