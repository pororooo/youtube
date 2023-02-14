import { FaSearch } from "react-icons/fa";
import {
  getVideosThunk,
  setSearch,
  setData,
  setLikes,
  setCurrentPage,
  setNextPageToken,
} from "../actions/videosAction";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const Search = () => {
  const dispatch = useDispatch();
 const search = useSelector((state) => state.search);
//  const nextPageToken = useSelector((state) => state.nextPageToken);

//  useEffect(()=>{
//   dispatch(getVideosThunk(search));
//  }, [nextPageToken])

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
