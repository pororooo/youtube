import { useState } from "react";

const Switch = () => {
  const pageNumbers = [];
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(3);
  const [totalCount] = useState(50);
  const [isActive, setIsActive] = useState(false);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const pageCount = Math.ceil(totalCount / postsPerPage);

  if (currentPage === 1) {
    for (let i = currentPage; i <= currentPage + 2; i++) {
      pageNumbers.push(i);
    }
  }
  if (currentPage !== pageCount && currentPage !== 1) {
    for (let i = currentPage - 1; i <= currentPage + 1; i++) {
      pageNumbers.push(i);
    }
  }
  if (currentPage === pageCount) {
    for (let i = currentPage - 2; i <= currentPage; i++) {
      pageNumbers.push(i);
    }
  }

  return (
    <div className="pagination-container">
      <div className="pagination">
        {
          <div>
            {pageNumbers.map((number) => {
              return (
                <button onClick={() => paginate(number)}>
                  {number}
                </button>
              );
            })}
          </div>
        }
      </div>
    </div>
  );
};
export default Switch;
