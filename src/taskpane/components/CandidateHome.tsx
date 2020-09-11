import * as React from "react";
import { Card, Button, Divider, Space } from "antd";
import Meta from "antd/lib/card/Meta";
import ReactDOM from "react-dom";
import AddEditCandidate from "./AddEditCandidate";
import { Candidate } from "../models/Candidate";
import CandidateJob from "./CandidateJob";
export interface CandidateHomeProps {
  senderName: string;
  senderEmail: string;
  searchResult: Candidate;
}

export interface CandidateHomeState {
  isAddNew: boolean;
}

class CandidateHome extends React.Component<CandidateHomeProps, CandidateHomeState> {
  constructor(props, {}) {
    super(props, {});

    this.state = {
      isAddNew: true
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
                  <Card title="Candidate Profile">
                    <Meta title={this.props.senderName} description={this.props.senderEmail} />
                    <Divider />
                    <div style={{ justifyContent: "center", alignItems: "center", display: "flex" }}>
                      <div>
                        <Button
                          style={{ backgroundColor: "#47BB7F", color: "white" }}
                          onClick={() => this.showAddEditCandidateView(item)}
                        >
                          Edit in RecruitCRM
                        </Button>
                        <br></br>
                        <Button type="link" target="_blank" href={this.props.searchResult.data[index].resource_url}>
                          View in Recruit CRM
                        </Button>
                      </div>
                    </div>
                    {this.props.searchResult.data && <CandidateJob searchResult={this.props.searchResult} />}
                  </Card>
                </Space>
              );
            })}
          </div>
        ) : (
          <Card title="Candidate Profile">
            <Meta title={this.props.senderName} description={this.props.senderEmail} />
            <Divider />
            <div style={{ justifyContent: "center", alignItems: "center", display: "flex" }}>
              <Button style={{ backgroundColor: "#1574dc", color: "white" }} onClick={this.showAddEditCandidateView}>
                Add to RecruitCRM
              </Button>
            </div>
            {this.props.searchResult.data && <CandidateJob searchResult={this.props.searchResult} />}
          </Card>
        )}
      </div>
    );
  }

  showAddEditCandidateView = item => {
    ReactDOM.render(
      <AddEditCandidate
        senderEmail={this.props.senderEmail}
        senderName={this.props.senderName}
        isAddNew={this.state.isAddNew}
        searchResult={item}
      />,
      document.getElementById("container")
    );
  };
}

export default CandidateHome;
