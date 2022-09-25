import { Route, Redirect } from "react-router-dom";
import React from "react";

export default function ProtectedRoute({ component: Component, ...props }) {
  const token = localStorage.getItem('jwt');

  return (
    <Route>
      {
        () => (token) ? <Component {...props} /> : <Redirect to="/" />
      }
    </Route>
  )
}
