import React from 'react';
import ReactPaginate from 'react-js-pagination';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="my-3">
      <ReactPaginate
        activePage={currentPage}
        itemsCountPerPage={50}
        totalItemsCount={totalPages * 50}
        pageRangeDisplayed={5}
        onChange={(page) => onPageChange(page)}
        itemClass="page-item"
        linkClass="page-link"
      />
    </div>
  );
};

export default Pagination;
