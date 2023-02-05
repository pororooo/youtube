import {
  FaUserFriends,
  FaCalendarAlt,
  FaUser,
  FaHeart,
  FaHeartBroken,
} from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import Switch from "./Switch";
import { setCurrentPage } from "../actions/videosAction";
import { useRef } from "react";
import { getVideosThunk } from "../actions/videosAction";

import "../assets/style.css";

const Card = () => {
  const dispatch = useDispatch();

  const videos = useSelector((state) => state.data);
  const search = useSelector((state) => state.search);

  //console.log(videos[0].id.videoId);


  let page = [];

  const currentPage = useSelector((state) => state.currentPage);
  if (currentPage === 1) {
    page = videos.slice(currentPage - 1, currentPage + 2);
  }
  if (currentPage !== 1) {
    page = videos.slice(currentPage * 3 - 1, currentPage * 3 + 2);
  }
  let currentPageRef = useRef(null);

  const handlePageChange = () => {
    currentPageRef.current.style.animation = "nextPage .5s forwards";
    dispatch(setCurrentPage(currentPage + 1));
    if ((currentPage - 2) % 10 === 0) {
      dispatch(getVideosThunk(search));
    }
  };
  return (
    <div>
      <div
        className="container"
        ref={currentPageRef}
        onClick={handlePageChange}
      >
        {page.map((item) => {
          let thumbnail = item.snippet.thumbnails.high.url;
          let description = item.snippet.description;
          let title = item.snippet.title;
          let channel = item.snippet.channelTitle;
          let date = item.snippet.publishedAt;

          return (
            <div className="card">
              <div>
                <img className="thumbnail" src={thumbnail} alt="" />
              </div>
              <div className="title">{title}</div>
              <div className="description">{description}</div>
              <div className="channel">
                <FaUser />
                {channel}
              </div>
              <div className="info">
                <div className="date">
                  <FaCalendarAlt />
                  {date}
                </div>
                <div>
                  <FaUserFriends />
                </div>
                <div>
                  <FaHeart />
                </div>
                <div>
                  <FaHeartBroken />
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
