import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../store/actions/videosAction";
import { getVideosThunk } from "../store/actions/videosAction";
import { swipeLeft, swipeRight } from "../utils";
import { refCards } from "./Card";

const Switch = () => {
  const pageNumbers = [];
  const currentPage = useSelector((state) => state.currentPage);
  const totalCount = useSelector((state) => state.totalCount);
  const search = useSelector((state) => state.search);

  const [postsPerPage] = useState(3);
  const dispatch = useDispatch();


  const paginate = (pageNumber) => {
    if (pageNumber > currentPage) {
      swipeLeft(pageNumber, refCards);
    }
    if (pageNumber < currentPage) {
      swipeRight(pageNumber, refCards);
    }

    dispatch(setCurrentPage(pageNumber));

    if ((pageNumber + 2) % 10 === 0) {
      dispatch(getVideosThunk(search));
    }
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
            {pageNumbers.map((number, i) => {
              if (number === currentPage) {
                return (
                  <button
                    key={i}
                    className="active-button"
                    onClick={() => paginate(number)}
                  >
                    {number}
                  </button>
                );
              } else {
                return (
                  <button key={i} onClick={() => paginate(number)}>
                    {number}
                  </button>
                );
              }
            })}
          </div>
        }
      </div>
    </div>
  );
};
export default Switch;
