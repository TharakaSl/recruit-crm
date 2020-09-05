import axioConnectorInstance from "./axioConnectorInstance";

export const getCandidatesJobs = async (apiKey, candidateId) => {
  try {
    const res = await axioConnectorInstance.get("/candidates/" + candidateId + "/hiring-stages", {
      data: null,
      headers: {
        Authorization: "Bearer " + apiKey
      }
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};

export const getJobsInfo = async (apiKey, jobId) => {
  try {
    const res = await axioConnectorInstance.get("/jobs/" + jobId, {
      data: null,
      headers: {
        Authorization: "Bearer " + apiKey
      }
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};

export const assignJobToCandidate = async (apiKey, candidateId, jobId) => {
  try {
    const res = await axioConnectorInstance.post("/candidates/" + candidateId + "/assign?job_slug=" + jobId, null, {
      headers: {
        Authorization: "Bearer " + apiKey,
        "Content-Type": "application/json"
      }
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};
