import {
  FaUserFriends,
  FaCalendarAlt,
  FaHeart,
  FaCommentDots,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { useRef } from "react";

export let refCards = null;

export const Card = () => {
  const statistic = useSelector((state) => state.likes);
  const cards = useRef(null);
  let page = statistic;
  refCards = cards.current;

  return (
    <div className="cards" ref={cards}>
      {page.map((item, i) => {
        const thumbnail = item.snippet.thumbnails.high.url;
        const title = item.snippet.localized.title;
        const channel = item.snippet.channelTitle;
        const date = item.snippet.publishedAt.slice(0, 10);
        const likes = item.statistics.likeCount;
        const views = item.statistics.viewCount;
        const comments = item.statistics.commentCount;

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
  );
};
