import React, {Component} from 'react';
import {ConfigProvider, Row, Col, PageHeader} from 'antd';
import UserList from "./UserList";
import UserForm from './UserForm';
import axios from 'axios';

import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            list: []
        }
    }

    query = () => {
        axios.get('/user').then(({data}) => {
            this.setState({
                list: data
            })
        });
    };

    componentDidMount() {
        this.query();
    };

    handleSubmit = (e) => {
        console.log(e);
        e.preventDefault();
        if (this.state.name !== '') {
            axios.post('/user', {
                id: !this.state.id ? '' : this.state.id,
                name: this.state.name
            }).then(() => {
                this.setState({
                    id: '',
                    name: ''
                });
                this.query();
            })
        }
    };

    handleChange = (name) => {
        this.setState({
            name
        })
    }

    edit = (item) => {
        this.setState({
            id: item.id,
            name: item.name
        })
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
                        <UserList list={this.state.list} edit={this.edit} deleteItem={this.deleteItem} />
                    </Col>
                    <Col span={12}>
                        <UserForm name={this.state.name} handleChange={this.handleChange} handleSubmit={this.handleSubmit} />
                    </Col>
                </Row>
            </ConfigProvider>
        )
    }
}

export default App;
