import * as React from "react";
import { Button, Form, Input, Spin, Alert } from "antd";
import Header from "./Header";
import { FormInstance } from "antd/lib/form";
import ReactDOM from "react-dom";
import Initial from "./Initial";
import { addCompany, updateCompany } from "../services/companyService";
import { CompanyData } from "../models/COmpany";

export interface AddEditCompanyProps {
  isAddNew: boolean;
  companyData: CompanyData;
  // searchResult: Candidate;
}

export interface AddEditCompanyState {
  inProgress: boolean;
  isError: boolean;
}

class AddEditCompany extends React.Component<AddEditCompanyProps, AddEditCompanyState> {
  formRef = React.createRef<FormInstance>();
  constructor(props, {}) {
    super(props, {});

    this.state = {
      inProgress: false,
      isError: false
    };
  }

  componentDidMount() {
    if (!this.props.isAddNew) {
      this.formRef.current.setFieldsValue({
        companyName: this.props.companyData.company_name,
        website: this.props.companyData.website
      });
    }
  }

  render() {
    const onFinish = async values => {
      console.log("Success:", values);
      this.setState({ inProgress: true });
      let companyObj = {
        company_name: values.companyName,
        website: values.website,
        contact_number: values.telePhone
      };
      try {
        const authKey = Office.context.roamingSettings.get("keyRecruitCRM");
        if (this.props.isAddNew) {
          let response = await addCompany(companyObj, authKey);
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
          let response = await updateCompany(this.props.companyData.slug, companyObj, authKey);
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
        <Header head="Company"/>
        {this.state.isError && (
          <div>
            <Alert message="Error in add contact" type="error" showIcon style={{ marginTop: "5px" }} />
          </div>
        )}
        {!this.state.inProgress ? (
          <div className="recruit-crm-container">
            <Form name="basic" onFinish={onFinish} onFinishFailed={onFinishFailed} ref={this.formRef}>
              <Form.Item name="companyName" rules={[{ required: true, message: "Please add company name" }, {min: 3, message: 'Company name must be minimum 3 characters.'}]}>
                <Input placeholder="Company Name" />
              </Form.Item>
              <Form.Item
                name="website"
                rules={[
                  { type: "url", message: "Please enter valid url" }
                ]}
              >
                <Input placeholder="Website" />
              </Form.Item>
              <Form.Item
                name="telePhone"
              >
                <Input placeholder="Telephone" type="number"/>
              </Form.Item>
              <Form.Item>
                <Button htmlType="submit" size="large" block style={{ backgroundColor: "#47BB7F", color: "white" }}>
                  {this.props.isAddNew ? "Add Company" : "Update Company"}
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

export default AddEditCompany;
