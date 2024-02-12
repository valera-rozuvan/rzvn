import React, { useEffect, useState, JSX } from 'react';

import { randomString } from '../../utilities';
import './style.scss';

interface IPaginationProps {
  totalResults: number;
  currentPage: number;
  paginate: (pageNumber: number) => void;
  pageSize: number;
}

interface IPage {
  pageNumber: number;
  uniqueId: string;
}

function Pagination({
  totalResults,
  currentPage,
  paginate,
  pageSize,
}: IPaginationProps): JSX.Element {
  const [pageNumbers, setPageNumbers] = useState<IPage[]>([]);

  useEffect(() => {
    const totalPageCount = Math.ceil(totalResults / pageSize);
    if (totalPageCount < 1) {
      setPageNumbers([]);
      return;
    }

    const page: IPage[] = [];
    for (let index = 1; index <= totalPageCount; index += 1) {
      page.push({ pageNumber: index, uniqueId: randomString(12) });
    }

    setPageNumbers(page);
  }, [setPageNumbers, totalResults, pageSize]);

  return (
    <ul className="pagination">
      {(currentPage > 1 && totalResults > 5) && (
        <li className="pagination__pager">
          <button onClick={() => paginate(currentPage - 1)} type="button">Previous</button>
        </li>
      )}
      {pageNumbers.map((page) => (
        <li
          key={page.uniqueId}
          className={
            currentPage === page.pageNumber
              ? 'pagination__pager pagination__pager--number pagination__pager--active'
              : 'pagination__pager pagination__pager--number'
          }
        >
          <button onClick={() => paginate(page.pageNumber)} type="button">{page.pageNumber}</button>
        </li>
      ))}
      {currentPage < pageNumbers.length && (
        <li className="pagination__pager">
          <button onClick={() => paginate(currentPage + 1)} type="button">Next</button>
        </li>
      )}
    </ul>
  );
}

export default Pagination;
