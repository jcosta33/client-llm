"use client";

import { Button } from "@/components/ui/button";
import { PaperPlaneIcon, StopIcon, ReloadIcon } from '@radix-ui/react-icons';
import { useContext } from "react";
import { Context } from "../context";

const Commands = () => {
  const {
    messages,
    chatLoading,
    setMessage,
    message,
    stop,
    sendMessage,
  } = useContext(Context);

  return (
    <div className="grid grid-cols-6">
      <div className="grid grid-cols-subgrid gap-1 col-span-3">
        <Button
          onClick={sendMessage}
          disabled={chatLoading}
        >
          <PaperPlaneIcon className="h-4 w-4" />
          Send
        </Button>

        <Button
          disabled={chatLoading}
          variant="destructive"
          onClick={() => stop()}
        >
          <StopIcon className="h-4 w-4" />
          Stop
        </Button>
        <Button
          disabled={message === ""}
          variant="ghost"
          onClick={() => setMessage("")}
        >
          Clear
        </Button>
      </div>
      {messages.length > 0 && (
        <div className="">
          <Button
            size="icon"
            color="info"
            onClick={() => sendMessage()}
          >
            <ReloadIcon className="h-4 w-4" />
            Redo
          </Button>

          <Button
            color="info"
            onClick={() => sendMessage()}
          >
            Are You Sure?
          </Button>
        </div>
      )}
    </div>
  );
};

export default Commands;
