import React from 'react';

const Filter = ({ onFilterChange, onFilterSubmit }) => {
  return (
    <div className="my-3 d-flex align-items-center">
      <h3 className="me-3">Filter</h3>
      <label className="me-2">Name:</label>
      <input
        type="text"
        className="form-control me-2"
        onChange={(e) => onFilterChange('name', e.target.value)}
      />
      <label className="me-2">Price:</label>
      <input
        type="number"
        className="form-control me-2"
        onChange={(e) => onFilterChange('price', e.target.value)}
      />
      <label className="me-2">Brand:</label>
      <input
        type="text"
        className="form-control me-2"
        onChange={(e) => onFilterChange('brand', e.target.value)}
      />
      <button className="btn btn-primary" onClick={onFilterSubmit}>
        Filter
      </button>
    </div>
  );
};

export default Filter;
