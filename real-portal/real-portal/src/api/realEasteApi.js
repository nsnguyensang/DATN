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

export const allocationByProvince = async (limit) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/allocation-by-province?limit=${limit}`
    );
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

export const allocationByProject = async (limit) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/allocation-by-project?limit=${limit}`
    );
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
export const allocationByBathroom = async (limit) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/allocation-by-bathroom?limit=${limit}`
    );
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
export const allocationByBedroom = async (limit) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/allocation-by-bedroom?limit=${limit}`
    );
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
export const allocationByFloor = async (limit) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/allocation-by-floor?limit=${limit}`
    );
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
export const scatterVisual = async (field) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/scatter-visual?field=${field}`
    );
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
