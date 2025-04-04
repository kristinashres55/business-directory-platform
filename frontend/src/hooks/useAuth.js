export const useAuth = () => {
  const token = localStorage.getItem("token") || null;
  let user = null;

  try {
    const userData = localStorage.getItem("user");
    user = userData ? JSON.parse(userData) : null;
  } catch (err) {
    console.error("Error parsing user from localStorage:", err);
  }

  return { token, user };
};

export const logout = () => {
  localStorage.clear();
  window.location.href = "/login";
};
