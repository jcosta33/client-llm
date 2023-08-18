import {
  Box,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useContext } from "../hooks";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import Presets from "./presets";
import Contexts from "./contexts";
import { githubDark } from "@uiw/codemirror-theme-github";
import Commands from "./commands";
import { codeString } from "../exampleCode";
import { programmingLanguages } from "../consts";

const Prompt = () => {
  const {
    setPrompt,
    sendMessage,
    prompt,
    context,
    setContext,
    setSource,
    language,
    setLanguage,
  } = useContext();
  return (
    <Box>
      <FormControl fullWidth variant="outlined">
        <InputLabel id="language-label">Programming Language</InputLabel>
        <Select
          labelId="language-label"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          label="Programming Language"
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
        style={{ margin: " 16px 0" }}
        inputProps={{
          maxLength: 1000, // limiting message length to 1000 characters, can adjust as needed
        }}
      />
      <Contexts />

      <CodeMirror
        extensions={[javascript({ jsx: true })]}
        onChange={(value) => setSource(value)}
        theme={githubDark}
        placeholder={codeString}
        maxHeight="60vh"
        style={{ margin: " 16px 0", fontSize: "12px" }}
      />

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
        style={{ margin: "32px 0 " }}
        onKeyPress={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
          }
        }}
        inputProps={{
          maxLength: 5000, // limiting message length to 1000 characters, can adjust as needed
        }}
      />
      <Commands />
    </Box>
  );
};

export default Prompt;
