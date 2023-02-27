import { FaSearch } from "react-icons/fa";
import {
  getVideosThunk,
  setSearch,
  setAllNull,
} from "../../store/actions/videosAction";
import { useDispatch, useSelector } from "react-redux";
import style from "./search.module.css";
import { useEffect } from "react";

const Search = () => {
  const dispatch = useDispatch();
  const search = useSelector((state) => state.search);
  const currentPage = useSelector((state) => state.currentPage);
  const nextPageToken = useSelector((state) => state.nextPageToken);
  const data = useSelector((state) => state.data);

  const getVideos = () => {
    setAllNull(dispatch);
    dispatch(getVideosThunk(search));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    getVideos();
  };

  useEffect(() => {
    if ((currentPage + 2) % 10 === 0) {
      dispatch(getVideosThunk(search));
    }
  }, [search, dispatch, nextPageToken, data]);

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
