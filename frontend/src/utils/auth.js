// ==========================================
// Authentication Helper
// ==========================================

// Get logged-in user
export function getCurrentUser() {
  const user = localStorage.getItem("user");

  if (!user) return null;

  return JSON.parse(user);
}

// Get logged-in user's ID
export function getCurrentUserId() {
  const user = getCurrentUser();

  return user ? user.id : null;
}

// Get logged-in user's name
export function getCurrentUserName() {
  const user = getCurrentUser();

  return user ? user.name : "Guest";
}

// Check login status
export function isLoggedIn() {
  return !!localStorage.getItem("token");
}

// Logout user
export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}