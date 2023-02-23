import { FaSearch } from "react-icons/fa";
import {
  getVideosThunk,
  setSearch,
  setAllNull,
} from "../../store/actions/videosAction";
import { useDispatch, useSelector } from "react-redux";
import style from "./search.module.css";

const Search = () => {
  const dispatch = useDispatch();
  const search = useSelector((state) => state.search);

  const getVideos = () => {
    setAllNull(dispatch)
    dispatch(getVideosThunk(search));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    getVideos();
  };

  return (
    <div>
      <form className={style.search} onSubmit={handleSubmit}>
        <input
          className={style.input}
          type="text"
          placeholder="Search"
          onChange={(e) => {
            dispatch(setSearch(e.target.value));
          }}
        />
        <button onClick={handleSubmit} className={style.faSearch}>
          <FaSearch />
        </button>
      </form>
    </div>
  );
};

export default Search;
