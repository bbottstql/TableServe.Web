import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStaffContext } from "./App";

function IndexPage() {
  const navigate = useNavigate();
  const { staff } = useStaffContext();
  useEffect(() => {
    if (!staff) navigate("/signin");
    else navigate("/orders");
  }, []);
  return null;
}

export default IndexPage;