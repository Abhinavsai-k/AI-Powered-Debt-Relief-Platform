import API from "./api";

export const analyzeFinancialHealth = async (data) => {
  const response = await API.post("/financial-engine/analyze", data);
  return response.data;
};