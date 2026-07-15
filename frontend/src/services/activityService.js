import api from "./api";

export const getActivities = async () => {
  const response = await api.get("/activity/");
  return response.data;
};

export const addActivity = async (activity) => {
  const response = await api.post("/activity/", activity);
  return response.data;
};