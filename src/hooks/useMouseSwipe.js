import { setCurrentPage } from "../store/actions/videosAction";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { swipeLeft, swipeRight } from "../utils";

const useMouseSwipe = (refCards) => {
  const currentPage = useSelector((state) => state.currentPage);
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
    if (mouseDown) {
      setDifference(start - e.clientX);
    }
    setMouseMove(true);

    if (mouseDown && difference > 0) {
      refCards.style.transform = `translate(-${
        currentPage * refCards.clientWidth - e.clientX
      }px)`;
    }
    if (mouseDown && difference < 0) {
      refCards.style.transform = `translate(-${
        currentPage * refCards.clientWidth -
        refCards.clientWidth / 2 -
        e.clientX
      }px)`;
    }

    setMouseMove(false);
  };

  const onMouseUp = () => {
    setMouseDown(false);
    if (currentPage === 1 && difference <= 0 && !mouseMove) {
      return;
    } else if (difference > 100 && !mouseMove) {
      const pageNumber = currentPage + 1;
      swipeLeft(pageNumber, refCards);
      dispatch(setCurrentPage(pageNumber));
    } else if (difference < -100 && !mouseMove && currentPage !== 1) {
      const pageNumber = currentPage - 1;
      swipeRight(pageNumber, refCards);
      dispatch(setCurrentPage(pageNumber));
    } else {
      refCards.style.transform = `translate(-${
        currentPage * refCards.clientWidth
      }px)`;
    }
  };

  return {
    onMouseDown,
    onMouseMove,
    onMouseUp,
  };
};

export default useMouseSwipe;
