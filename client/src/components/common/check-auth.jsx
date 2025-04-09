import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();

  // Redirect to login if unauthenticated and not on /login or /register
  if (
    !isAuthenticated &&
    !(
      location.pathname.includes("/login") ||
      location.pathname.includes("/register")
    )
  ) {
    return <Navigate to="/auth/login" replace />;
  }

  // Redirect to event/home if authenticated and trying to access /login or /register
  if (
    isAuthenticated &&
    (location.pathname.includes("/login") || location.pathname.includes("/register"))
  ) {
    return <Navigate to="/event/home" replace />;
  }

  // Redirect root path based on auth
  if (location.pathname === "/") {
    return isAuthenticated ? (
      <Navigate to="/event/home" replace />
    ) : (
      <Navigate to="/auth/login" replace />
    );
  }

  // Allow access to children if none of the above conditions matched
  return <>{children}</>;
}

export default CheckAuth;
