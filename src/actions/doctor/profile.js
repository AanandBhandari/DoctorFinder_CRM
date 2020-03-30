import { TOGGLE_DR_AVAILABLE, GET_RANKING, GET_DR_PROFILE, CLEAR_DR_PROFILE, AUTH_ERROR, CREATE_DR_PROFILE } from "../types";
import axios from "axios";
import { setAlert } from "../alert";
const config = {
    headers: {
        "Content-Type": "application/json"
    }
};
const errorHaldler = (err,dispatch) => {
    if (err.response.status === 500) dispatch(setAlert(err.response.statusText, 'danger', 10000))
    if ((err.response.status === 401) || (err.response.status === 403)) {
        dispatch(setAlert(err.response.data.error, "danger", 10000));
        dispatch({ type: AUTH_ERROR })
        dispatch({ type: CLEAR_DR_PROFILE })
    }
}
export const getDrProfile = _id => async dispatch => {
    try {
        const res = await axios.get(`/doctor/profile/${_id}`);
        dispatch({
            type: GET_DR_PROFILE,
            payload: res.data
        })
    } catch (err) {
        // need to handle different error code..everywhere :)
        console.log(err.response, 'get dr profile error');
        errorHaldler(err,dispatch)
    }
}

// toggle doctor available
export const toggleAvailability = _id => async dispatch => {
    try {
        const res = await axios.patch(`/doctor/profile/${_id}`);
        dispatch({
            type: TOGGLE_DR_AVAILABLE,
            payload: res.data
        });
    } catch (err) {
        console.log(err.response, 'toggle error')
       errorHaldler(err,dispatch)
    }
};

export const averageRanking = _id => async dispatch => {
    try {
        const res = await axios.get(`/getAverageRating/?d_id=${_id}`)
        res.data.averageStar === null ?
            res.data.averageStar = 0 : res.data.averageStar = Number.parseFloat(res.data.averageStar).toFixed(2);
        dispatch({
            type: GET_RANKING,
            payload: res.data
        })

    } catch (err) {
        console.log(err, 'ranking error');
        // dispatch(setAlert(err.response.statusText, "danger"));
    }
}

export const createProfile = formData => async dispatch => {
    try {
        const res = await axios.put('/doctor/profile', formData , {headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }})
        dispatch({
            type:CREATE_DR_PROFILE,
            payload: res.data
        })
    } catch (err) {
        console.log(err.response, 'create dr profile error');
        errorHaldler(err, dispatch)
    }
}
