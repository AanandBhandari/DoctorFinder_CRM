import { LOGIN_SUCCESS, LOGIN_FAIL,DECODED_MYSELF,AUTH_ERROR,LOGOUT, CLEAR_DR_PROFILE, CLEAR_HOS_PROFILE} from "./types";
import axios from "axios";
import { setAlert } from "./alert";
import jwt from "jsonwebtoken";
import { JWT_SIGNIN_KEY, SERVER_ROUTE } from "../utils/config";
import setAuthToken from '../utils/setAuthToken'
const config = {
  baseURL: `${SERVER_ROUTE}`,
  headers: {
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
// load my profile
export const loadMe = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const token = localStorage.getItem("token");
    const decoded = jwt.verify(token, JWT_SIGNIN_KEY);
    const { _id,name,email,type } = decoded;
    const payload ={_id,name,email}
    dispatch({
      type: DECODED_MYSELF,
      payload,
      role:type      
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};
// Register user
export const register = ({
  name,
  lastname,
  email,
  password,
  type
}) => async dispatch => {
  const body = JSON.stringify({ name, lastname, email, password });
  try {
    const res = await api.post(`/${type}/signup`, body, config);
    dispatch(setAlert(res.data.msg, "success", 15000));
  } catch (err) {
    dispatch(setAlert(err.response.data.error, "danger"));
  }
};
// login user
export const login = ({ email, password, type }) => async dispatch => {
  const body = JSON.stringify({ email, password });
  try {
    const res = await api.post(`/${type}/signin`, body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    dispatch(loadMe());
  } catch (err) {
    dispatch(setAlert(err.response.data.error, "danger"));
    dispatch({
      type: LOGIN_FAIL
    });
  }
};
export const logout = type=> dispatch => {
  dispatch({type: LOGOUT})
  type ==='doctor' && dispatch({type:CLEAR_DR_PROFILE})
  type === 'hospital' && dispatch({ type: CLEAR_HOS_PROFILE })
}
