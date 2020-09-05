import * as React from "react";
import ContactHome from "./ContactHome";
import CandidateHome from "./CandidateHome";
import { Space, Spin, Menu, Dropdown } from "antd";
import { searchContact } from "../services/contactService";
import { searchCandidate } from "../services/candidateService";
import { Candidate } from "../models/Candidate";
import { Contact } from "../models/Contact";
import * as ReactDOM from "react-dom";
import CompanyHome from "./CompanyHome";
import { ProfileOutlined } from "@ant-design/icons";
import InsertChartOutlined from '@material-ui/icons/InsertChartOutlined';
/* global Spinner */

export interface HomeProps {}

export interface HomeState {
  senderName: string;
  senderEmail: string;
  isLoading: boolean;
  contactSearchData: Contact;
  candidateSearchData: Candidate;
}

export default class Home extends React.Component<HomeProps, HomeState> {
  constructor(props, {}) {
    super(props, {});
    this.state = {
      senderEmail: "",
      senderName: "",
      isLoading: false,
      contactSearchData: {},
      candidateSearchData: {}
    };
  }

  async componentDidMount() {
    this.setState({ isLoading: true });
    let email = Office.context.mailbox.item.sender.emailAddress;
    let name = Office.context.mailbox.item.sender.displayName;
    this.setState({ senderName: name, senderEmail: email });

    const authKey = Office.context.roamingSettings.get("keyRecruitCRM");
    const candidateResult = await searchCandidate(email, authKey);
    console.log("Candidate Search" + candidateResult);

    const contactResult = await searchContact(email, authKey);
    console.log("Contact search " + contactResult);
    this.setState({ isLoading: false, candidateSearchData: candidateResult, contactSearchData: contactResult });
  }

  onShowCompany = () => {
    ReactDOM.render(<CompanyHome />, document.getElementById("container"));
  };

  
  render() {
    const menu = (
      <Menu >
        <Menu.Item key="1" onClick={this.onShowCompany} icon={<ProfileOutlined style={{color: "#36D7E3"}}/>}>
          Company
        </Menu.Item>
      </Menu>
    );

    return (
      <div className="recruit-crm-container">
        {!this.state.isLoading ? (
          <div>
            <div>
              <Dropdown.Button style={{ float: 'right' }} overlay={menu} placement="bottomLeft" icon={<InsertChartOutlined style={{color: "#BE68F0"}}/>} />
            </div>
            <Space direction="vertical" style={{ width: "100%" }}>
              <ContactHome
                senderEmail={this.state.senderEmail}
                senderName={this.state.senderName}
                searchResult={this.state.contactSearchData}
              />
              <CandidateHome
                senderEmail={this.state.senderEmail}
                senderName={this.state.senderName}
                searchResult={this.state.candidateSearchData}
              />
            </Space>
          </div>
        ) : (
          <div className="centered">
            <Spin size="small" tip="Loading..." />
          </div>
        )}
      </div>
    );
  }
}
