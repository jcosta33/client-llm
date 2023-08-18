import { LinearProgress } from "@mui/material";
import { useContext } from "../hooks";

const Loader = () => {
  const { chatLoaded } = useContext();

  return <LinearProgress style={{ display: chatLoaded ? "none" : "block" }} />;
};

export default Loader;
