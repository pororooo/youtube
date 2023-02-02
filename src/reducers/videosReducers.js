import { SET_DATA, SET_NEXT_PAGE_TOKEN, SET_VIDEOS } from "../actionTypes";

export const initialState = {
    data: [],
    nextPageToken: '',
  };

  export const videosReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DATA : {
            const { payload } = action;
            return({
                ...state,
                data: payload
            })
        }
        case SET_NEXT_PAGE_TOKEN : {
            const { payload } = action;
            return({
                ...state,
                nextPageToken: payload
            })
        }
        case SET_VIDEOS : {
            const { payload } = action;
            return({
                ...state,
                videos: payload
            })
        }
        default: {
            return state;
        }
    }
}