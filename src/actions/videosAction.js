import { getVideos, getLikes } from "../server";

import {
  SET_DATA,
  SET_NEXT_PAGE_TOKEN,
  SET_SEARCH,
  SET_CURRENT_PAGE,
  SET_TOTAL_COUNT,
  SET_ID,
  SET_PAGE,
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

export const setPage = (page) => ({
  type: SET_PAGE,
  payload: page,
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

export const getVideosThunk = (search) => {
  return async (dispatch, getState) => {
    try {
      const nextPageToken = getState().nextPageToken;
      const maxResults = getState().maxResults;
      const { data } = await getVideos(search, nextPageToken, maxResults);
      dispatch(setTotalCount(data.pageInfo.totalResults));
      if (getState().search !== search && getState().search !== false) {
        dispatch(setData([]));
        console.log(getState().search)
      }
      dispatch(setSearch(search));
      const oldState = getState().data;
      const videos = oldState ? [...oldState, data.items].flat(1) : data.items;
      dispatch(setData(videos));
      dispatch(setNextPageToken(data.nextPageToken));

      const ids = [];
      const oldStateIds = getState().likes;
      for (let i = 0; i < data.items.length; i++) {
        ids.push(data.items[i].id.videoId);
      }
      dispatch(setId(ids));
      const likes = await getLikes(ids);
      const statistic = oldStateIds
        ? [...oldStateIds, likes.data.items].flat(1)
        : likes.data.items;
      dispatch(setLikes(statistic));
    } catch (error) {
      console.log(error);
    }
  };
};
