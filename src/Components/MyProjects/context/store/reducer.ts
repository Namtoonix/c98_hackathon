import {
  GET_MOVIE_LIST,
  GET_MOVIE_LIST_SUCCESS,
  GET_MOVIE_LIST_ERROR,
  DEFAULT_PAGE,
  SET_TOTAL_PAGE,
  SET_QUERY,
  RESET,
} from "./constants";

export const initialState = {
  error: "",
  loading: false,
  movies: [],
  query: {
    page: DEFAULT_PAGE,
  },
  totalPage: 0,
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case GET_MOVIE_LIST:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case GET_MOVIE_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        movies: action.payload,
      };
    case GET_MOVIE_LIST_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case SET_TOTAL_PAGE:
      return {
        ...state,
        totalPage: action.payload,
      };

    case SET_QUERY:
      return {
        ...state,
        query: action.payload,
      };

    case RESET:
      return initialState;
    default:
      throw new Error("Action invalid");
  }
};

export default reducer;
