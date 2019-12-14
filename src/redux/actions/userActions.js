import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_UNAUTHENTICATED,
  SET_AUTHENTICATED,
  LOADING_USER,
  GET_API
} from "../types";

import axios from "axios";

var arr = [];
var i = 1;
var lenghts = 0;

export const googlelogin = (userData, history) => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .post("googlelogin.php", userData)
    .then(response => {
      // console.log(response);
      localStorage.setItem("name", response.data.name);
      localStorage.setItem("avatar", response.data.avatar);
      localStorage.setItem("your_reflink", response.data.your_reflink);
      setAuthorizationHeader(response.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      dispatch({ type: SET_AUTHENTICATED });
      window.location.href = "/stats";
      // history.push("/stats");
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

export const logoutUser = () => dispatch => {
  localStorage.clear();
  delete axios.defaults.headers.common["Authorization"];
  dispatch({ type: SET_UNAUTHENTICATED });
};

export const getUserData = () => dispatch => {
  dispatch({ type: LOADING_USER });
  axios
    .get("info.php")
    .then(res => {
      console.log(res);
      if (res.data.status == 401) {
        dispatch(logoutUser());
      } else {
        res.data.name = localStorage.name;
        res.data.avatar = localStorage.avatar;
        // localStorage.setItem(
        //   "start_reward_program",
        //   res.data.start_reward_program
        // );
        // localStorage.setItem(
        //   "pause_reward_program",
        //   res.data.pause_reward_program
        // );
        // localStorage.setItem("tasks_remain", res.data.tasks_remain);
        // localStorage.setItem(
        //   "tasks_upload_remain",
        //   res.data.tasks_upload_remain
        // );
        // localStorage.setItem("referrals", JSON.stringify(res.data.referrals));

        ////------to admin page: user's referral levels
        //
        // arr = [];
        // i = 1;
        // lenghts = 0;
        // localStorage.setItem(
        //   "goals",
        //   JSON.stringify(refsToLevels(new Array(res.data.goals)))
        // );
        //

        dispatch({
          type: SET_USER,
          payload: res.data
        });
      }
    })
    .catch(err => console.log(err));
};

function refsToLevels(array) {
  array.forEach(element => {
    if (element.length > 0) {
      // console.log(i + " = " + element.length);
      lenghts = lenghts + element.length;
    }
  });
  if (lenghts > 0) {
    arr.push({ level: i, length: lenghts });
  }
  array.forEach(element => {
    if (element.length > 0) {
      i++;
      lenghts = 0;
      refsToLevels(element);
    }
  });
  return arr;
}

export const uploadImage = formData => dispatch => {
  dispatch({ type: LOADING_USER });
  axios
    .post("/user/image", formData)
    .then(() => {
      dispatch(getUserData());
    })
    .catch(err => console.log(err));
};

export const setAuthorizationHeader = token => {
  // const authUserCode = `Bearer ${token}`;
  localStorage.setItem("authUserCode", token);
  axios.defaults.headers.common["Authorization"] = token;
};
