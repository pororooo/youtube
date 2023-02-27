import { getVideosThunk, setAllNull } from "../store/actions/videosAction";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const useVideos = () => {
  const dispatch = useDispatch();
  const search = useSelector((state) => state.search);
  const currentPage = useSelector((state) => state.currentPage);
  const nextPageToken = useSelector((state) => state.nextPageToken);
  const data = useSelector((state) => state.data);


  useEffect(() => {
    if ((currentPage + 2) % 10 === 0) {
      dispatch(getVideosThunk(search));
    }
  }, [search, dispatch, nextPageToken, data]);
};

export default useVideos;
