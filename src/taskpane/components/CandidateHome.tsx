import * as React from "react";
import { Card, Button, Divider } from "antd";
import Meta from "antd/lib/card/Meta";
import ReactDOM from "react-dom";
import AddEditCandidate from "./AddEditCandidate";
import { Candidate } from "../models/Candidate";
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
    if(this.props.searchResult.data) {
     this.setState({isAddNew: false});
    }
    else {
      this.setState({isAddNew: true});
    }
  }

  render() {
    return (
      <div>
        <Card title="Candidate Profile">
          <Meta title={this.props.senderName} description={this.props.senderEmail} />
          <Divider />
          <div style={{ justifyContent: "center", alignItems: "center", display: "flex" }}>
            {!this.props.searchResult.data ? (
              <Button style={{ backgroundColor: "#47BB7F", color: "white" }} onClick={this.showAddEditCandidateView}>
                Add to RecruitCRM
              </Button>
            ) : (
              <div>
                <Button style={{ backgroundColor: "#47BB7F", color: "white" }} onClick={this.showAddEditCandidateView}>
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

  showAddEditCandidateView = () => {
    ReactDOM.render(
      <AddEditCandidate senderEmail={this.props.senderEmail} senderName={this.props.senderName} isAddNew={this.state.isAddNew}/>,
      document.getElementById("container")
    );
  };
}

export default CandidateHome;
