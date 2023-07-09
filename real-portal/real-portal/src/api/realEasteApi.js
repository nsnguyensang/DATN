import axios from "axios";

const BASE_URL = "http://localhost:5000";

export const searchFilterResults = async (param) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/search`, param);
    console.log("respone", response);
    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Error:", response.status);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
export const predictHouseKNN = async (param) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/predict`, param);
    console.log("respone", response);
    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Error:", response.status);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
