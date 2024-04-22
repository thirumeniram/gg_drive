

import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contextApi/Auth";

export default function PrivateRoute({ children, ...rest }) {
  const { currentUser } = useAuth();

  if (currentUser) {
    return <>{children}</>;
  } else {
    return <Navigate to="/login" />;
  }
}
