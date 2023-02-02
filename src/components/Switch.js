import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../actions/videosAction";

const Switch = () => {
  const pageNumbers = [];
  const currentPage = useSelector((state) => state.currentPage);
  const [postsPerPage] = useState(3);
  const [totalCount] = useState(30);
  const dispatch = useDispatch();


  const paginate = (pageNumber) => {
    dispatch(setCurrentPage(pageNumber));
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
              return <button onClick={() => paginate(number)}>{number}</button>;
            })}
          </div>
        }
      </div>
    </div>
  );
};
export default Switch;
