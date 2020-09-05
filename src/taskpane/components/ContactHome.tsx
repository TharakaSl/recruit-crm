import * as React from "react";
import { Card, Button, Divider } from "antd";
import Meta from "antd/lib/card/Meta";
import ReactDOM from "react-dom";
import AddEditContact from "./AddEditContact";
import { Contact } from "../models/Contact";
export interface ContactHomeProps {
  senderName: string;
  senderEmail: string;
  searchResult: Contact;
}

export interface ContactHomeState {
  isAddNew: boolean;
  avatarImg: string;
}

class ContactHome extends React.Component<ContactHomeProps, ContactHomeState> {
  constructor(props, {}) {
    super(props, {});

    this.state = {
      isAddNew: true,
      avatarImg: "https://outlook.office.com/owa/service.svc/s/GetPersonaPhoto?email="+this.props.senderEmail
    };
  }

  async componentDidMount() {
    if (this.props.searchResult.data) {
      this.setState({ isAddNew: false });
    } else {
      this.setState({ isAddNew: true });
    }
  }

  render() {
    return (
      <div>
        <Card title="Contact Profile">
          <Meta
            title={this.props.senderName}
            description={this.props.senderEmail}
            // avatar={<Avatar src={this.state.avatarImg} size="large"/>}
          />
          <Divider />
          <div style={{ justifyContent: "center", alignItems: "center", display: "flex" }}>
            {!this.props.searchResult.data ? (
              <Button style={{ backgroundColor: "#47BB7F", color: "white" }} onClick={this.showAddEditContactView}>
                Add to RecruitCRM
              </Button>
            ) : (
              <div>
                <Button style={{ backgroundColor: "#47BB7F", color: "white" }} onClick={this.showAddEditContactView}>
                  Edit in RecruitCRM
                </Button>
                <br></br>
                <Button type="link" target="_blank" href={this.props.searchResult.data[0].resource_url}>
                  View in Recruit CRM
                </Button>
              </div>
            )}
          </div>
        </Card>
      </div>
    );
  }

  showAddEditContactView = () => {
    ReactDOM.render(
      <AddEditContact
        senderEmail={this.props.senderEmail}
        senderName={this.props.senderName}
        isAddNew={this.state.isAddNew}
        searchResult={this.props.searchResult}
      />,
      document.getElementById("container")
    );
  };
}

export default ContactHome;
