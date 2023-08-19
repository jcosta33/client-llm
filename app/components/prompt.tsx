import { Alert, Box, TextField, Typography } from "@mui/material";
import { useContext } from "../hooks";
import Presets from "./presets";
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
      <Alert severity="info" sx={{ mt: 1 }}>
        <Typography>{label || "Ready"}</Typography>
      </Alert>
    </Box>
  );
};

export default Prompt;
