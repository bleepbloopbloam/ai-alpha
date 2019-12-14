import {
  SET_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  LIKE_SCREAM,
  GET_API,
  UNLIKE_SCREAM,
  MARK_NOTIFICATIONS_READ
} from "../types";

const initialState = {
  logged_in: false,
  loading: false,
  adminka: false,
  goals: [],
  tasks_done: [],
  referrals: 0,
  name: "",
  avatar: "",
  start_reward_program: 0,
  pause_reward_program: 0,
  tasks_remain: "",
  tasks_upload_remain: "",
  your_reflink: "",
  credentials: {},
  likes: [],
  notifications: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_API:
      return {
        ...state,
        api_appId: action.payload.id,
        api_session_token: action.payload.session_token
      };
    case SET_AUTHENTICATED:
      return {
        ...state,
        logged_in: true
      };
    case SET_UNAUTHENTICATED:
      return initialState;
    case SET_USER:
      return {
        logged_in: true,
        loading: false,
        ...action.payload
      };
    case LOADING_USER:
      return {
        ...state,
        loading: true
      };
    case LIKE_SCREAM:
      return {
        ...state,
        likes: [
          ...state.likes,
          {
            userHandle: state.credentials.handle,
            screamId: action.payload.screamId
          }
        ]
      };
    case UNLIKE_SCREAM:
      return {
        ...state,
        likes: state.likes.filter(
          like => like.screamId !== action.payload.screamId
        )
      };
    case MARK_NOTIFICATIONS_READ:
      state.notifications.forEach(not => (not.read = true));
      return {
        ...state
      };
    default:
      return state;
  }
}
