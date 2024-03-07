import { useContext } from "react";
import { Context } from "../context";
import { Button } from "@/components/ui/button";

const Presets = () => {
  const { setMessage, } = useContext(Context);

  return (
    <div className="flex space-x-2">
      <Button
        variant='outline'
        onClick={() =>
          setMessage("I have this error when running my code. Any idea what could be causing it?")
        }
      >
        <span>Debug</span>
      </Button>

      <Button
        variant='outline'
        onClick={() =>
          setMessage("Can you generate documentation for this code?")
        }
      >
        <span>Document</span>
      </Button>

      <Button
        variant='outline'
        onClick={() => setMessage("Can you explain this code?")}
      >
        <span>Explain</span>
      </Button>

      <Button
        variant='outline'
        onClick={() => setMessage("Can you write a test for this code?")}
      >
        <span>Write test</span>
      </Button>

      <Button
        variant='outline'
        onClick={() => setMessage("Can you write comments for this code?")}
      >
        <span>Comments</span>
      </Button>
    </div>

  );
};

export default Presets;
