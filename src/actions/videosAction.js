import axios from "axios";
import {
  SET_DATA,
  SET_NEXT_PAGE_TOKEN,
  SET_SEARCH,
  SET_CURRENT_PAGE,
} from "../actionTypes";

export const setData = (videosData) => ({
  type: SET_DATA,
  payload: videosData,
});

export const setNextPageToken = (nextPageToken) => ({
  type: SET_NEXT_PAGE_TOKEN,
  payload: nextPageToken,
});

export const setCurrentPage = (currentPage) => ({
  type: SET_CURRENT_PAGE,
  payload: currentPage,
});

export const setSearch = (search) => ({
  type: SET_SEARCH,
  payload: search,
});


export const getVideos = async (search, nextPageToken) => {
  const key = "AIzaSyCH__MBn7NOvFn8i75t8o64gJGcsAA967Y";
  return axios.get(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${search}&type=video&key=${key}&maxResults=30&order=relevance${
      nextPageToken ? "&pageToken=" + nextPageToken : ""
    }`
  );
};

export const getInfo = async (id) => {
  const key = "AIzaSyCH__MBn7NOvFn8i75t8o64gJGcsAA967Y";
  return axios.get(
    `https://www.googleapis.com/youtube/v3/videos?id=${id}&key=${key}&part=statistics`
  );
};

export const getVideosThunk = (search) => {
  return async (dispatch, getState) => {
    try {
      const nextPageToken = getState().nextPageToken;
      const maxResults = getState().maxResults;
      const { data } = await getVideos(search, nextPageToken, maxResults);
      dispatch(setSearch(search));
      dispatch(setData(data.items));
      dispatch(setNextPageToken(data.nextPageToken));
    } catch (error) {
      console.log(error);
    }
  };
};
