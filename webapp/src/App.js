import React, {Component} from 'react';
import {ConfigProvider, Row, Col, Table, Form, Divider, Button, Input, PageHeader} from 'antd';

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

    handleSubmit = e => {
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

    deleteItem = (item) => {
        axios.delete(`/user/${item.id}`).then(() => {
            this.query();
        })
    };

    render() {
        const columns = [{
            title: 'ID',
            dataIndex: 'id',
            key: 'id'
        }, {
            title: '姓名',
            dataIndex: 'name',
            key: 'name'
        }, {
            title: '操作',
            key: 'action',
            width: '180px',
            render: (text, item) => (
                <span>
                    <Button type="default" onClick={() => {
                        this.setState({id: item.id, name: item.name})
                    }}>编辑</Button>
                    <Divider type="vertical"/>
                    <Button type="danger" onClick={() => {
                        this.deleteItem(item)
                    }}>删除</Button>
                </span>
            )
        }];

        return (
            <ConfigProvider locale={zhCN}>
                <Row>
                    <PageHeader title="用户列表"/>
                </Row>
                <Row>
                    <Col span={12}>
                        <Table rowKey={record => record.id} dataSource={this.state.list} columns={columns}/>
                    </Col>
                    <Col span={12}>
                        <Form labelCol={{span: 5}} wrapperCol={{span: 12}} onSubmit={this.handleSubmit}>
                            <Form.Item label="姓名">
                                <Input value={this.state.name} onChange={
                                    (e) => {
                                        this.setState({
                                            name: e.target.value
                                        })
                                    }
                                }/>
                            </Form.Item>
                            <Form.Item wrapperCol={{span: 12, offset: 5}}>
                                <Button type="primary" htmlType="submit">提交</Button>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </ConfigProvider>
        )
    }
}

export default App;
