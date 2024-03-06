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
    <div>
      <Presets />
      <Textarea
        rows={2} // specify the number of rows
        onChange={(e) =>
          setMessage(e.target.value)
        }
        placeholder="Tell me a joke"
        style={{ margin: "16px 0 " }}
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
      <Alert className="mt-4">
        <RocketIcon />
        <AlertDescription>
          {progress || "Ready!"}
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default Prompt;
