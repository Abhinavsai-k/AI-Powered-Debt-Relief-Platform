import API from "./api";

/**
 * Get settlement prediction for all user loans
 */
export const getSettlements = async () => {
  const response = await API.get("/settlements/predict");
  return response.data;
};

/**
 * Alias (optional)
 */
export const getSettlementPrediction = async () => {
  const response = await API.get("/settlements/predict");
  return response.data;
};