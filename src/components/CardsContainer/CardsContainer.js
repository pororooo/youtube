import Switch from "../Switch/Switch";
import {
  setCurrentPage,
  getVideosThunk,
} from "../../store/actions/videosAction";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { swipeLeft, swipeRight } from "../../utils";
import { refCards, Card } from "../Card/Card";
import "./cardsContainer.css";

export const CardsContainer = () => {
  const currentPage = useSelector((state) => state.currentPage);
  const search = useSelector((state) => state.search);
  const [start, setTouchStart] = useState(null);
  const [currentTouch, setCurrentTouch] = useState(null);
  const [difference, setDifference] = useState(0);
  const [mouseDown, setMouseDown] = useState(false);
  const [touchDown, setTouchDown] = useState(false);

  const [transition, setTransition] = useState(0);

  const dispatch = useDispatch();

  const handleTouchStart = (e) => {
    setTouchStart(null);
    setCurrentTouch(null);
    setDifference(0);

    if (e._reactName === "onTouchStart") {
      setTouchDown(true);
      setTouchStart(e.touches[0].clientX);
    } else if (e._reactName === "onPointerDown") {
      setMouseDown(true);
      setTouchStart(e.clientX);
    }
  };
  const handleTouchMove = (e) => {
    if (start === null) {
      return;
    }

    if (e._reactName === "onTouchMove" && touchDown === true) {
      setCurrentTouch(e.touches[0].clientX);
    }
    if (e._reactName === "onPointerMove" && mouseDown === true) {
      setCurrentTouch(e.clientX);
      console.log(currentTouch);
    }

    setDifference(start - currentTouch);

    if (difference > 0) {
      setTransition((currentPage * refCards.clientWidth - currentTouch) * -1);

      refCards.style.transform = `translate(${transition}px)`;
    }

    if (difference < 0 && currentPage !== 1) {
      setTransition(
        (currentPage * refCards.clientWidth -
          refCards.clientWidth / 1.5 -
          currentTouch) *
          -1
      );

      refCards.style.transform = `translate(${transition}px)`;
    }

    if (currentPage === 1 && difference < 0) {
      refCards.style.transform = `translate(0px)`;
    }
  };

  const handleTouchEnd = () => {
    setMouseDown(false);

    if (difference > 0) {
      const pageNumber = currentPage + 1;

      if (touchDown === true) {
        swipeLeft(pageNumber, refCards);
      }
      if (touchDown === false) {
        swipeLeft(pageNumber, refCards, transition);
      }
      dispatch(setCurrentPage(pageNumber));
    }
    if (difference < 0 && currentPage !== 1) {
      const pageNumber = currentPage - 1;
      if (touchDown === true) {
        swipeRight(pageNumber, refCards);
      }
      if (touchDown === false) {
        swipeRight(pageNumber, refCards, transition);
      }

      dispatch(setCurrentPage(pageNumber));
    }

    if ((currentPage + 2) % 10 === 0) {
      dispatch(getVideosThunk(search));
    }
    setTouchDown(false);
  };

  return (
    <div>
      <div className="block">
        <div
          className="container"
          onTouchStart={handleTouchStart}
          onPointerDown={handleTouchStart}
          onTouchMove={handleTouchMove}
          onPointerMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onPointerUp={handleTouchEnd}
        >
          <Card />
        </div>
      </div>
      <Switch />
    </div>
  );
};
