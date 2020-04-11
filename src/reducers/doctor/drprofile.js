import {
    TOGGLE_DR_AVAILABLE,
    GET_RANKING,
    GET_DR_PROFILE,
    CLEAR_DR_PROFILE,
    CREATE_DR_PROFILE,
    UPDATE_DR_PROFILE,
    ADD_WORKEXP,
    DELETE_WORKEXP,
    ADD_EDUCATION,
    DELETE_EDUCATION,
    DELETE_AWARD,
    ADD_AWARD,
    DELETE_TRAINING,
    ADD_TRAINING
} from "../../actions/types";

const initalState = {
    profile:null,
    loading: true,
    ranking:null
};

export default function (state = initalState, action) {
    const { type, payload } = action;
    switch (type) {
        case UPDATE_DR_PROFILE:
        case CREATE_DR_PROFILE:
        case GET_DR_PROFILE:
            return{
                ...state,
                profile:payload,
                loading: false
            };
        case TOGGLE_DR_AVAILABLE:
            return {
                ...state,
                profile: { ...state.profile, isAvailable: payload },
                loading: false
            };
        case GET_RANKING:
            return {
                ...state,
                ranking: payload,
                loading: false
            }
        case DELETE_WORKEXP:
        case ADD_WORKEXP:
            return {
                ...state,
                profile:{...state.profile,workexp:payload}
            }
        case DELETE_EDUCATION:
        case ADD_EDUCATION:
            return {
                ...state,
                profile: { ...state.profile, edu: payload }
            }
        case DELETE_AWARD:
        case ADD_AWARD:
            return {
                ...state,
                profile: { ...state.profile, awards: payload }
            }
        case DELETE_TRAINING:
        case ADD_TRAINING:
            return {
                ...state,
                profile: { ...state.profile, training: payload }
            }
        case CLEAR_DR_PROFILE:
            return{
                ...state,
                profile:null,
                ranking: null,
                loading: false
            }
        default:
            return state;
    }
}
