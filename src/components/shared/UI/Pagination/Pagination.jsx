import { useSearchParams } from "react-router-dom";
import "./Pagination.css" 


export default function Pagination({ totalPages }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const switchPage = (newPage) => {
    setSearchParams({ page: newPage.toString() });
    //  window.scrollTo({ top: document.body.scrollHeight })
  };

  return (
    <div className="page-nav">
      <button
        className="page-nav__first page-btn"
        onClick={() => switchPage(1)}
        disabled={currentPage === 1}
      >
        1
      </button>
      <button
        className="page-nav__prev page-btn"
        onClick={() => switchPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &#8592;
      </button>
      <button
        className="page-nav__current page-btn"
        onClick={() => switchPage(currentPage)}
      >
        {currentPage}
      </button>
      <button
        className="page-nav__next page-btn"
        onClick={() => switchPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        &#8594;
      </button>
      <button
        className="page-nav__last page-btn"
        onClick={() => switchPage(totalPages)}
        disabled={currentPage === totalPages}
      >
        {totalPages}
      </button>
    </div>
  );
}
