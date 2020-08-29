import axioConnectorInstance from "./axioConnectorInstance";

export const getCompanies = async (apiKey) => {
  try {
    const res = await axioConnectorInstance.get("/companies" , {
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
