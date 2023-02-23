import {
  FaUserFriends,
  FaCalendarAlt,
  FaHeart,
  FaCommentDots,
} from "react-icons/fa";
import style from "./card.module.css";

const Card = ({ item }) => {
  return (
    <div className={style.card}>
      <div>
        <img className={style.thumbnail} src={item.snippet.thumbnails.high.url} alt="" />
      </div>
      <div className={style.title}>{item.snippet.localized.title}</div>
      <div className={style.channel}>{item.snippet.channelTitle}</div>
      <div className={style.info}>
        <div className={style.item}>
          <FaCalendarAlt className={style.icon} />
          {item.snippet.publishedAt.slice(0, 10)}
        </div>
        <div className={style.item}>
          <FaHeart className={style.icon} />
          {item.statistics.likeCount}
        </div>
        <div className={style.item}>
          <FaUserFriends className={style.icon} />
          {item.statistics.viewCount}
        </div>
        <div className={style.item}>
          <FaCommentDots className={style.icon} />
          {item.statistics.commentCount}
        </div>
      </div>
    </div>
  );
};

export default Card;
