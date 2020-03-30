import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  AUTH_ERROR,
  DECODED_MYSELF,
  LOGOUT
} from "../actions/types";

const initalState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
  type:''
};

export default function(state = initalState, action) {
  const { type, payload, role } = action;
  switch (type) {
    case DECODED_MYSELF:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
        type:role
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      };
    case LOGIN_FAIL:
    case AUTH_ERROR:
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        user: null,
        token: null,
        type:role
      };

    default:
      return state;
  }
}
