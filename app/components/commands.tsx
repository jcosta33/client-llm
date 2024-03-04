"use client";

import { Button } from "@/components/ui/button";
import { useContext } from "../hooks";
import { PaperPlaneIcon, StopIcon, ReloadIcon } from '@radix-ui/react-icons';

const Commands = () => {
  const {
    messages,
    chatLoading,
    sendCommand,
    setMessage,
    message,
    stop,
    sendMessage,
  } = useContext();

  return (
    <div className="grid grid-cols-6">
      <div className="grid grid-cols-subgrid gap-1 col-span-3">
        <Button
          color="success"
          onClick={sendMessage}
          disabled={chatLoading}
        >
          <PaperPlaneIcon className="h-4 w-4" />
          Send
        </Button>

        <Button
          disabled={chatLoading}
          color="warning"
          onClick={() => stop()}
        >
          <StopIcon className="h-4 w-4" />
          Stop
        </Button>
        <Button
          disabled={message === ""}
          color="primary"
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
            onClick={() => sendCommand("Please redo the previous task.")}
          >
            <ReloadIcon className="h-4 w-4" />
            Redo
          </Button>

          <Button
            color="info"
            onClick={() => sendCommand("Are you sure about that?")}
          >
            Are You Sure?
          </Button>
        </div>
      )}
    </div>
  );
};

export default Commands;
