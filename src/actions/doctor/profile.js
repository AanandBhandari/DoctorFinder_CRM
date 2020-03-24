import { TOGGLE_DR_AVAILABLE,GET_RANKING, GET_DR_PROFILE } from "../types";
import axios from "axios";
import { setAlert } from "../alert";
const config = {
    headers: {
        "Content-Type": "application/json"
    }
};

export const getDrProfile = _id => async dispatch => {
    try {
        const res = await axios.get(`/doctor/profile/${_id}`);
        dispatch({
            type: GET_DR_PROFILE,
            payload:res.data
        })
    } catch (err) {
        // need to handle different error code..everywhere :)
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
        console.log(err.response,'toggle error')
        dispatch(setAlert(err.response.data.error, "danger"));
    }
};

export const averageRanking = _id => async dispatch => {
    try {
        const res = await axios.get(`/getAverageRating/?d_id=5de00009ef014432f080427b`)
        res.data.averageStar === null ?
            res.data.averageStar = 0 : res.data.averageStar=Number.parseFloat(res.data.averageStar).toFixed(2);
            const data = res.data
        dispatch({
            type:GET_RANKING,
            payload: data
        })

    } catch (err) {
        console.log(err,'ranking error');
        // dispatch(setAlert(err.response.statusText, "danger"));
    }
}
