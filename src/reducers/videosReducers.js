import { SET_CURRENT_PAGE, SET_DATA, SET_NEXT_PAGE_TOKEN, SET_SEARCH } from "../actionTypes";

export const initialState = {
    data: [],
    nextPageToken: "",
    search: "",
    currentPage: 1,
    page: []
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
        case SET_SEARCH : {
            const { payload } = action;
            return({
                ...state,
                search: payload
            })
        }
        case SET_CURRENT_PAGE : {
            const { payload } = action;
            return({
                ...state,
                currentPage: payload
            })
        }
        default: {
            return state;
        }
    }
}