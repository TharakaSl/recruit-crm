import * as React from "react";
import { Button, Form, Input, Select, Spin, Alert, Divider, Collapse, Avatar } from "antd";
import Header from "./Header";
import { FormInstance } from "antd/lib/form";
import { addContact, updateContact } from "../services/contactService";
import { getCompanies } from "../services/companyService";
import Initial from "./Initial";
import ReactDOM from "react-dom";
import { ContactData } from "../models/Contact";
import { Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";

const { Title } = Typography;
const { Panel } = Collapse;
const { Option } = Select;

export interface AddEditContactProps {
  senderName: string;
  senderEmail: string;
  isAddNew: boolean;
  searchResult: ContactData;
}

export interface AddEditContactState {
  inProgress: boolean;
  isError: boolean;
  companies: any[];
}

class AddEditContact extends React.Component<AddEditContactProps, AddEditContactState> {
  formRef = React.createRef<FormInstance>();

  constructor(props, {}) {
    super(props, {});

    this.state = {
      inProgress: false,
      isError: false,
      companies: []
    };
  }

  async componentDidMount() {
    const authKey = Office.context.roamingSettings.get("keyRecruitCRM");
    let result = await getCompanies(authKey);
    if (result) {
      let noteTypes = [];
      result.data.forEach(c => {
        noteTypes.push({
          key: c.slug,
          text: c.company_name
        });
      });
      this.setState({ companies: noteTypes });
    }
    if (this.props.isAddNew) {
      this.formRef.current.setFieldsValue({
        firstName: this.props.senderName,
        email: this.props.senderEmail
      });
    } else {
      this.formRef.current.setFieldsValue({
        firstName: this.props.searchResult.first_name,
        lastName: this.props.searchResult.last_name,
        email: this.props.searchResult.email,
        phoneNumber: this.props.searchResult.contact_number,
        title: this.props.searchResult.designation,
        companyName: this.props.searchResult.company_slug
      });
    }
  }

  render() {
    const onFinish = async values => {
      console.log("Success:", values);
      this.setState({ inProgress: true });
      let contactObj = {
        first_name: values.firstName,
        last_name: values.lastName,
        email: values.email,
        contact_number: values.phoneNumber,
        company_slug: values.companyName,
        designation: values.title
      };
      try {
        const authKey = Office.context.roamingSettings.get("keyRecruitCRM");
        if (this.props.isAddNew) {
          let response = await addContact(contactObj, authKey);
          if (response) {
            this.setState({ inProgress: false, isError: false });
            ReactDOM.render(
              <Initial title="Recruit CRM Add in" keyVal={new Date().getTime().toString()} />,
              document.getElementById("container")
            );
          } else {
            this.setState({ inProgress: false, isError: true });
          }
        } else {
          let response = await updateContact(this.props.searchResult.slug, contactObj, authKey);
          if (response) {
            this.setState({ inProgress: false, isError: false });
            ReactDOM.render(
              <Initial title="Recruit CRM Add in" keyVal={new Date().getTime().toString()} />,
              document.getElementById("container")
            );
          } else {
            this.setState({ inProgress: false, isError: true });
          }
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
        <Header head={this.props.senderEmail} />
        {this.state.isError && (
          <div>
            <Alert message="Error in add contact" type="error" showIcon style={{ marginTop: "5px" }} />
          </div>
        )}
        {!this.state.inProgress ? (
          <div className="recruit-crm-container">
            <div style={{ justifyContent: "center", alignItems: "center", display: "flex", marginBottom: "5px"  }}>
              {this.props.searchResult.avatar ? (
                <Avatar src={this.props.searchResult.avatar} size={64} icon={<UserOutlined />} />
              ) : (
                <Avatar size={64} icon={<UserOutlined />} />
              )}
            </div>
            <div style={{ justifyContent: "center", alignItems: "center", display: "flex" }}>
              <Title level={5}>{this.props.searchResult.email}</Title>
            </div>
            <div style={{ justifyContent: "center", alignItems: "center", display: "flex" }}>
              <Button
                style={{ backgroundColor: "#47BB7F", color: "white" }}
                target="_blank"
                href={this.props.searchResult.resource_url}
              >
                Open in CRM
              </Button>
            </div>
            <Divider />
            <Collapse defaultActiveKey={["1"]} ghost accordion>
              <Panel header="About" key="1">
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
                    <Select placeholder="Select Company" allowClear>
                      {this.state.companies.map((item, index) => {
                        return (
                          <Option value={item.key} key={index}>
                            {item.text}
                          </Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                  <Form.Item>
                    <Button htmlType="submit" size="large" block style={{ backgroundColor: "#47BB7F", color: "white" }}>
                      {this.props.isAddNew ? "Add Contact" : "Update Contact"}
                    </Button>
                  </Form.Item>
                </Form>
              </Panel>
            </Collapse>
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

export default AddEditContact;
