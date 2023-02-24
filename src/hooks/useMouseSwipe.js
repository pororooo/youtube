import { setCurrentPage, getVideosThunk } from "../store/actions/videosAction";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { swipeLeft, swipeRight } from "../utils";

const useMouseSwipe = (refCards) => {
  const currentPage = useSelector((state) => state.currentPage);
  const search = useSelector((state) => state.search);
  const [start, setTouchStart] = useState(null);
  const [difference, setDifference] = useState(0);
  const [mouseDown, setMouseDown] = useState(false);
  const [mouseMove, setMouseMove] = useState(false);

  const dispatch = useDispatch();

  const onMouseDown = (e) => {
    setMouseDown(true);
    setTouchStart(e.clientX);
  };

  const onMouseMove = (e) => {
    if (start === null || (e.clientX - start > 0 && currentPage === 1)) return;
    setDifference(start - e.clientX);
    setMouseMove(true);

    if (mouseDown === true && difference > 0) {
      refCards.style.transform = `translate(-${
        currentPage * refCards.clientWidth - e.clientX
      }px)`;
    }
    if (mouseDown === true && difference < 0) {
      refCards.style.transform = `translate(-${
        currentPage * refCards.clientWidth -
        refCards.clientWidth / 2 -
        e.clientX
      }px)`;
    }

    setMouseMove(false);
  };

  const onMouseUp = (e) => {
    setMouseDown(false);

    if (difference > 100 && mouseMove === false) {
      const pageNumber = currentPage + 1;
      swipeLeft(pageNumber, refCards);
      dispatch(setCurrentPage(pageNumber));
    } else if (difference < -100 && mouseMove === false) {
      const pageNumber = currentPage - 1;
      swipeRight(pageNumber, refCards);
      dispatch(setCurrentPage(pageNumber));
    } else {
      refCards.style.transform = `translate(-${
        currentPage * refCards.clientWidth
      }px)`;
    }

    if ((currentPage + 2) % 10 === 0) {
      dispatch(getVideosThunk(search));
    }
  };

  return {
    onMouseDown,
    onMouseMove,
    onMouseUp,
  };
};

export default useMouseSwipe;
