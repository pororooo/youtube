import { setCurrentPage, getVideosThunk } from "../store/actions/videosAction";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { swipeLeft, swipeRight } from "../utils";

const useTouchSwipe = (refCards) => {
  const currentPage = useSelector((state) => state.currentPage);
  const search = useSelector((state) => state.search);
  const [start, setTouchStart] = useState(null);
  const [currentTouch, setCurrentTouch] = useState(null);
  const [difference, setDifference] = useState(0);

  const dispatch = useDispatch();

  const onTouchStart = (e) => {
    setTouchStart(null);
    setCurrentTouch(null);
    setDifference(0);
    setTouchStart(e.touches[0].clientX);
  };

  const onTouchMove = (e) => {
    if (start === null) {
      return;
    }
    setCurrentTouch(e.touches[0].clientX);
    setDifference(start - currentTouch);

    if (difference > 0) {
      refCards.style.transform = `translate(-${(currentPage * refCards.clientWidth - currentTouch)}px)`;
    }
    if (difference < 0 && currentPage !== 1) {
      refCards.style.transform = `translate(-${(currentPage * refCards.clientWidth -
        refCards.clientWidth / 2 -
        currentTouch)}px)`;
    }
    if (currentPage === 1 && difference < 0) {
      refCards.style.transform = `translate(0px)`;
    }
  };


  const onTouchEnd = () => {
    if (difference > 0) {
      const pageNumber = currentPage + 1;
      swipeLeft(pageNumber, refCards);
      dispatch(setCurrentPage(pageNumber));
    }
    if (difference < 0 && currentPage !== 1) {
      const pageNumber = currentPage - 1;
      swipeRight(pageNumber, refCards);
      dispatch(setCurrentPage(pageNumber));
    }
    if ((currentPage + 2) % 10 === 0) {
      dispatch(getVideosThunk(search));
    }
  };

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  };
};

export default useTouchSwipe;
