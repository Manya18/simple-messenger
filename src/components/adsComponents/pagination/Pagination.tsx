import styles from "./pagination.module.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ props }: { props: PaginationProps }) => {
  const handleClick = (page: number) => {
    if (page >= 1 && page <= props.totalPages) {
      props.onPageChange(page);
    }
  };

  return (
    <div className={styles.paginationContainer}>
      <button
        className={styles.prevButton}
        onClick={() => handleClick(props.currentPage - 1)}
        disabled={props.currentPage === 1}
      >
        &lt;
      </button>
      {Array.from({ length: props.totalPages }, (_, index) => (
        <button
          key={index}
          className={styles.numButton}
          onClick={() => handleClick(index + 1)}
          disabled={index + 1 === props.currentPage}
        >
          {index + 1}
        </button>
      ))}
      <button
        className={styles.nextButton}
        onClick={() => handleClick(props.currentPage + 1)}
        disabled={props.currentPage === props.totalPages}
      >
        {" "}
        &gt;{" "}
      </button>
    </div>
  );
};

export default Pagination;
