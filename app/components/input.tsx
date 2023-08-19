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
import { codeString } from "../exampleCode";
import { programmingLanguages } from "../consts";
import Prompt from "./prompt";

const Input = () => {
  const {
    setPrompt,
    sendMessage,
    prompt,
    context,
    setContext,
    setSource,
    language,
    label,
    setLanguage,
  } = useContext();
  return (
    <Box>
      <Box display="flex" gap={2} marginBottom={2}>
        <FormControl variant="outlined" sx={{ width: 200 }}>
          <InputLabel id="language-label">Language</InputLabel>
          <Select
            labelId="language-label"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            label="Language"
          >
            {programmingLanguages.map((lang) => (
              <MenuItem key={lang.name} value={lang.name}>
                {lang.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          fullWidth
          variant="outlined"
          value={context}
          onChange={(e) => setContext(e.target.value)}
          label="Frameworks, libraries, tools"
          placeholder="e.g., React, Express, Node.js, Webpack"
          onKeyPress={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
          inputProps={{
            maxLength: 1000, // limiting message length to 1000 characters, can adjust as needed
          }}
        />
      </Box>
      <CodeMirror
        extensions={[javascript({ jsx: true })]}
        onChange={(value) => setSource(value)}
        theme={githubDark}
        placeholder={codeString}
        maxHeight="60vh"
        style={{ margin: "0 0 16px 0", fontSize: "12px" }}
      />
      <Prompt />
    </Box>
  );
};

export default Input;
