// accept states and action
import { SET_ALERT, REMOVE_ALERT} from '../actions/types'
const initialState = [];


//action = action type and payload
export default function(state = initialState, action) {
    const { type, payload } = action; // de-structure the action variable

    switch(type) {
        case SET_ALERT:
            return [...state, payload]; // spread operator (use any states declared and then payload )
        case REMOVE_ALERT:
            return state.filter(alert => alert.id !== payload); //payload is the id
        default:
            return state;
    }
}