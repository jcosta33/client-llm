import Presets from "./presets";
import Commands from "./commands";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RocketIcon } from "@radix-ui/react-icons";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useContext } from "react";
import { Context } from "../context";

const Prompt = () => {
  const { setMessage, message, progress, log } = useContext(Context);
  return (
    <div className="p-4">
      <Presets />
      <Textarea
        className="mt-4 mb-4"
        defaultValue={message}
        rows={3}
        onChange={(e) =>
          setMessage(e.target.value)
        }
        placeholder="Tell me a joke"
      />
      <Commands />

      {log &&
        (
          <Alert className="mt-2">
            <RocketIcon />
            <AlertDescription>
              {log}
            </AlertDescription>
          </Alert>

        )
      }
      <Alert className="mt-2">
        <RocketIcon />
        <AlertDescription>
          {progress || "Ready!"}
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default Prompt;
