import React, { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Navbar from "./components/navbar/Navbar";
import HomePage from "./pages/HomePage/HomePage";
import UsersPage from "./pages/UsersPage/UsersPage";
import BadgesPage from "./pages/BadgesPage/BadgesPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import { UserPage } from "./pages/UserPage/UserPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import { AUTH_TOKEN } from "./util/constants";
import { getDataFromTokenModel } from "./util/token";

function App() {
  const [role, setRole] = useState<Role | null>(getDataFromTokenModel("role") as Role);
  const [token, setToken] = useState<string | null>(localStorage.getItem(AUTH_TOKEN));

  const login = (token: string) => {
    localStorage.setItem(AUTH_TOKEN, token);
    setToken(token);
    setRole(getDataFromTokenModel("role") as Role);
  }

  const logout = () => {
    localStorage.removeItem(AUTH_TOKEN);
    setToken(null);
    setRole(null);
  }

  const userRouteElement = role === "ADMIN" ? <UserPage /> : <Navigate to="/home" />;

  return (
    <div className="App">
      <header className="App-header">
        <Navbar logout={logout} isLoggedIn={!!token}/>
      </header>
      <Routes>
        {token ? <>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="home" element={<HomePage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="user" element={userRouteElement} />
          <Route path="user/:id" element={userRouteElement} />
          <Route path="badges" element={<BadgesPage />} />

          <Route path="/login" element={<Navigate to="/home" />} />
        </> : <>
          <Route path="login" element={<LoginPage login={login} />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </>}
      </Routes>
    </div>
  );
}

export default App;
