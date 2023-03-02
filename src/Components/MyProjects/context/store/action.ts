import {
  GET_MOVIE_LIST,
  GET_MOVIE_LIST_SUCCESS,
  GET_MOVIE_LIST_ERROR,
  SET_TOTAL_PAGE,
  SET_QUERY,
  RESET,
} from "./constants";

export const getMoviesList = (payload: any) => ({
  type: GET_MOVIE_LIST,
  payload,
});
export const getMoviesListSuccess = (payload: any) => ({
  type: GET_MOVIE_LIST_SUCCESS,
  payload,
});
export const getMoviesListError = (payload: any) => ({
  type: GET_MOVIE_LIST_ERROR,
  payload,
});

export const setQuery = (payload: any) => ({
  type: SET_QUERY,
  payload,
});

export const setTotalPage = (payload: any) => ({
  type: SET_TOTAL_PAGE,
  payload,
});

export const reset = (payload: any) => ({
  type: RESET,
});
