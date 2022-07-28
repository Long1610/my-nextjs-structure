const getLocalRefreshToken = () => {
  const user = JSON.parse(localStorage.getItem("user") || "");
  return user?.refreshToken;
};

const getLocalAccessToken = () => {
  const user = JSON.parse(localStorage.getItem("user") || "");
  return user?.accessToken;
};

const updateLocalAccessToken = (token: string) => {
  let user = JSON.parse(localStorage.getItem("user") || "");
  user.accessToken = token;
  localStorage.setItem("user", JSON.stringify(user));
};

const getUser = () => {
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem("accessToken") as any);
  }
};

const setUser = (token: any) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("accessToken", JSON.stringify(token));
  }
};

const removeUser = () => {
  localStorage.removeItem("accessToken");
};

const TokenService = {
  getLocalRefreshToken,
  getLocalAccessToken,
  updateLocalAccessToken,
  getUser,
  setUser,
  removeUser,
};

export default TokenService;
