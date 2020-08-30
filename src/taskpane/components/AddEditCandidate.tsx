import * as React from "react";
import { Button, Form, Input, Spin, Alert } from "antd";
import Header from "./Header";
import { FormInstance } from "antd/lib/form";
import { addCandidate } from "../services/candidateService";
import ReactDOM from "react-dom";
import Initial from "./Initial";
export interface AddEditCandidateProps {
  senderName: string;
  senderEmail: string;
}

export interface AddEditCandidateState {
  inProgress: boolean;
  isError: boolean;
}

class AddEditCandidate extends React.Component<AddEditCandidateProps, AddEditCandidateState> {
  formRef = React.createRef<FormInstance>();
  constructor(props, {}) {
    super(props, {});

    this.state = {
      inProgress: false,
      isError: false,
    };
  }

  componentDidMount() {
    this.formRef.current.setFieldsValue({
      firstName: this.props.senderName,
      email: this.props.senderEmail
    });
  }

  render() {
    const onFinish = async values => {
      console.log("Success:", values);
      this.setState({ inProgress: true });
      let candidateObj = {
        first_name: values.firstName,
        last_name: values.lastName,
        email: values.email,
        contact_number: values.phoneNumber,
        position: values.title,
        current_status: values.currentStatus
      };
      try {
        const authKey = Office.context.roamingSettings.get("keyRecruitCRM");
        let response = await addCandidate(candidateObj, authKey);
        if (response) {
          this.setState({ inProgress: false, isError: false });
          ReactDOM.render(<Initial title="Recruit CRM Add in" keyVal={new Date().getTime().toString()} />, document.getElementById("container"));
        } else {
          this.setState({ inProgress: false, isError: true });
        }
      } catch (error) {
        this.setState({ inProgress: false, isError: true });
      }
      setTimeout(
        function() {
          this.setState({ isError: false });
        }.bind(this),
        5000
      );
    };

    const onFinishFailed = () => {};

    return (
      <div>
        <Header email={this.props.senderEmail} />
        {this.state.isError && (
          <div>
            <Alert message="Error in add contact" type="error" showIcon style={{marginTop: "5px"}}/>
          </div>
        )}
        {!this.state.inProgress ? (
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
            <Form.Item name="currentStatus">
              <Input placeholder="Current Status" />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" size="large" block style={{ backgroundColor: "#47BB7F", color: "white" }}>
                Add Candidate
              </Button>
            </Form.Item>
          </Form>
        </div>
        ) : (
          <div className="centered">
            <Spin />
          </div>
        )}
      </div>
    );
  }

  onDisconnect = () => {};
}

export default AddEditCandidate;
