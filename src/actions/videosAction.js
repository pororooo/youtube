import axios from "axios";
import {
  SET_DATA,
  SET_NEXT_PAGE_TOKEN,
  SET_SEARCH,
  SET_CURRENT_PAGE,
  SET_TOTAL_COUNT,
  SET_ID,
  SET_LIKES,
} from "../actionTypes";

export const setData = (data) => ({
  type: SET_DATA,
  payload: data,
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
export const setTotalCount = (totalCount) => ({
  type: SET_TOTAL_COUNT,
  payload: totalCount,
});
export const setId = (id) => ({
  type: SET_ID,
  payload: id,
});
export const setLikes = (likes) => ({
  type: SET_LIKES,
  payload: likes,
});

export const getVideos = async (search, nextPageToken) => {
  const key = "AIzaSyD8NhtPbZR0W0tsdNTo8XpUZdF3Jlu_6NE";
  return axios.get(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${search}&type=video&key=${key}&maxResults=30&order=relevance${
      nextPageToken ? "&pageToken=" + nextPageToken : ""
    }`
  );
};

export const getLikes = async (ids) => {
  const key = "AIzaSyB_Qfguku1t5k5LrJ2r3Q2VvtkZxN_zNyI";
  return axios.get(
    `https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${ids.join(
      ","
    )}&key=${key}`
  );
};

export const getVideosThunk = (search) => {
  return async (dispatch, getState) => {
    try {
      const nextPageToken = getState().nextPageToken;
      const maxResults = getState().maxResults;
      const { data } = await getVideos(search, nextPageToken, maxResults);
      dispatch(setTotalCount(data.pageInfo.totalResults));
      dispatch(setSearch(search));
      const arr = [];
      const oldStateIds = getState().id;
      for (let i = 0; i < data.items.length; i++) {
        arr.push(data.items[i].id.videoId);
      }
      const ids = oldStateIds ? [...oldStateIds, arr].flat(1) : arr;
      dispatch(setId(ids));
      const { statistic } = await getLikes(ids);
      console.log(ids.join(
        ","
      ))
      dispatch(setLikes(statistic.items))
      const oldState = getState().data;
      const videos = oldState ? [...oldState, data.items].flat(1) : data.items;
      dispatch(setData(videos));
      dispatch(setNextPageToken(data.nextPageToken));
    } catch (error) {
      console.log(error);
    }
  };
};
export const getVideosInfo = (id) => {
  return async (dispatch, getState) => {
    try {
      const { data } = await getLikes(id);
      dispatch(setTotalCount(data.pageInfo.totalResults));
      dispatch(setData(data.items));
      dispatch(setNextPageToken(data.nextPageToken));
    } catch (error) {
      console.log(error);
    }
  };
};
