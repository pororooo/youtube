import Switch from "./Switch";
import { setCurrentPage, getVideosThunk } from "../store/actions/videosAction";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { swipeLeft, swipeRight } from "../utils";
import { refCards, Card } from "./Card";


export const CardsContainer = () => {
  const currentPage = useSelector((state) => state.currentPage);
  const search = useSelector((state) => state.search);
  const [start, setTouchStart] = useState(null);
  const [currentTouch, setCurrentTouch] = useState(null);
  const [difference, setDifference] = useState(0);
  const [mouseDown, setMouseDown] = useState(false);

  const dispatch = useDispatch();


  const handleTouchStart = (e) => {
    setTouchStart(null);
    setCurrentTouch(null);
    setDifference(0);

    if (e._reactName === "onTouchStart") {
      setTouchStart(e.touches[0].clientX);
    } else if (e._reactName === "onMouseDown") {
      setMouseDown(true);
      const touchDown = e.clientX;
      setTouchStart(touchDown);
    }
  };

  const handleTouchMove = (e) => {
    if (start === null) {
      return;
    }
    if (e._reactName === "onTouchMove") {
      setCurrentTouch(e.touches[0].clientX);
    }
    if (e._reactName === "onMouseMove" && mouseDown === true) {
      setCurrentTouch(e.clientX);
    }
    setDifference(start - currentTouch);
    console.log(difference)

    if (difference > 0) {
      refCards.style.transform = `translate(-${
        currentPage * refCards.clientWidth - currentTouch
      }px)`;
    } 
    if (difference < 0 && currentPage !== 1) {
      refCards.style.transform = `translate(-${
        (currentPage - 1) * refCards.clientWidth - currentTouch
      }px)`;
    }
  };

  const handleTouchEnd = () => {
    setMouseDown(false);

    if (difference > 0) {
      const left = currentPage + 1;
      swipeLeft(left, refCards);
      const pageNumber = currentPage + 1;
      dispatch(setCurrentPage(pageNumber));
    }
    if (difference < 0 && currentPage !== 1) {
      const right = currentPage - 1;
      swipeRight(right, refCards);
      const pageNumber = currentPage - 1;
      dispatch(setCurrentPage(pageNumber));
    }

    if ((currentPage + 2) % 10 === 0) {
      dispatch(getVideosThunk(search));
    }
  };

  return (
    <div>
      <div className="block">
        <div
          className="container"
          onTouchStart={handleTouchStart}
          onMouseDown={handleTouchStart}
          onTouchMove={handleTouchMove}
          onMouseMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseUp={handleTouchEnd}
        >
          <Card />
        </div>
      </div>
      <Switch />
    </div>
  );
};
