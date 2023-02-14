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
import { useState } from "react";
import { swipeLeft, swipeRight } from "../cardsTransition";

import "../assets/style.css";

const Card = () => {
  const currentPage = useSelector((state) => state.currentPage);
  const search = useSelector((state) => state.search);
  const [start, setTouchStart] = useState(null);
  const [currentTouch, setCurrentTouch] = useState(null);
  const [difference, setDifference] = useState(0);
  const dispatch = useDispatch();
  const statistic = useSelector((state) => state.likes);

  let page = [];
  page = statistic;

  const handleTouchStart = (e) => {
    setTouchStart(null);
    setCurrentTouch(null);
    setDifference(0);
    const touchDown = e.touches[0].clientX;
    setTouchStart(touchDown);
  };

  const handleTouchMove = (e) => {
    if (start === null) {
      return;
    }
    setCurrentTouch(e.touches[0].clientX);
    const diff = start - currentTouch;
    setDifference(diff);
  };

  const handleTouchEnd = () => {
    if (difference > 0) {
      let left = currentPage + 1;
      swipeLeft(left);
      let pageNumber = currentPage + 1;
      dispatch(setCurrentPage(pageNumber));
    }
    if (difference < 0 && currentPage !== 1) {
      let right = currentPage - 1;
      swipeRight(right);
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
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
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
      <Switch />
    </div>
  );
};
export default Card;
