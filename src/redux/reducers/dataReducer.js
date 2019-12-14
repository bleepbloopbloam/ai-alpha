import {
  SET_SCREAMS,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  LOADING_DATA,
  DELETE_SCREAM,
  POST_SCREAM,
  SET_SCREAM,
  LOAD_TASK,
  SEND_ANSWER,
  SUBMIT_COMMENT,
  GET_HOME_TEXT,
  PREDICT_IMAGE,
  SEND_IMAGE,
  LOAD_UPLOAD_TASK,
  GET_ADMIN_DATA
} from "../types";

const initialState = {
  hometext: {},
  screams: [],
  answer: {},
  task: {},
  scream: {},
  image_response: {},
  ai_prediction: "",
  loading: false,
  finscreen: false,
  users: [],
  admin_data: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ADMIN_DATA:
      return {
        ...state,
        users: action.payload,
        loading: false
      };
    case LOAD_UPLOAD_TASK:
      return {
        ...state,
        image_response: {},
        task: action.payload,
        loading: false
      };
    case SEND_IMAGE:
      return {
        ...state,
        image_response: action.payload,
        loading: false
      };
    case PREDICT_IMAGE:
      return {
        ...state,
        ai_prediction: action.payload,
        loading: false
      };
    case GET_HOME_TEXT:
      return {
        ...state,
        hometext: action.payload,
        loading: false
      };
    case LOAD_TASK:
      return {
        ...state,
        task: action.payload,
        ai_prediction: "",
        loading: false,
        finscreen: false
      };
    case SEND_ANSWER:
      return {
        ...state,
        answer: action.payload,
        finscreen: true
      };
    case LOADING_DATA:
      return {
        ...state,
        loading: true
      };
    case SET_SCREAMS:
      return {
        ...state,
        screams: action.payload,
        loading: false
      };
    case SET_SCREAM:
      return {
        ...state,
        scream: action.payload
      };
    case LIKE_SCREAM:
    case UNLIKE_SCREAM:
      let index = state.screams.findIndex(
        scream => scream.screamId === action.payload.screamId
      );
      state.screams[index] = action.payload;
      if (state.scream.screamId === action.payload.screamId) {
        state.scream = action.payload;
      }
      return {
        ...state
      };
    case DELETE_SCREAM:
      index = state.screams.findIndex(
        scream => scream.screamId === action.payload
      );
      state.screams.splice(index, 1);
      return {
        ...state
      };
    case POST_SCREAM:
      return {
        ...state,
        screams: [action.payload, ...state.screams]
      };
    case SUBMIT_COMMENT:
      return {
        ...state,
        scream: {
          ...state.scream,
          comments: [action.payload, ...state.scream.comments]
        }
      };
    default:
      return state;
  }
}
