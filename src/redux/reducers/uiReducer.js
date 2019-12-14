import {
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  STOP_LOADING_UI,
  THANK_YOU
} from "../types";

const initialState = {
  loading: false,
  errors: null,
  finscreen: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case THANK_YOU:
      return {
        ...state,
        loading: false,
        finscreen: true
      };
    case SET_ERRORS:
      return {
        ...state,
        loading: false,
        errors: action.payload
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        errors: null
      };
    case LOADING_UI:
      return {
        ...state,
        loading: true
      };
    case STOP_LOADING_UI:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
}
