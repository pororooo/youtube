import { FaSearch } from "react-icons/fa";
import {
  getVideosThunk,
  setSearch,
  setData,
  setLikes,
  setCurrentPage,
  setNextPageToken,
} from "../store/actions/videosAction";
import { useDispatch, useSelector } from "react-redux";

const Search = () => {
  const dispatch = useDispatch();
  const search = useSelector((state) => state.search);

  const getVideos = () => {
    dispatch(setData([]));
    dispatch(setLikes([]));
    dispatch(setCurrentPage(1));
    dispatch(setNextPageToken(""));
    dispatch(getVideosThunk(search));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    getVideos();
  };

  return (
    <div>
      <form className="search" onSubmit={handleSubmit}>
        <input
          className="input"
          type="text"
          placeholder="Search"
          onChange={(e) => {
            dispatch(setSearch(e.target.value));
          }}
        />
        <button onClick={handleSubmit} className="faSearch">
          <FaSearch />
        </button>
      </form>
    </div>
  );
};

export default Search;
