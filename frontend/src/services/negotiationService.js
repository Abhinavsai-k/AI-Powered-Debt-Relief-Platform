import api from "./api";

// ======================================
// Generate AI Negotiation Strategy
// ======================================

export const generateStrategy = async (userId, loanId) => {
  const response = await api.post("/ai-negotiation/generate", {
    user_id: Number(userId),
    loan_id: Number(loanId),
  });

  return response.data;
};

// ======================================
// Generate AI Settlement Letter
// ======================================

export const generateLetter = async (lender) => {
  const response = await api.post(
    `/ai-negotiation/letter?lender=${encodeURIComponent(lender)}`
  );

  return response.data;
};