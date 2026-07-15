import API from "./api";

export const getLoans = async () => {
  const response = await API.get("/loans/");
  return response.data;
};

export const createLoan = async (loan) => {
  const response = await API.post("/loans/", loan);
  return response.data;
};

export const updateLoan = async (id, loan) => {
  const response = await API.put(`/loans/${id}`, loan);
  return response.data;
};

export const deleteLoan = async (id) => {
  const response = await API.delete(`/loans/${id}`);
  return response.data;
};