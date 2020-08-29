import * as React from "react";
import { Button, Form, Input } from "antd";
import Header from "./Header";
import { FormInstance } from "antd/lib/form";
export interface AddEditCandidateProps {
  senderName: string;
  senderEmail: string;
}

export interface AddEditCandidateState {}

class AddEditCandidate extends React.Component<AddEditCandidateProps, AddEditCandidateState> {
  formRef = React.createRef<FormInstance>();
  constructor(props, {}) {
    super(props, {});

    this.state = {};
  }

  componentDidMount() {
    this.formRef.current.setFieldsValue({
      firstName: this.props.senderName,
      email: this.props.senderEmail
    });
  }

  render() {
    const onFinish = () => {};

    const onFinishFailed = () => {};

    return (
      <div>
        <Header email={this.props.senderEmail} />
        <div className="recruit-crm-container">
          <Form name="basic" onFinish={onFinish} onFinishFailed={onFinishFailed} ref={this.formRef}>
            <Form.Item name="firstName" rules={[{ required: true, message: "Please add first name" }]}>
              <Input placeholder="First Name" />
            </Form.Item>
            <Form.Item name="lastName" rules={[{ required: true, message: "Please add last name" }]}>
              <Input placeholder="Last Name" />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please add the email" },
                { type: "email", message: "Please add valid email" }
              ]}
            >
              <Input placeholder="Email" />
            </Form.Item>
            <Form.Item name="phoneNumber">
              <Input placeholder="Phone Number" />
            </Form.Item>
            <Form.Item name="title">
              <Input placeholder="Title/Position" />
            </Form.Item>
            <Form.Item name="companyName">
              <Input placeholder="Company Name" />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" size="large" block style={{ backgroundColor: "#47BB7F", color: "white" }}>
                Add Candidate
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }

  onDisconnect = () => {};
}

export default AddEditCandidate;
