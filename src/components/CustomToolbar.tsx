import React from 'react';
import { Pagination } from '@mui/material';
import { useGridApiContext, useGridSelector, gridPageSelector, gridPageCountSelector, gridPageSizeSelector } from '@mui/x-data-grid';

const CustomPagination = () => {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);
  const pageSize = useGridSelector(apiRef, gridPageSizeSelector);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    apiRef.current.setPage(value - 1);
  };

  const handlePageSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    apiRef.current.setPageSize(Number(event.target.value));
  };

  return (
    <div className="flex justify-between items-center p-2">
      <Pagination
        count={pageCount}
        page={page + 1}
        onChange={handlePageChange}
        color="secondary"
      />
      <div className="flex items-center space-x-2">
        <label htmlFor="pageSize" className="text-white">Rows per page:</label>
        <select
          id="pageSize"
          value={pageSize}
          onChange={handlePageSizeChange}
          className="border border-gray-300 rounded p-2 bg-gray-800 text-white"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>
    </div>
  );
};

export default CustomPagination;