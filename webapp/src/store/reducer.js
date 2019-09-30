const defaultState = {
    id: '',
    name: '',
    list: []
}

export default (state = defaultState, action) => {
    const newState = Object.create(state);
    switch(action.type){
        case 'change_user_name':
            newState.name = action.name;
            break;
        case 'init_user_list':
            newState.list = action.list;
            break;
        case 'edit_user_name':
        case 'set_user_empty':
            newState.id = action.user.id;
            newState.name = action.user.name;
            break;
        default:
            break;
    }

    return newState;
}
