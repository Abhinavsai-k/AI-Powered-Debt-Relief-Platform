import API from "./api";

export const getProfiles = async () => {
  const res = await API.get("/financial-profile/");
  return res.data;
};

export const createProfile = async (profile) => {
  const res = await API.post("/financial-profile/", profile);
  return res.data;
};

export const updateProfile = async (profile) => {
  const res = await API.put("/financial-profile/", profile);
  return res.data;
};

export const deleteProfile = async () => {
  const res = await API.delete("/financial-profile/");
  return res.data;
};