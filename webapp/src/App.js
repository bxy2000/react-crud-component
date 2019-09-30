import React, {Component} from 'react';
import {ConfigProvider, Row, Col, PageHeader} from 'antd';
import axios from 'axios';
import UserList from "./UserList";
import UserForm from './UserForm';

import store from "./store";
import {
    editUserAction,
    findUsers,
    saveUser,
    deleteUser, changeUsernameAction
} from "./store/actionCreator";

import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');


class App extends Component {
    constructor(props) {
        super(props);
        this.state = store.getState();
        store.subscribe(() => {
            this.setState(store.getState());
        })
    }

    componentDidMount() {
        this.query();
    }

    edit = (item) => {
        store.dispatch(editUserAction(item));
    }

    query = () => {
        store.dispatch(findUsers());
    }

    deleteItem = (item) => {
        store.dispatch(deleteUser(item.id));
    }

    handleChange = (name) => {
        store.dispatch(changeUsernameAction(name));
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.name !== '') {
            store.dispatch(saveUser({
                id: !this.state.id ? '' : this.state.id,
                name: this.state.name
            }));
        }
    };

    render() {
        return (
            <ConfigProvider locale={zhCN}>
                <Row>
                    <PageHeader title="用户列表"/>
                </Row>
                <Row>
                    <Col span={12}>
                        <UserList list={this.state.list} edit={this.edit} deleteItem={this.deleteItem}/>
                    </Col>
                    <Col span={12}>
                        <UserForm name={this.state.name} handleChange={this.handleChange}
                                  handleSubmit={this.handleSubmit}/>
                    </Col>
                </Row>
            </ConfigProvider>
        )
    }
}

export default App;
