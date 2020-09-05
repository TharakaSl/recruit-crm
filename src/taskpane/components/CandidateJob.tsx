import * as React from "react";
import { Button, Spin, Form, Select, Divider } from "antd";
import { Candidate } from "../models/Candidate";
import { getCandidatesJobs, getJobsInfo } from "../services/linkedJobs";
import { FormInstance } from "antd/lib/form";
import { searchJobs } from "../services/jobsService";
const FormItem = Form.Item;
const { Option } = Select;

export interface CandidateJobProps {
  searchResult: Candidate;
}

export interface CandidateJobState {
  linkedJobs: any[];
  inProgress: boolean;
  jobs: any[];
}

class CandidateJob extends React.Component<CandidateJobProps, CandidateJobState> {
  formRef = React.createRef<FormInstance>();
  constructor(props, {}) {
    super(props, {});

    this.state = {
      linkedJobs: [],
      inProgress: false,
      jobs: []
    };
  }

  async componentDidMount() {
    this.setState({ inProgress: true });
    const candidateId = this.props.searchResult.data[0].slug;
    const authKey = Office.context.roamingSettings.get("keyRecruitCRM");
    const candidateJobResult = await getCandidatesJobs(authKey, candidateId);
    if (candidateJobResult) {
      var jobs = [];
      if (Array.isArray(candidateJobResult)) {
        candidateJobResult.map(async (item, _index) => {
          const jobResult = await getJobsInfo(authKey, item.job_slug);
          if (jobResult) {
            jobs.push({
              status: item.status.label,
              job: jobResult.name,
              url: jobResult.resource_url
            });
          }
          this.setState({ linkedJobs: jobs, inProgress: false });
          console.log(jobResult);
        });
      }
      this.setState({ inProgress: false });
    }
    this.setState({ inProgress: false });
  }

  render() {
    const onJobSearch = async values => {
      console.log(values);
      const authKey = Office.context.roamingSettings.get("keyRecruitCRM");
      const result = await searchJobs(values, authKey);
      if (result) {
        this.setState({ jobs: result.data });
        console.log("jobs: " + result.data);
      }
    };

    const onFinish = async values => {
      console.log(values);
    };

    const fail = async values => {
      console.log(values);
    };

    return (
      <div>
        <div>
          <Divider>Assign Jobs</Divider>
          <div>
            <Form onFinish={onFinish} ref={this.formRef} onFinishFailed={fail}>
              <Form.Item name="selectJob" rules={[{ required: true, message: "Job is required" }]}>
                <Select
                  showSearch
                  style={{ width: 200 }}
                  placeholder="Search and select jobs by name"
                  optionFilterProp="children"
                  onChange={onJobSearch}
                  filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                  {this.state.jobs.map((item, index) => {
                    return (
                      <Option value={item.slug} key={index}>
                        {item.name}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
              <FormItem>
                <div style={{ justifyContent: "center", alignItems: "center", display: "flex" }}>
                  <Button htmlType="submit" style={{ backgroundColor: "#47BB7F", color: "white", width: "68%" }}>
                    Assign
                  </Button>
                </div>
              </FormItem>
            </Form>
          </div>
        </div>
        {!this.state.inProgress ? (
          <div>
            <Divider>Linked Jobs</Divider>
            {this.state.linkedJobs.length > 0 ? (
              <div>
                {this.state.linkedJobs.map((item, _index) => {
                  return (
                    <Button type="link" target="_blank" href={item.url} key={_index}>
                      {item.job} - {item.status}
                    </Button>
                  );
                })}
              </div>
            ) : (
              <div>No Job assigned yet</div>
            )}
          </div>
        ) : (
          <div className="centered">
            <Spin />
          </div>
        )}
      </div>
    );
  }
}

export default CandidateJob;
