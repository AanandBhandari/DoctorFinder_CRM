import { TOGGLE_DR_AVAILABLE, GET_RANKING, GET_DR_PROFILE, CLEAR_DR_PROFILE, AUTH_ERROR, UPDATE_DR_PROFILE, CREATE_DR_PROFILE, ADD_WORKEXP, DELETE_WORKEXP , ADD_EDUCATION,DELETE_EDUCATION,ADD_AWARD,ADD_TRAINING,DELETE_AWARD,DELETE_TRAINING} from "../types";
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
    if(err.response.status === 422) dispatch(setAlert(err.response.data.error,'danger',10000))
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
        errorHaldler(err, dispatch)
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
        dispatch(setAlert('Profile created Sucessfully','success'))
    } catch (err) {
        console.log(err.response, 'create doctor profile error');
        errorHaldler(err, dispatch)
    }
}

export const editProfile = (formData,_id, history) => async dispatch => {
    try {
        const res = await axios.put(`/doctor/profile/${_id}`, formData, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
        dispatch({
            type: UPDATE_DR_PROFILE,
            payload: res.data
        })
        history.push('/doctor-profile')
        dispatch(setAlert('Profile Updated Sucessfully', 'success'))
    } catch (err) {
        console.log(err.response, 'update doctor profile error');
        errorHaldler(err, dispatch)
    }
}

export const addWorkExp = (workExp, _id) => async dispatch=> {
    try {
        const body = JSON.stringify(workExp)
        const res = await axios.put(`/doctor/workexp/${_id}`,body,config)
        dispatch({
            type:ADD_WORKEXP,
            payload: res.data.workexp
        })
        dispatch(setAlert('Work/Experience is added sucessfully','success'))
    } catch (err) {
        console.log(err.response, 'add work exp error');
        errorHaldler(err, dispatch)
    }
}
export const deleteWorkExp = (we_id, _id) => async dispatch => {
    try {
        const res = await axios.delete(`/doctor/workexp/${_id}?we_id=${we_id}`)
        dispatch({
            type:DELETE_WORKEXP,
            payload: res.data.workexp
        })
        dispatch(setAlert('Work/Experience is deleted sucessfully', 'success'))
    } catch (err) {
        console.log(err.response, 'delete work exp error');
        errorHaldler(err, dispatch)
    }
}
export const addEducation = (edu, _id) => async dispatch => {
    try {
        const body = JSON.stringify(edu)
        const res = await axios.put(`/doctor/edu/${_id}`, body, config)
        dispatch({
            type: ADD_EDUCATION,
            payload: res.data.edu
        })
        dispatch(setAlert('Education is added sucessfully', 'success'))
    } catch (err) {
        console.log(err.response, 'add education error');
        errorHaldler(err, dispatch)
    }
}
export const deleteEducation = (edu_id, _id) => async dispatch => {
    try {
        const res = await axios.delete(`/doctor/edu/${_id}?we_id=${edu_id}`)
        dispatch({
            type: DELETE_EDUCATION,
            payload: res.data.edu
        })
        dispatch(setAlert('Education is deleted sucessfully', 'success'))
    } catch (err) {
        console.log(err.response, 'delete education error');
        errorHaldler(err, dispatch)
    }
}
export const addTraining = (training, _id) => async dispatch => {
    try {
        const body = JSON.stringify(training)
        const res = await axios.put(`/doctor/training/${_id}`, body, config)
        dispatch({
            type: ADD_TRAINING,
            payload: res.data.training
        })
        dispatch(setAlert('Training is added sucessfully', 'success'))
    } catch (err) {
        console.log(err.response, 'add training error');
        errorHaldler(err, dispatch)
    }
}
export const deleteTraining = (train_id, _id) => async dispatch => {
    try {
        const res = await axios.delete(`/doctor/training/${_id}?we_id=${train_id}`)
        dispatch({
            type: DELETE_TRAINING,
            payload: res.data.training
        })
        dispatch(setAlert('Education is deleted sucessfully', 'success'))
    } catch (err) {
        console.log(err.response, 'delete training error');
        errorHaldler(err, dispatch)
    }
}
export const addAward = (award, _id) => async dispatch => {
    try {
        const body = JSON.stringify(award)
        const res = await axios.put(`/doctor/award/${_id}`, body, config)
        dispatch({
            type: ADD_AWARD,
            payload: res.data.awards
        })
        dispatch(setAlert('Award is added sucessfully', 'success'))
    } catch (err) {
        console.log(err.response, 'add award error');
        errorHaldler(err, dispatch)
    }
}
export const deleteAward = (award_id, _id) => async dispatch => {
    try {
        const res = await axios.delete(`/doctor/award/${_id}?we_id=${award_id}`)
        dispatch({
            type: DELETE_AWARD,
            payload: res.data.awards
        })
        dispatch(setAlert('Award is deleted sucessfully', 'success'))
    } catch (err) {
        console.log(err.response, 'delete award error');
        errorHaldler(err, dispatch)
    }
}