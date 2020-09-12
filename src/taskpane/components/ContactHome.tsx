import * as React from "react";
import { Card, Button, Divider, Space } from "antd";
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
      avatarImg: "https://outlook.office.com/owa/service.svc/s/GetPersonaPhoto?email=" + this.props.senderEmail
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
        {Object.entries(this.props.searchResult).length !== 0 ? (
          <div>
            {this.props.searchResult.data.map((item, index) => {
              return (
                <Space direction="vertical" style={{ width: "100%" }} key={index}>
                  <Card title="Contact Profile">
                    <Meta
                      title={this.props.senderName}
                      description={this.props.senderEmail}
                      // avatar={<Avatar src={this.state.avatarImg} size="large"/>}
                    />
                    <Divider />
                    <div style={{ justifyContent: "center", alignItems: "center", display: "flex" }}>
                        <Button
                          style={{ backgroundColor: "#47BB7F", color: "white", width: "60%" }}
                          target="_blank"
                          href={this.props.searchResult.data[index].resource_url}
                        >
                          Open in CRM
                        </Button>
                    </div>
                    <Divider />
                    <Button type="link" onClick={() => this.showAddEditContactView(item)}>
                      View contact
                    </Button>
                  </Card>
                </Space>
              );
            })}
          </div>
        ) : (
          <Card title="Contact Profile">
            <Meta
              title={this.props.senderName}
              description={this.props.senderEmail}
              // avatar={<Avatar src={this.state.avatarImg} size="large"/>}
            />
            <Divider />
            <div style={{ justifyContent: "center", alignItems: "center", display: "flex" }}>
              <Button
                style={{ backgroundColor: "#1574dc", color: "white" }}
                onClick={() => this.showAddEditContactView(null)}
              >
                Add to RecruitCRM
              </Button>
            </div>
          </Card>
        )}
      </div>
    );
  }

  showAddEditContactView = searchItem => {
    ReactDOM.render(
      <AddEditContact
        senderEmail={this.props.senderEmail}
        senderName={this.props.senderName}
        isAddNew={this.state.isAddNew}
        searchResult={searchItem}
      />,
      document.getElementById("container")
    );
  };
}

export default ContactHome;
