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

  
export const getVideosThunk = (search) => {
  return (dispatch, getState) => {
    const nextPageToken = getState().videos.nextPageToken;
    const key = "AIzaSyCH__MBn7NOvFn8i75t8o64gJGcsAA967Y";
    axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${search}&type=video&key=${key}&maxResults=50&order=relevance${nextPageToken ? "&pageToken="+nextPageToken : ""}`
    )
      .then((resp) => resp.json())
      .then((data) => {
        dispatch(setData(data.data.items));
        console.log(data.data.items)
        dispatch(setNextPageToken(data.data.nextPageToken));
      });
  };
};
