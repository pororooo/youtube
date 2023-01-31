import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { getVideosThunk } from "../actions/videosAction";
import { useDispatch } from "react-redux";

const Search = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  const getVideos = (search) => {
    dispatch(getVideosThunk(search));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    getVideos(search);
  };

  const searchVideos = (e) => {
    if (e.key === "Enter") {
      getVideos(search);
    }
  };

  return (
    <div>
      <div className="header">
        <div className="search">
          <input
            className="input"
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            onKeyDown={searchVideos}
          />
          <button onClick={handleSubmit} className="faSearch">
            <FaSearch />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Search;
