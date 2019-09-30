import React, {Component} from 'react';
import {ConfigProvider, Row, Col, PageHeader} from 'antd';
import axios from 'axios';
import UserList from "./UserList";
import UserForm from './UserForm';
import store from "./store";

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

    query = () => {
        axios.get('/user').then(({data}) => {
            const action = {
                type: 'init_user_list',
                list: data
            }
            store.dispatch(action);
        });
    };

    componentDidMount() {
        this.query();
    };

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.name !== '') {
            axios.post('/user', {
                id: !this.state.id ? '' : this.state.id,
                name: this.state.name
            }).then(() => {
                const action = {
                    type: 'set_user_empty',
                    user: {id: '', name: ''}
                }
                store.dispatch(action);
                this.query();
            })
        }
    };

    handleChange = (name) => {
        const action = {
            type: 'change_user_name',
            name
        }
        store.dispatch(action);
    }

    edit = (item) => {
        const action = {
            type: 'edit_user_name',
            user: item
        }
        store.dispatch(action)
    }

    deleteItem = (item) => {
        axios.delete(`/user/${item.id}`).then(() => {
            this.query();
        })
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
