import {
  FaUserFriends,
  FaCalendarAlt,
  FaUser,
  FaHeart,
  FaHeartBroken,
} from "react-icons/fa";


//useSelect
const Card = ({ videosData }) => {
  return (
    <div className="container">

 {videosData.map((item) => {
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
  );
};
export default Card;
