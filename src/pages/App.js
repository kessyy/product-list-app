import React, { useState, useEffect } from 'react';
import Filter from '../components/filter';
import ProductList from '../components/product-list';
import Pagination from '../components/pagination';
import '../styles/App.css';

const App = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filter, setFilter] = useState({});

  const API_BASE_URL = 'https://api.valantis.store:41000/';
  const PASSWORD = 'Valantis';

  const fetchData = async () => {
    try {
      const timestamp = new Date().toISOString().split('T')[0].replace(/-/g, '');
      const authString = `md5("${PASSWORD}_${timestamp}")`;

      const authResponse = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'auth',
          params: {
            password: PASSWORD,
            timestamp: timestamp,
          },
        }),
      });

      const authData = await authResponse.json();
      const authorization = authData.result;

      const responseIds = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth': authorization,
        },
        body: JSON.stringify({
          action: 'filter',
          params: {
            ...filter,
            offset: (currentPage - 1) * 50,
            limit: 50,
          },
        }),
      });

      const dataIds = await responseIds.json();
      const productIds = dataIds.result || [];

      const responseProducts = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth': authorization,
        },
        body: JSON.stringify({
          action: 'get_items',
          params: {
            ids: productIds,
          },
        }),
      });

      const dataProducts = await responseProducts.json();

      setProducts(dataProducts.result || []);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleFilterChange = (field, value) => {
    setFilter({ ...filter, [field]: value });
    setCurrentPage(1);
  };

  const handleFilterSubmit = () => {
    fetchData();
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, filter]);

  return (
    <div className="app">
      <Filter onFilterChange={handleFilterChange} onFilterSubmit={handleFilterSubmit} />
      <ProductList products={products} />
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
};

export default App;
