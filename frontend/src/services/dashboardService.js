import API from "./api";

export const getDashboardData = async () => {
  const response = await API.post("/financial-engine/analyze");
  return response.data;
};