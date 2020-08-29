import * as React from "react";
import { Card, Button, Divider } from "antd";
import Meta from "antd/lib/card/Meta";
import ReactDOM from "react-dom";
import AddEditCandidate from "./AddEditCandidate";
export interface CandidateHomeProps {
  senderName: string;
  senderEmail: string;
  searchResult: any[];
}

export interface CandidateHomeState {}

class CandidateHome extends React.Component<CandidateHomeProps, CandidateHomeState> {
  constructor(props, {}) {
    super(props, {});

    this.state = {};
  }

  async componentDidMount() {
    
  }

  render() {
    return (
      <div>
        <Card title="Candidate Profile">
          <Meta title={this.props.senderName} description={this.props.senderEmail} />
          <Divider />
          <div style={{ justifyContent: "center", alignItems: "center", display: "flex" }}>
            <Button style={{ backgroundColor: "#47BB7F", color: "white" }} onClick={this.showAddEditCandidateView}>
              Add to RecruitCRM
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  showAddEditCandidateView = () => {
    ReactDOM.render(
      <AddEditCandidate senderEmail={this.props.senderEmail} senderName={this.props.senderName} />,
      document.getElementById("container")
    );
  };
}

export default CandidateHome;
