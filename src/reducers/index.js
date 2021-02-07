import { combineReducers } from "redux";
import alert from "./alert";
import auth from './auth'
import drprofile from './doctor/drprofile'
import hosprofile from './hospital/hosprofile'
export default combineReducers({
  alert,
  auth,
  drprofile,
  hosprofile
});
