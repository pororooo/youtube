import {
  SET_CURRENT_PAGE,
  SET_DATA,
  SET_NEXT_PAGE_TOKEN,
  SET_SEARCH,
  SET_PAGE,
  SET_TOTAL_COUNT,
  SET_ID,
  SET_LIKES,
} from "../actionTypes";

export const initialState = {
  data: [],
  nextPageToken: "",
  search: "",
  currentPage: 1,
  page: [],
  totalCount: 0,
  id: [],
  likes: [],
};

export const videosReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DATA: {
      const { payload } = action;
      return {
        ...state,
        data: payload,
      };
    }
    case SET_NEXT_PAGE_TOKEN: {
      const { payload } = action;
      return {
        ...state,
        nextPageToken: payload,
      };
    }
    case SET_SEARCH: {
      const { payload } = action;
      return {
        ...state,
        search: payload,
      };
    }
    case SET_CURRENT_PAGE: {
      const { payload } = action;
      return {
        ...state,
        currentPage: payload,
      };
    }
    case SET_PAGE: {
      const { payload } = action;
      return {
        ...state,
        page: payload,
      };
    }

    case SET_TOTAL_COUNT: {
      const { payload } = action;
      return {
        ...state,
        totalCount: payload,
      };
    }
    case SET_ID: {
      const { payload } = action;
      return {
        ...state,
        id: payload,
      };
    }
    case SET_LIKES: {
      const { payload } = action;
      return {
        ...state,
        likes: payload,
      };
    }

    default: {
      return state;
    }
  }
};
