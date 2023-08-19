import {
  Alert,
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useContext } from "../hooks";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import Presets from "./presets";
import { githubDark } from "@uiw/codemirror-theme-github";
import Commands from "./commands";

const Prompt = () => {
  const { setPrompt, prompt, label, setLanguage } = useContext();
  return (
    <Box>
      <Presets />
      <TextField
        fullWidth
        variant="outlined"
        value={prompt}
        multiline
        rows={2} // specify the number of rows
        onChange={(e) => setPrompt(e.target.value)}
        label="Prompt"
        placeholder="Press ENTER to send prompt"
        style={{ margin: "16px 0 " }}
        inputProps={{
          maxLength: 5000, // limiting message length to 1000 characters, can adjust as needed
        }}
      />
      <Commands />

      {label !== "" && (
        <Alert severity="info" sx={{ mt: 2 }}>
          <Typography>{label}</Typography>
        </Alert>
      )}
    </Box>
  );
};

export default Prompt;
