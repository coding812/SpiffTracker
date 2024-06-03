import React from "react";
import { Route, Navigate } from "react-router-dom";

const Protected = ({ element, ...rest }) => {
  const isAuthenticated = localStorage.getItem("companyId") !== "";

  return isAuthenticated ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default Protected;