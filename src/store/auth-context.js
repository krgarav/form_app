import React, { useState,useEffect } from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin:(email,password)=>{}
});
export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const userToken = localStorage.getItem("user");
  useEffect(() => {
    if (userToken === "1") {
      setIsLoggedIn(true);
    }
  }, []);
 
  
  
  const loginHandler = (email, password) => {
    localStorage.setItem("user", "1");
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
  };
  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, onLogout: logoutHandler ,onLogin:loginHandler}}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
