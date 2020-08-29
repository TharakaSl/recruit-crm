import * as React from "react";
import { Card, Button, Divider } from "antd";
import Meta from "antd/lib/card/Meta";
import ReactDOM from "react-dom";
import AddEditContact from "./AddEditContact";
export interface ContactHomeProps {
  senderName: string;
  senderEmail: string;
  searchResult: any[];
}

export interface ContactHomeState {}

class ContactHome extends React.Component<ContactHomeProps, ContactHomeState> {
  constructor(props, {}) {
    super(props, {});

    this.state = {};
  }

  async componentDidMount() {
    
  }

  render() {
    return (
      <div>
        <Card title="Contact Profile">
          <Meta title={this.props.senderName} description={this.props.senderEmail} />
          <Divider />
          <div style={{ justifyContent: "center", alignItems: "center", display: "flex" }}>
          <Button style={{ backgroundColor: "#47BB7F", color: "white" }} onClick={this.showAddEditContactView}>Add to RecruitCRM</Button>
          </div>
        </Card>
      </div>
    );
  }

  showAddEditContactView = () => {
    ReactDOM.render(<AddEditContact senderEmail={this.props.senderEmail} senderName={this.props.senderName}/>, document.getElementById("container"));
  };
}

export default ContactHome;
