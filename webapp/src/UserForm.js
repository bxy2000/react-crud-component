import React, {Component} from 'react';
import {Form, Input, Button} from 'antd';

class UserForm extends Component {
    render() {
        return (
            <Form labelCol={{span: 5}} wrapperCol={{span: 12}}>
                <Form.Item label="姓名">
                    <Input value={this.props.name} onChange={(e) => {
                        this.props.handleChange(e.target.value)
                    }}/>
                </Form.Item>
                <Form.Item wrapperCol={{span: 12, offset: 5}}>
                    <Button type="primary" htmlType="submit" onClick={(e)=>{this.props.handleSubmit(e)}}>保存</Button>
                </Form.Item>
            </Form>
        )
    }
}

export default UserForm;
