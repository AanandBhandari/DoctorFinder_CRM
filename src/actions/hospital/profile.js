import {CLEAR_HOS_PROFILE,CREATE_HOS_PROFILE,GET_HOS_PROFILE,UPDATE_HOS_PROFILE,AUTH_ERROR} from '../types'
import axios from "axios";
import { SERVER_ROUTE } from "../../utils/config";
import { setAlert } from "../alert";
const config = {
    headers: {
        baseURL: `${SERVER_ROUTE}`,
        "Content-Type": "application/json"
    }
};
const api = axios.create({
    baseURL: `${SERVER_ROUTE}`,
    headers: {

        "Content-Type": "application/json",
    },
    // withCredentials: true// should be only post req
});
const errorHaldler = (err, dispatch) => {
    if (err.response.status === 500) dispatch(setAlert(err.response.statusText, 'danger', 10000))
    if (err.response.status === 401) {
        dispatch(setAlert(err.response.data.error, "danger", 10000));
        dispatch({ type: AUTH_ERROR })
        dispatch({ type: CLEAR_HOS_PROFILE })
    }
    if ((err.response.status === 422) || (err.response.status === 403) || (err.response.status === 400)) dispatch(setAlert(err.response.data.error, 'danger', 10000))
}
export const getHosProfile = _id => async dispatch => {
    try {
        const res = await api.get(`/hospital/profile/${_id}`);
        dispatch({
            type: GET_HOS_PROFILE,
            payload: res.data
        })

    } catch (err) {
        console.log(err.response, 'get hos profile error');
        errorHaldler(err, dispatch)
    }
}

export const createProfile = profileData => async dispatch => {
    try {
        const res = await api.put('/doctor/profile', profileData, config)
        dispatch({
            type: CREATE_HOS_PROFILE,
            payload: res.data
        })
        dispatch(setAlert('Profile created Sucessfully', 'success'))
    } catch (err) {
        console.log(err.response, 'create doctor profile error');
        errorHaldler(err, dispatch)
    }
}

export const editProfile = (profileData, _id, history) => async dispatch => {
    try {
        const res = await api.put(`/hospital/profile/${_id}`, profileData, config)
        dispatch({
            type: UPDATE_HOS_PROFILE,
            payload: res.data
        })
        history.push('/hospital-profile')
        dispatch(setAlert('Profile Updated Sucessfully', 'success'))
    } catch (err) {
        console.log(err.response, 'update hospital profile error');
        errorHaldler(err, dispatch)
    }
}