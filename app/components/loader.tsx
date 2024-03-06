"use client";
import { LinearProgress } from "@mui/material";
import { Context } from "../context";
import { useContext } from "react";

const Loader = () => {
  const { chatLoading } = useContext(Context);

  return (
    <LinearProgress
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        display: !chatLoading ? "none" : "block",
      }}
    />
  );
};

export default Loader;
