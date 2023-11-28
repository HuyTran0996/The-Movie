import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
const PrivateRoutes = () => {
  const navigate = useNavigate();

  let auth = localStorage.getItem("token");
  console.log("AUTH", auth);
  useEffect(() => {
    if (!auth) {
      navigate(`/signIn`);
    }
  }, [auth, navigate]);
  return auth ? <Outlet /> : null;
};

export default PrivateRoutes;
