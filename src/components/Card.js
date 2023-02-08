import {
  FaUserFriends,
  FaCalendarAlt,
  FaHeart,
  FaCommentDots,
} from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import Switch from "./Switch";
import { setCurrentPage } from "../actions/videosAction";
import { getVideosThunk } from "../actions/videosAction";
import { useState } from "react";

import "../assets/style.css";

const Card = () => {
  const dispatch = useDispatch();

  const search = useSelector((state) => state.search);
  const currentPage = useSelector((state) => state.currentPage);
  const statistic = useSelector((state) => state.likes);

  let page = [];

  if (currentPage === 1) {
    page = statistic.slice(currentPage - 1, currentPage + 2);
  }
  if (currentPage !== 1) {
    page = statistic.slice(currentPage * 3 - 1, currentPage * 3 + 2);
  }

  const [touchStart, setTouchStart] = useState(null);
  const [difference, setDifference] = useState(0);

  const handleTouchStart = (e) => {
    const touchDown = e.touches[0].clientX;
    setTouchStart(touchDown);
  };

  const handleTouchMove = (e) => {
    const touchDown = touchStart;
    if (touchDown === null) {
      return;
    }
    const currentTouch = e.touches[0].clientX;
    const diff = touchDown - currentTouch;
    setDifference(diff);
  };

  const handleTouchEnd = () => {
    if (difference > 5) {
      let pageNumber = currentPage + 1;
      console.log(pageNumber);
      dispatch(setCurrentPage(pageNumber));
    }
    if (difference < -5 && currentPage !== 1) {
      let pageNumber = currentPage - 1;
      console.log(pageNumber);

      dispatch(setCurrentPage(pageNumber));
    }
    if ((currentPage - 2) % 10 === 0) {
      dispatch(getVideosThunk(search));
    }
    setTouchStart(null);
  };

  return (
    <div>
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
      <Switch />
    </div>
  );
};
export default Card;
