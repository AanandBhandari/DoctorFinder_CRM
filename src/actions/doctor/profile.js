import { TOGGLE_DR_AVAILABLE,TOGGLE_DR_AVAILABLE_FAIL } from "../types";
import axios from "axios";
import { setAlert } from "../actions/alert";
import jwt from "jsonwebtoken";
import { JWT_SIGNIN_KEY } from "../../utils/config";
const config = {
    headers: {
        "Content-Type": "application/json"
    }
};
// toggle doctor available
export const toggleAvailability = () => async dispatch => {
    try {
        const token = localStorage.getItem("token");
        const decoded = jwt.verify(token, JWT_SIGNIN_KEY);
        const { _id, type } = decoded;
        const res = await axios.patch(`/${type}/profile/${_id}`);
        dispatch({
            type: TOGGLE_DR_AVAILABLE,
            payload: res.data
        });
    } catch (err) {
        console.log(err);
        // dispatch({
        //     type: TOGGLE_DR_AVAILABLE_FAIL
        // });
    }
};

