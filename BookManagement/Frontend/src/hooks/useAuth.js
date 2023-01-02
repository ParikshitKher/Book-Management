import { useState } from "react";

function useAuth(initialValue) {
  const [isAuth, setIsAuth] = useState(initialValue);
  const login = () => {
    setIsAuth(true);
  };
  const logout = () => {
    setIsAuth(false);
  };
  return [isAuth, login, logout];
}

export default useAuth;
