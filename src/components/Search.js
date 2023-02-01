import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { getVideosThunk } from "../actions/videosAction";
import { useDispatch, useSelector } from "react-redux";

const Search = () => {
  const [search, setSearch] = useState("");
  const nextPageToken = useSelector((state) => state.nextPageToken);
  const dispatch = useDispatch();

  const getVideos = () => {
    dispatch(getVideosThunk({ search, nextPageToken }));
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
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
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
