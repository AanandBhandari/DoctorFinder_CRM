import { TOGGLE_DR_AVAILABLE, GET_RANKING, GET_DR_PROFILE, CLEAR_DR_PROFILE, AUTH_ERROR, UPDATE_DR_PROFILE, CREATE_DR_PROFILE, ADD_WORKEXP, DELETE_WORKEXP, ADD_EDUCATION, DELETE_EDUCATION, ADD_AWARD, ADD_TRAINING, DELETE_AWARD, DELETE_TRAINING, GET_OPD, GET_COMMENTS, REMOVE_COMMENTS} from "../types";
import axios from "axios";
import { setAlert } from "../alert";
import { SERVER_ROUTE } from "../../utils/config";
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
const errorHaldler = (err,dispatch) => {
    if (err.response.status === 500) dispatch(setAlert(err.response.statusText, 'danger', 10000))
    if (err.response.status === 401 ) {
        dispatch(setAlert(err.response.data.error, "danger", 10000));
        dispatch({ type: AUTH_ERROR })
        dispatch({ type: CLEAR_DR_PROFILE })
    }
    if ((err.response.status === 422) || (err.response.status === 403) || (err.response.status === 400)) dispatch(setAlert(err.response.data.error,'danger',10000))
}
export const getDrProfile = _id => async dispatch => {
    try {
        const res = await api.get(`/doctor/profile/${_id}`);
        dispatch({
            type: GET_DR_PROFILE,
            payload: res.data
        })
        
    } catch (err) {
        console.log(err.response, 'get dr profile error');
        errorHaldler(err,dispatch)
    }
}

// toggle doctor available
export const toggleAvailability = _id => async dispatch => {
    try {
        const res = await api.patch(`/doctor/profile/${_id}`);
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
        const res = await api.get(`/getAverageRating/?d_id=${_id}`)
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
        const res = await api.put('/doctor/profile', formData , {headers: {
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
        const res = await api.put(`/doctor/profile/${_id}`, formData, {
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
        const res = await api.put(`/doctor/workexp/${_id}`,body,config)
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
        const res = await api.delete(`/doctor/workexp/${_id}?we_id=${we_id}`)
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
        const res = await api.put(`/doctor/edu/${_id}`, body, config)
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
        const res = await api.delete(`/doctor/edu/${_id}?we_id=${edu_id}`)
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
        const res = await api.put(`/doctor/training/${_id}`, body, config)
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
        const res = await api.delete(`/doctor/training/${_id}?we_id=${train_id}`)
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
        const res = await api.put(`/doctor/award/${_id}`, body, config)
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
        const res = await api.delete(`/doctor/award/${_id}?we_id=${award_id}`)
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
export const getOPDs = _id => async dispatch => {
    try {
        const res = await api.get(`/getOPDByDoctor/?d_id=${_id}`)
        dispatch({
            type: GET_OPD,
            payload:res.data
        })
    } catch (err) {
        console.log(err.response, 'get OPDs error');
        errorHaldler(err, dispatch)
    }
}
export const getComments = (_id,page=1) => async dispatch => {
    try {
        const res = await api.get(`/getReviews/?d_id=${_id}&page=${page}`)
        dispatch({
            type: GET_COMMENTS,
            payload: res.data
        })
    } catch (err) {
        console.log(err.response, 'get comments error');
        errorHaldler(err, dispatch)
    }
}
export const removeComments = () => async dispatch=>{
    dispatch({
        type: REMOVE_COMMENTS
    })
}
