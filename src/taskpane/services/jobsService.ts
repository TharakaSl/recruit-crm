import axioConnectorInstance from "./axioConnectorInstance";

export const searchJobs = async (name, apiKey) => {
  try {
    const res = await axioConnectorInstance.get("/jobs/search?name=" + name, {
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
