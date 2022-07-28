import React, { createContext, useState } from "react";
import { user } from "types/user.interface";

export const UserContext = createContext<user>({
  email: "",
  username: "",
  image: "",
  token: "",
});

export const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState({});
  return (
    <UserContext.Provider value={[user, setUser] as any}>
      {children}
    </UserContext.Provider>
  );
};
