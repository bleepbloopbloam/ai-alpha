import {
  SET_SCREAMS,
  LOADING_DATA,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  DELETE_SCREAM,
  SET_ERRORS,
  POST_SCREAM,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_SCREAM,
  SEND_ANSWER,
  LOAD_TASK,
  STOP_LOADING_UI,
  SUBMIT_COMMENT,
  PREDICT_IMAGE,
  SEND_IMAGE,
  LOAD_UPLOAD_TASK,
  GET_ADMIN_DATA
} from "../types";
import axios from "axios";
import * as cocoSsd from "@tensorflow-models/coco-ssd";

//get admin data
export const getAdminData = req => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .post("admin_data.php", req)
    .then(res => {
      // console.log(res);
      dispatch({
        type: GET_ADMIN_DATA,
        payload: res.data
      });
      dispatch(clearErrors());
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

//get task
export const getTask = () => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .get("get_task.php")
    .then(res => {
      console.log(res);
      dispatch({
        type: LOAD_TASK,
        payload: res.data
      });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch(err => console.log(err));
};

// send answer
export const sendAnswer = req => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .post("send_answer.php", req)
    .then(res => {
      dispatch({
        type: SEND_ANSWER,
        payload: res.data
      });
      dispatch(clearErrors());
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

// predict image
export const predictImage = img => dispatch => {
  dispatch({ type: LOADING_UI });
  cocoSsd
    .load()
    .then(model => {
      model
        .detect(img)
        .then(predictions => {
          const preds =
            predictions[0].class +
            ": " +
            (predictions[0].score * 100).toFixed(2) +
            "%";
          dispatch({
            type: PREDICT_IMAGE,
            payload: preds
          });
          dispatch(clearErrors());
        })
        .catch(err => {
          dispatch({
            type: SET_ERRORS,
            payload: err.response.data
          });
        });
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

// send image
export const sendImage = formData => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .post("upload.php", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    .then(res => {
      dispatch({
        type: SEND_IMAGE,
        payload: res.data
      });
      console.log(res);
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
      console.log("upload fail");
    });
};

//load upload_task page
export const loadUploadTask = () => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .get("get_task.php")
    .then(res => {
      console.log(res);
      dispatch({
        type: LOAD_UPLOAD_TASK,
        payload: res.data
      });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
  dispatch({ type: STOP_LOADING_UI });
};

// //get referrals
// export const getReferrals= () => dispatch => {
//   dispatch({ type: LOADING_UI });
//   axios
//     .get("get_refs.php")
//     .then(res => {
//       console.log(res);
//       dispatch({
//         type: GET_REFERRALS,
//         payload: res.data
//       });
//       dispatch({ type: STOP_LOADING_UI });
//     })
//     .catch(err => {
//       dispatch({
//         type: SET_ERRORS,
//         payload: err.response.data
//       });
//     });
//   dispatch({ type: STOP_LOADING_UI });
// };

// Get all screams
export const getScreams = () => dispatch => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/screams")
    .then(res => {
      dispatch({
        type: SET_SCREAMS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: SET_SCREAMS,
        payload: []
      });
    });
};
export const getScream = screamId => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/scream/${screamId}`)
    .then(res => {
      dispatch({
        type: SET_SCREAM,
        payload: res.data
      });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch(err => console.log(err));
};
// Post a scream
export const postScream = newScream => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/scream", newScream)
    .then(res => {
      dispatch({
        type: POST_SCREAM,
        payload: res.data
      });
      dispatch(clearErrors());
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};
// Like a scream
export const likeScream = screamId => dispatch => {
  axios
    .get(`/scream/${screamId}/like`)
    .then(res => {
      dispatch({
        type: LIKE_SCREAM,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};
// Unlike a scream
export const unlikeScream = screamId => dispatch => {
  axios
    .get(`/scream/${screamId}/unlike`)
    .then(res => {
      dispatch({
        type: UNLIKE_SCREAM,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};
// Submit a comment
export const submitComment = (screamId, commentData) => dispatch => {
  axios
    .post(`/scream/${screamId}/comment`, commentData)
    .then(res => {
      dispatch({
        type: SUBMIT_COMMENT,
        payload: res.data
      });
      dispatch(clearErrors());
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};
export const deleteScream = screamId => dispatch => {
  axios
    .delete(`/scream/${screamId}`)
    .then(() => {
      dispatch({ type: DELETE_SCREAM, payload: screamId });
    })
    .catch(err => console.log(err));
};

export const clearErrors = () => dispatch => {
  dispatch({ type: CLEAR_ERRORS });
  dispatch({ type: STOP_LOADING_UI });
};
