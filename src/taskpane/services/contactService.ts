import axioConnectorInstance from "./axioConnectorInstance";

export const getContacts = async apiKey => {
  try {
    const res = await axioConnectorInstance.get("/contacts", {
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

export const addContact = async (_data, apiKey) => {
  try {
    const res = await axioConnectorInstance.post("/contacts", _data, {
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

export const updateContact = async (contactId, _data, apiKey) => {
  try {
    const res = await axioConnectorInstance.post("/contacts/" + contactId, _data, {
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
