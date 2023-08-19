import { LinearProgress } from "@mui/material";
import { useContext } from "../hooks";

const Loader = () => {
  const { chatLoading } = useContext();

  return <LinearProgress style={{ display: !chatLoading ? "none" : "block" }} />;
};

export default Loader;
