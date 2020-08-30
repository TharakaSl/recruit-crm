import axioConnectorInstance from "./axioConnectorInstance";

export const searchCandidate = async (email, apiKey) => {
  try {
    const res = await axioConnectorInstance.get("/candidates/search?email=" + email, {
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

export const addCandidate = async (_data, apiKey) => {
  try {
    const res = await axioConnectorInstance.post("/candidates", _data, {
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