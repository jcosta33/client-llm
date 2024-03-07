"use client";
import { Skeleton } from "@/components/ui/skeleton"
import { Context } from "../context";
import { useContext } from "react";

const Loader = () => {
  const { chatLoading } = useContext(Context);
  if (!chatLoading) return null;
  return (
    <>
      <Skeleton
        className="w-full h-4 mb-2"
      />
      <Skeleton
        className="w-4/5 h-4 mb-2"
      />

    </>
  );
};

export default Loader;
