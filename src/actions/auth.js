import { LOGIN_SUCCESS, LOGIN_FAIL,LOADED_MYSELF,AUTH_ERROR } from "./types";
import axios from "axios";
import { setAlert } from "../actions/alert";
import jwt from "jsonwebtoken";
import { JWT_SIGNIN_KEY } from "../config";
const config = {
  headers: {
    "Content-Type": "application/json"
  }
};
// load my profile
export const loadMe = () => async dispatch => {
  try {
    const token = localStorage.getItem("token");
    const decoded = jwt.verify(token, JWT_SIGNIN_KEY);
    const { _id, type } = decoded;
    const res = await axios.get(`/${type}/profile/${_id}`);
    const role = {
      isDr:type==='doctor'? true:false,
      isHosManager:type==='hospital'?true:false
    }
    dispatch({
      type: LOADED_MYSELF,
      payload:res.data,
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
    const res = await axios.post(`/${type}/signup`, body, config);
    dispatch(setAlert(res.data.msg, "success", 15000));
  } catch (err) {
    dispatch(setAlert(err.response.data.error, "danger"));
  }
};
// login user
export const login = ({ email, password, type }) => async dispatch => {
  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post(`/${type}/signin`, body, config);
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
