import { TOGGLE_DR_AVAILABLE, TOGGLE_DR_AVAILABLE_FAIL, GET_RANKING } from "../types";
import axios from "axios";
import { setAlert } from "../alert";
const config = {
    headers: {
        "Content-Type": "application/json"
    }
};
// toggle doctor available
export const toggleAvailability = _id => async dispatch => {
    try {
        const res = await axios.patch(`/doctor/profile/${_id}`);
        dispatch({
            type: TOGGLE_DR_AVAILABLE,
            payload: res.data
        });
    } catch (err) {
        console.log(err.response,'toggle error');
        dispatch({
            type: TOGGLE_DR_AVAILABLE_FAIL
        });
        dispatch(setAlert(err.response.data.error, "danger"));
    }
};

export const averageRanking = _id => async dispatch => {
    try {
        const res = await axios.get(`/getAverageRating/?d_id=${_id}`)
        const data = res.data.averageStar === null ? 0 : Number.parseFloat(res.data.averageStar).toFixed(2);
        dispatch({
            type:GET_RANKING,
            payload: data
        })

    } catch (err) {
        console.log(err.response,'ranking error');
        dispatch(setAlert(err.response.statusText, "danger"));
    }
}
