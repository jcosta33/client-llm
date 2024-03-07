"use client";

import { Button } from "@/components/ui/button";
import { PaperPlaneIcon, StopIcon, ReloadIcon } from '@radix-ui/react-icons';
import { useContext } from "react";
import { Context } from "../context";

const Commands = () => {
  const {
    chatLoading,
    setMessage,
    message,
    stop,
    sendMessage,
  } = useContext(Context);

  return (
    <div className="grid grid-cols-12 mb-4">
      <div className="grid grid-cols-subgrid col-span-12 relative">
        <Button
          onClick={sendMessage}
          disabled={chatLoading}
          variant="outline"
        >
          <PaperPlaneIcon className="h-4 w-4 mr-1" />
          Send
        </Button>


        <Button
          disabled={message === ""}
          variant="ghost"
          onClick={() => setMessage("")}
        >
          Clear
        </Button>
        <Button
          disabled={chatLoading}
          variant="outline"
          className="min-w-0 text-red-400 hover:text-red-500 absolute right-0"
          onClick={() => stop()}
        >
          <StopIcon className="h-4 w-4" />
        </Button>
      </div>

    </div>
  );
};

export default Commands;
