import axioConnectorInstance from "./axioConnectorInstance";

export const getContacts = async apiKey => {
  try {
    const res = await axioConnectorInstance.get("/contacts", {
      data: null,
      headers: {
        Authorization: 'Bearer ' + apiKey
      }
    });
    return res.data;
  } catch (error) {
      console.log(error);
    return error.response.data;
  }
};

export const searchContact = async (email, apiKey) => {
  try {
    const res = await axioConnectorInstance.get("/contacts/search?email=" + email, {
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
