import { useContext } from "../hooks";
import Presets from "./presets";
import Commands from "./commands";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RocketIcon } from "@radix-ui/react-icons";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Prompt = () => {
  const { setMessage, message, progress, log } = useContext();
  return (
    <div>
      <Presets />
      <Label htmlFor="message">Prompt</Label>
      <Textarea
        value={message}
        rows={2} // specify the number of rows
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Tell me a joke"
        style={{ margin: "16px 0 " }}
      />
      <Commands />


      {log &&
        (
          <Alert>
            <RocketIcon className="h-4 w-4" />
            <AlertDescription>
              {log}
            </AlertDescription>
          </Alert>

        )
      }
      <Alert >
        <RocketIcon className="h-4 w-4" />
        <AlertDescription>
          {progress || "Ready!"}
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default Prompt;
