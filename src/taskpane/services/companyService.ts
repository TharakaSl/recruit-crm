import axioConnectorInstance from "./axioConnectorInstance";

export const searchCompany = async (name, apiKey) => {
  try {
    const res = await axioConnectorInstance.get("/companies/search?company_name=" + name, {
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

export const addCompany = async (_data, apiKey) => {
  try {
    const res = await axioConnectorInstance.post("/companies", _data, {
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

export const updateCompany = async (companyId, _data, apiKey) => {
  try {
    const res = await axioConnectorInstance.post("/companies/" + companyId, _data, {
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