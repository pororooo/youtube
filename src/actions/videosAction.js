import axios from "axios";
import { SET_DATA, SET_NEXT_PAGE_TOKEN, SET_VIDEOS } from "../actionTypes";

export const setData = (videosData) => ({
  type: SET_DATA,
  payload: videosData,
});

export const setNextPageToken = (nextPageToken) => ({
  type: SET_NEXT_PAGE_TOKEN,
  payload: nextPageToken,
});

export const setVideos = (videos) => ({
  type: SET_VIDEOS,
  payload: videos,
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
      const nextPageToken = getState().nextPageToken;
      const { data } = await getVideos(search, nextPageToken);
      dispatch(setData(data.items));
      console.log(data.items);
      dispatch(setNextPageToken(data.nextPageToken));
    } catch (error) {
      console.log(error);
    }
  };
};
