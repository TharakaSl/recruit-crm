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
