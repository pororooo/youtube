import axios from "axios";
import { SET_DATA, SET_NEXT_PAGE_TOKEN } from "../actionTypes";

export const setData = (videosData) => ({
  type: SET_DATA,
  videosData,
});

export const setNextPageToken = (nextPageToken) => ({
  type: SET_NEXT_PAGE_TOKEN,
  nextPageToken,
});

export const getVideos = async (search, nextPageToken) => {
  const key = "AIzaSyCH__MBn7NOvFn8i75t8o64gJGcsAA967Y";
  return axios.get(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${search}&type=video&key=${key}&maxResults=50&order=relevance${
      nextPageToken ? "&pageToken=" + nextPageToken : ""
    }`
  );
};

export const getVideosThunk = (search) => {
  return async (dispatch, getState) => {
    try {
      const nextPageToken = getState().videos.nextPageToken;
      const { data } = await getVideos(search, nextPageToken);
      dispatch(setData(data.data.items));
      console.log(data.data.items)
      dispatch(setNextPageToken(data.data.nextPageToken));
    } catch (error) {
      console.log(error);
    }
  };
};
