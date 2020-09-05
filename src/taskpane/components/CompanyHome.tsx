import * as React from "react";
import Header from "./Header";
import { Input, Button } from "antd";
const { Search } = Input;
import { AppstoreAddOutlined } from "@ant-design/icons";
import ReactDOM from "react-dom";
import AddEditCompany from "./AddEditCompany";

export interface CompanyHomeProps {}

export interface CompanyHomeState {}

class CompanyHome extends React.Component<CompanyHomeProps, CompanyHomeState> {
  constructor(props, {}) {
    super(props, {});
    this.state = {};
  }

  async componentDidMount() {}

  render() {
    const onCompanySearch = value => {
      console.log(value);
    };

    const addNewCompany = () => {
      ReactDOM.render(
        <AddEditCompany isAddNew={true} />,
        document.getElementById("container")
      );
    };

    return (
      <div>
        <Header head="Company" />
        <div className="recruit-crm-container">
          <div style={{ float: "right", marginBottom: "10px" }}>
            <Button
              style={{ backgroundColor: "#47BB7F", color: "white" }}
              icon={<AppstoreAddOutlined />}
              onClick={addNewCompany}
            >
              Add Company
            </Button>
          </div>
          <Search placeholder="Enter company name" onSearch={onCompanySearch} enterButton />
        </div>
      </div>
    );
  }

  showAddEditCandidateView = () => {};
}

export default CompanyHome;
