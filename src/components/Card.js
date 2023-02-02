import {
  FaUserFriends,
  FaCalendarAlt,
  FaUser,
  FaHeart,
  FaHeartBroken,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import Switch from "./Switch";

const Card = () => {
  const videos = useSelector((state) => state.data);
  const currentPage = useSelector((state) => state.currentPage);
  let page = [];
  if (currentPage === 1) {
    page = videos.slice(currentPage - 1, currentPage + 2);
  }
  if (currentPage !== 1) {
    page = videos.slice(currentPage * 3 - 1, currentPage * 3 + 2);
  }
  // if(currentPage===10){
  //   page = videos.slice(currentPage*3-3, currentPage*3+1);
  // }

  return (
    <div>
      <div className="container">
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
