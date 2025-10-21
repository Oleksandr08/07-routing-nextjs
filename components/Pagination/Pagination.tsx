import ReactPaginate from 'react-paginate';
import css from './Pagination.module.css';

interface PaginationProps {
  pageCount: number;
  onPageChange: (event: { selected: number }) => void;
  forcePage: number;
}

export default function Pagination({
  pageCount,
  onPageChange,
  forcePage,
}: PaginationProps) {
  return (
    <ReactPaginate
      className={css.pagination}
      activeClassName={css.active}
      breakLabel="..."
      nextLabel="⟶"
      pageRangeDisplayed={5}
      pageCount={pageCount}
      previousLabel="⟵"
      renderOnZeroPageCount={null}
      onPageChange={onPageChange}
      forcePage={forcePage}
    />
  );
}
