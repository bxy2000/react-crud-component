import {CHANGE_USER_NAME, INIT_USER_LIST, EDIT_USER_NAME, SET_USER_EMPTY} from "./actionType";

const defaultState = {
    id: '',
    name: '',
    list: []
}

export default (state = defaultState, action) => {
    const newState = Object.create(state);
    switch(action.type){
        case CHANGE_USER_NAME:
            newState.name = action.name;
            break;
        case INIT_USER_LIST:
            newState.list = action.list;
            break;
        case EDIT_USER_NAME:
        case SET_USER_EMPTY:
            newState.id = action.user.id;
            newState.name = action.user.name;
            break;
        default:
            break;
    }

    return newState;
}
