import API from "./api";

export const getUsers = async () => {
  const response = await API.get("/users/");
  return response.data;
};

export const createUser = async (user) => {
  const response = await API.post("/users/", user);
  return response.data;
};

export const updateUser = async (id, user) => {
  const response = await API.put(`/users/${id}`, user);
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await API.delete(`/users/${id}`);
  return response.data;
};