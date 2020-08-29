import * as React from "react";
import { Button, Form, Input, Select } from "antd";
import Header from "./Header";
import { FormInstance } from "antd/lib/form";
import { addContact } from "../services/contactService";
import { getCompanies } from "../services/companyService";

const { Option } = Select;

export interface AddEditContactProps {
  senderName: string;
  senderEmail: string;
}

export interface AddEditContactState {
  inProgress: boolean;
  companies: any[];
}

class AddEditContact extends React.Component<AddEditContactProps, AddEditContactState> {
  formRef = React.createRef<FormInstance>();

  constructor(props, {}) {
    super(props, {});

    this.state = {
      inProgress: false,
      companies: []
    };
  }

  async componentDidMount() {
    this.formRef.current.setFieldsValue({
      firstName: this.props.senderName,
      email: this.props.senderEmail
    });
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
        let response = await addContact(contactObj, authKey);
        if (response) {
          this.setState({ inProgress: false });
        } else {
          this.setState({ inProgress: false });
        }
      } catch (error) {
        this.setState({ inProgress: false });
      }
    };

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
                Add Contact
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }

  onDisconnect = () => {};
}

export default AddEditContact;
