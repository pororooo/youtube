import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Card from "./Card";
import { getVideosThunk } from "../actions/videosAction";
import { Formik } from "formik";
import { useDispatch } from "react-redux";

const Search = () => {
  const [videosData, setData] = useState([]);
  const dispatch = useDispatch()
  // const [nextPageToken, setNextPageToken]=useState("")

  const getVideos = (value) => {
    dispatch(getVideosThunk(value));
 };
//  dispatch(setSearch(values.search))


  return (
    <div>
      <div className="header">
        <div className="search">
          <Formik
            initialValues={{ search: "" }}
            onSubmit={(values) => {
                getVideos(values.search)
            }}
          >
            {({ values, handleChange, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <input
                  name="search"
                  type="text"
                  onChange={handleChange}
                  value={values.search}
                />

                <button onClick={(handleSubmit)} className="faSearch">
                  <FaSearch />
                </button>
              </form>
            )}
          </Formik>
        </div>
      </div>
      <div className="cards">{<Card video={videosData} />}</div>
      <div className="scrollButtons">
        {
          <div>
            {/* {[1, 2, 3].map((p) => {
              return <button onClick={getVideos}>{p}</button>;
            })} */}
          </div>
        }
      </div>
    </div>
  );
};

export default Search;
