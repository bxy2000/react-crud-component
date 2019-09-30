import {CHANGE_USER_NAME, INIT_USER_LIST, SET_USER_EMPTY, EDIT_USER_NAME} from "./actionType";
import axios from 'axios';

export const changeUsernameAction = (name) => ({
    type: CHANGE_USER_NAME,
    name
})

export const editUserAction = (user) => ({
    type: EDIT_USER_NAME,
    user
})

export const setUserEmptyAction = () => ({
    type: SET_USER_EMPTY,
    user: {id:'', name: ''}
})

export const initUserListAction = (list)=>({
    type: INIT_USER_LIST,
    list
})

export const findUsers = ()=>{
    return (dispatch) => {
        axios.get('/user').then(({data})=>{
            dispatch(initUserListAction(data))
        })
    }
}

export const saveUser = (user) => {
    return (dispatch) => {
        axios.post('/user', user).then(({data})=>{
            dispatch(setUserEmptyAction());
            dispatch(findUsers());
        })
    }
}

export const deleteUser = (id)=>{
    return (dispatch) => {
        axios.delete(`/user/${id}`).then(({data})=>{
            dispatch(findUsers());
        })
    }
}
