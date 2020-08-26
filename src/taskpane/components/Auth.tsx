import * as React from "react";
import { Form, Input, Button, Spin } from "antd";
import { getContacts } from "../services/contactService";
/* global Spinner */

export interface AuthProps {

}

export interface AuthState {
  inProgress: boolean;
}

export default class Auth extends React.Component<AuthProps, AuthState> {

  constructor(props, {}) {
    super(props, {});

    this.state = {
      inProgress: false
    };
  }
  openSignUp = () => {
    window.open("https://app.recruitcrm.io/signup", "_blank");
  };

  render() {

    const onFinish = async values => {
      console.log("Success:", values);
      this.setState({ inProgress: true });
      let response = await getContacts(values.apiKey);
      if (response) {
        Office.context.roamingSettings.set("keyRecruitCRM", values.apiKey);
        Office.context.roamingSettings.saveAsync((_asyncResult: Office.AsyncResult<void>) => {
          window.location.reload(false);
        });
      } else {
        this.setState({ inProgress: false });
      }
    };

    const onFinishFailed = errorInfo => {
      console.log("Failed:", errorInfo);
    };

    return (
      <div className="recruit-crm-container">
        <img src={window.location.origin + '/assets/logo-recruitcrm.svg'} alt="Banner" 
        style={{width: '60%', marginLeft: 'auto', marginRight: 'auto', paddingTop: "30%", display: "block"}}/>
        {!this.state.inProgress ? (
          <div>
            <Form name="basic" onFinish={onFinish} onFinishFailed={onFinishFailed}>
              <Form.Item
                label="API Key"
                name="apiKey"
                rules={[{ required: true, message: "Please input your API Key!" }]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item>
                <Button htmlType="submit" size="large" block style={{ backgroundColor: "#47BB7F", color: "white" }}>
                  Connect to Recruit CRM
                </Button>
              </Form.Item>
            </Form>
            <div style={{ textAlign: "center" }}>
              Don't have an account? <br />
              Create an account
              <Button type="link" onClick={this.openSignUp}>
                here
              </Button>
            </div>
          </div>
        ) : (
          <div className="centered">
            <Spin />
          </div>
        )}
      </div>
    );
  }
}
