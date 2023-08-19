import { ButtonGroup, Button, Box } from "@mui/material";
import { useContext } from "../hooks";
import StopIcon from "@mui/icons-material/Stop"; // For "Stop Generation"
import ReplayIcon from "@mui/icons-material/Replay"; // For "Redo"
import HelpOutlineIcon from "@mui/icons-material/HelpOutline"; // For "Are you sure?"
import SendIcon from "@mui/icons-material/Send"; // For "Are you sure?"
import ClearIcon from "@mui/icons-material/Clear"; // For "Are you sure?"

const Commands = () => {
  const {
    messages,
    chatLoaded,
    sendCommand,
    setPrompt,
    stop,
    prompt,
    sendMessage,
  } = useContext();

  return (
    <Box display="flex" justifyContent="space-between">
      <Box>
        <Button
          startIcon={<SendIcon />}
          color="success"
          onClick={sendMessage}
          disabled={!chatLoaded}
        >
          Send
        </Button>

        <Button
          disabled={!chatLoaded}
          startIcon={<StopIcon />}
          color="warning"
          onClick={() => stop()}
        >
          Stop
        </Button>
        <Button
          disabled={prompt === ""}
          startIcon={<ClearIcon />}
          color="primary"
          onClick={() => setPrompt("")}
        >
          Clear
        </Button>
      </Box>
      {messages.length > 0 && (
        <Box>
          <Button
            startIcon={<ReplayIcon />}
            color="info"
            onClick={() => sendCommand("Please redo the previous task.")}
          >
            Redo
          </Button>

          <Button
            startIcon={<HelpOutlineIcon />}
            color="info"
            onClick={() => sendCommand("Are you sure about that?")}
          >
            Are You Sure?
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Commands;
