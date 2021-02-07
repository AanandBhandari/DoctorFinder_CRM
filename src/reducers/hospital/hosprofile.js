import {
    GET_HOS_PROFILE,
    CLEAR_HOS_PROFILE,
    CREATE_HOS_PROFILE,
    UPDATE_HOS_PROFILE
} from "../../actions/types";

const initalState = {
    profile: null,
    loading: true
};

export default function (state = initalState, action) {
    const { type, payload } = action;
    switch (type) {
        case UPDATE_HOS_PROFILE:
        case CREATE_HOS_PROFILE:
        case GET_HOS_PROFILE:
            return {
                ...state,
                profile: payload,
                loading: false
            };
        case CLEAR_HOS_PROFILE:
            return {
                ...state,
                profile: null,
                loading: true
            }
        default:
            return state;
    }
}
