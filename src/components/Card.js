import {
  FaUserFriends,
  FaCalendarAlt,
  FaHeart,
  FaCommentDots,
} from "react-icons/fa";
import Switch from "./Switch";
import { setCurrentPage } from "../actions/videosAction";
import { getVideosThunk } from "../actions/videosAction";
import { useSelector, useDispatch } from "react-redux";
import { useState, useRef } from "react";
import { swipeLeft, swipeRight } from "../cardsTransition";

import "../assets/style.css";

export let refCards = null;

export const Card = () => {
  const currentPage = useSelector((state) => state.currentPage);
  const search = useSelector((state) => state.search);
  const [start, setTouchStart] = useState(null);
  const [currentTouch, setCurrentTouch] = useState(null);
  const [difference, setDifference] = useState(0);
  const [mouseDown, setMouseDown] = useState(false);

  const cards = useRef(null);
  const dispatch = useDispatch();
  const statistic = useSelector((state) => state.likes);

  let page = statistic;
  refCards = cards.current;

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

    if (difference > 0) {
      refCards.style.transform = `translate(-${
        currentPage * refCards.clientWidth - currentTouch
      }px)`;
    } else if (difference < 0 && currentPage !== 1) {
      refCards.style.transform = `translate(-${
        (currentPage - 1) * refCards.clientWidth - currentTouch
      }px)`;
    }
  };

  const handleTouchEnd = () => {
    setMouseDown(false);

    if (difference > 0) {
      let left = currentPage + 1;
      swipeLeft(left, refCards);
      let pageNumber = currentPage + 1;
      dispatch(setCurrentPage(pageNumber));
    }
    if (difference < 0 && currentPage !== 1) {
      let right = currentPage - 1;
      swipeRight(right, refCards);
      let pageNumber = currentPage - 1;
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
          <div className="cards" ref={cards}>
            {page.map((item, i) => {
              let thumbnail = item.snippet.thumbnails.high.url;
              let title = item.snippet.localized.title;
              let channel = item.snippet.channelTitle;
              let date = item.snippet.publishedAt.slice(0, 10);
              let likes = item.statistics.likeCount;
              let views = item.statistics.viewCount;
              let comments = item.statistics.commentCount;

              return (
                <div className="card" key={i}>
                  <div>
                    <img className="thumbnail" src={thumbnail} alt="" />
                  </div>
                  <div className="title">{title}</div>
                  <div className="channel">{channel}</div>
                  <div className="info">
                    <div className="item">
                      <FaCalendarAlt className="icon" />
                      {date}
                    </div>
                    <div className="item">
                      <FaHeart className="icon" />
                      {likes}
                    </div>
                    <div className="item">
                      <FaUserFriends className="icon" />
                      {views}
                    </div>
                    <div className="item">
                      <FaCommentDots className="icon" />
                      {comments}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Switch />
    </div>
  );
};
