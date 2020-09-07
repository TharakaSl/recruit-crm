import * as React from "react";
import Header from "./Header";
import { Input, Button, Spin, Card, Divider } from "antd";
const { Search } = Input;
import { AppstoreAddOutlined } from "@ant-design/icons";
import ReactDOM from "react-dom";
import AddEditCompany from "./AddEditCompany";
import { searchCompany } from "../services/companyService";
import Meta from "antd/lib/card/Meta";

export interface CompanyHomeProps {}

export interface CompanyHomeState {
  inProgress: boolean;
  searchResult: any[];
  companyNotFound: boolean;
}

class CompanyHome extends React.Component<CompanyHomeProps, CompanyHomeState> {
  constructor(props, {}) {
    super(props, {});
    this.state = {
      inProgress: false,
      searchResult: [],
      companyNotFound: false
    };
  }

  async componentDidMount() {}

  render() {
    const onCompanySearch = async value => {
      console.log(value);
      this.setState({ inProgress: true, companyNotFound: false });
      const authKey = Office.context.roamingSettings.get("keyRecruitCRM");
      const searchResult = await searchCompany(value, authKey);
      if (searchResult) {
        if (searchResult.data) {
          this.setState({ searchResult: searchResult.data, inProgress: false });
        } else {
          this.setState({ searchResult: [], inProgress: false, companyNotFound: true });
        }
      } else {
        this.setState({ inProgress: false, companyNotFound: true });
      }
    };

    const addNewCompany = () => {
      ReactDOM.render(<AddEditCompany isAddNew={true} companyData={null} />, document.getElementById("container"));
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
          {this.state.inProgress && (
            <div className="centered">
              <Spin />
            </div>
          )}
          {this.state.companyNotFound && (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
              <h4>Company not found</h4>
            </div>
          )}
          {!this.state.inProgress && this.state.searchResult.map((item, index) => {
            return (
              <div style={{ marginBottom: "10px", marginTop: "10px" }}>
                <Card key={index}>
                  <Meta
                    title={item.company_name}
                    description={item.website}
                    // avatar={<Avatar src={this.state.avatarImg} size="large"/>}
                  />
                  <Divider />
                  <div style={{ justifyContent: "center", alignItems: "center", display: "flex" }}>
                    <Button style={{ backgroundColor: "#47BB7F", color: "white" }} onClick={() => this.showEditCompanyView(item)}>
                      Edit in RecruitCRM
                    </Button>
                  </div>
                  <div style={{ justifyContent: "center", alignItems: "center", display: "flex" }}>
                    <Button type="link" target="_blank" href={item.resource_url}>
                      View in Recruit CRM
                    </Button>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  showEditCompanyView = (item) => {
    ReactDOM.render(
      <AddEditCompany
        isAddNew={false}
        companyData={item}
      />,
      document.getElementById("container")
    );
  };
}

export default CompanyHome;
