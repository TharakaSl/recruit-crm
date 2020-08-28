import * as React from "react";
import { Card, Avatar } from "antd";
import { EditOutlined, SettingOutlined } from "@ant-design/icons";
/* global Spinner */
const { Meta } = Card;

export interface HomeProps {}

export interface HomeState {
  senderName: string;
  senderEmail: string;
}

export default class Home extends React.Component<HomeProps, HomeState> {

  constructor(props, {}) {
    super(props, {});
    this.state = {
      senderEmail: "",
      senderName: ""
    };
  }

  componentDidMount() {
    let email = Office.context.mailbox.item.sender.emailAddress;
    let name = Office.context.mailbox.item.sender.displayName;
    this.setState({senderName: name, senderEmail: email});
  }

  render() {
    return (
      <div className="recruit-crm-container">
      <Card
        style={{ width: 300 }}
        actions={[<SettingOutlined key="setting" />, <EditOutlined key="edit" />]}
      >
        <Meta
          avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
          title="Contact"
          description={this.state.senderName}
        />
      </Card>
      </div>
    );
  }
}
