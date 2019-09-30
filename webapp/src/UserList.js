import React, {Component} from 'react';
import {Button, Divider, Table} from "antd";

class UserList extends Component {
    render() {
        const {list} = this.props;

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
                        this.props.edit(item)
                    }}>编辑</Button>
                    <Divider type="vertical"/>
                    <Button type="danger" onClick={() => {
                        this.props.deleteItem(item)
                    }}>删除</Button>
                </span>
            )
        }];
        return (
            <Table rowKey={record => record.id} dataSource={list} columns={columns}/>
        )
    }
}

export default UserList;
