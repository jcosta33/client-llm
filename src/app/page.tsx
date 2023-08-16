"use client";
import { useState, useCallback, useDeferredValue } from "react";

import { ChatOptions, InitProgressReport } from "@mlc-ai/web-llm";
import {
  Grid,
  Typography,
  TextField,
  Button,
  Container,
  Card,
  CardContent,
  Alert,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  LinearProgress,
} from "@mui/material";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import ReactMarkdown from "react-markdown";

import CodeIcon from "@mui/icons-material/Code";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import BugReportIcon from "@mui/icons-material/BugReport";
import UpdateIcon from "@mui/icons-material/SaveOutlined";
import ResetIcon from "@mui/icons-material/RestartAlt";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import HelpIcon from "@mui/icons-material/Help";
import TranslateIcon from "@mui/icons-material/Translate";
import { chat, chatOpts, appConfig } from "./chat";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function hasValueChanged(oldValue: number, newValue: number): boolean {
  // Convert values to strings
  const oldStr = oldValue.toString().replace(".", "");
  const newStr = newValue.toString().replace(".", "");
  console.log(oldStr);
  // Compare numbers without decimal points
  return oldStr !== newStr;
}

export default function Home() {
  const [label, setLabel] = useState("");
  const [messages, setMessages] = useState([] as string[]);
  const [prompt, setPrompt] = useState("");
  const [chatLoaded, setChatLoaded] = useState(false);
  const [chatInit, setChatInit] = useState(false);

  const [repetition_penalty, setRepetitionPenalty] = useState(
    chatOpts.repetition_penalty
  );
  const [top_p, setTopP] = useState(chatOpts.top_p);
  const [temperature, setTemperature] = useState(chatOpts.temperature);
  const [mean_gen_len, setMeanGenLen] = useState(chatOpts.mean_gen_len);
  const [shift_fill_factor, setShiftFillFactor] = useState(
    chatOpts.shift_fill_factor
  );

  const [selectedModel, setSelectedModel] = useState("vicuna-v1-7b-q4f32_0");

  const updateConfig = useCallback(() => {
    const config = {
      ...chatOpts,
      repetition_penalty,
      top_p,
      temperature,
      mean_gen_len,
      shift_fill_factor,
    };

    reload(selectedModel, config);
  }, []);

  const reset = useCallback(() => {
    setMessages([]);
    setSelectedModel("vicuna-v1-7b-q4f32_0");
    chat.resetChat();
    reload("vicuna-v1-7b-q4f32_0", chatOpts);
  }, []);

  const reload = useCallback(
    async (model: string, chatOpts: ChatOptions) => {
      setChatLoaded(false);
      // This callback allows us to report initialization progress
      try {
        await chat.reload(model, chatOpts, appConfig);
        await chat.generate(
          "Welcome me into your office as if you're Saul Goodman. Be extra sassy.",
          (_step, message) => {
            setMessages([message]);
          }
        );
      } catch (err: unknown) {
        setLabel("Init error, " + (err?.toString() ?? ""));
        console.log(err);
        await chat.unload();
      }
    },
    [chat]
  );

  const sendMessage = useCallback(async () => {
    const localMessages = messages;
    await chat.generate(
      "Respond to this prompt as if you're Saul Goodman begrudgingly responding:" +
        prompt,
      (_step, message) => {
        setMessages([...[message], ...localMessages]);
      }
    );

    setPrompt("");

    console.log(await chat.runtimeStatsText());
  }, [chat, messages, prompt]);

  if (!chatInit) {
    chat.setInitProgressCallback((report: InitProgressReport) => {
      if (report.progress === 1 && !chatLoaded) setChatLoaded(true);
      setLabel(report.text);
    });
    reload(selectedModel, chatOpts);
    setChatInit(true);
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      {!chatLoaded && <LinearProgress />}

      <Container maxWidth="xl">
        <Grid container marginTop={1} spacing={2}>
          <Grid item sm={2}>
            <Card>
              <CardContent>
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="llm-model-label">LLM Model</InputLabel>
                  <Select
                    labelId="llm-model-label"
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    label="LLM Model"
                  >
                    {appConfig.model_list.map((model, index) => (
                      <MenuItem key={index} value={model.local_id}>
                        {model.local_id}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl
                  fullWidth
                  variant="outlined"
                  style={{ marginTop: 16 }}
                >
                  <InputLabel id="persona-label">Persona</InputLabel>
                  <Select
                    labelId="persona-label"
                    value={" Saul Goodman"}
                    label="Persona"
                  >
                    <MenuItem value={" Saul Goodman"}>Saul Goodman</MenuItem>
                    <MenuItem value={" Jesse Pinkman"}>Jesse Pinkman</MenuItem>
                    <MenuItem value={"Heisenberg"}>Heisenberg</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  label="Repetition Penalty"
                  type="number"
                  value={repetition_penalty}
                  onChange={(e) =>
                    setRepetitionPenalty(parseFloat(e.target.value))
                  }
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Top P"
                  type="number"
                  value={top_p}
                  onChange={(e) => setTopP(parseFloat(e.target.value))}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Temperature"
                  type="number"
                  value={temperature}
                  onChange={(e) => setTemperature(parseFloat(e.target.value))}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Mean Gen Len"
                  type="number"
                  value={mean_gen_len}
                  onChange={(e) => setMeanGenLen(parseInt(e.target.value))}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Shift Fill Factor"
                  type="number"
                  value={shift_fill_factor}
                  onChange={(e) =>
                    setShiftFillFactor(parseFloat(e.target.value))
                  }
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />

                <Button
                  variant="outlined"
                  fullWidth
                  color="primary"
                  style={{ marginBottom: 8, marginTop: 8 }}
                  startIcon={<UpdateIcon />}
                  onClick={updateConfig}
                >
                  Save
                </Button>

                <Button
                  variant="outlined"
                  color="warning"
                  fullWidth
                  startIcon={<ResetIcon />}
                  onClick={reset}
                >
                  Reset
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item sm={8}>
            <Grid container spacing={2} direction="column">
              <Grid item>
                <TextField
                  fullWidth
                  variant="outlined"
                  value={prompt}
                  multiline
                  rows={4} // specify the number of rows
                  onChange={(e) => setPrompt(e.target.value)}
                  label="Type your message"
                  placeholder="Press ENTER to send prompt"
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
              </Grid>
              <Grid item>
                <Alert severity={chatLoaded ? "success" : "info"}>
                  <Typography>{label}</Typography>
                </Alert>
              </Grid>
              {messages.map((message, index) => (
                <Grid item key={index}>
                  <Card
                    variant="outlined"
                    style={{
                      overflowY: "auto",
                      maxHeight: "70vh",
                      fontSize: "14px",
                      background: "#151515",
                    }}
                  >
                    <CardContent>
                      <ReactMarkdown>{message}</ReactMarkdown>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item sm={2}>
            <Button
              startIcon={<CodeIcon />}
              fullWidth
              variant="outlined"
              color="secondary"
              style={{ marginBottom: 8 }}
              onClick={() =>
                setPrompt(
                  "Please refactor this TypeScript code using SOLID principles: ..."
                )
              }
            >
              Refactor Code
            </Button>
            <Button
              fullWidth
              variant="outlined"
              color="secondary"
              style={{ marginBottom: 8 }}
              startIcon={<SentimentVerySatisfiedIcon />}
              onClick={() => setPrompt("Tell me a joke")}
            >
              Joke
            </Button>
            <Button
              startIcon={<BugReportIcon />}
              fullWidth
              variant="outlined"
              color="secondary"
              style={{ marginBottom: 8 }}
              onClick={() =>
                setPrompt(
                  "I have this error when running my JavaScript code: ... . Any idea what could be causing it?"
                )
              }
            >
              Debug Help
            </Button>
            <Button
              fullWidth
              startIcon={<LibraryBooksIcon />}
              variant="outlined"
              color="secondary"
              style={{ marginBottom: 8 }}
              onClick={() =>
                setPrompt(
                  "Can you generate documentation for this function? ..."
                )
              }
            >
              Generate docs
            </Button>
            <Button
              fullWidth
              startIcon={<HelpIcon />}
              variant="outlined"
              color="secondary"
              style={{ marginBottom: 8 }}
              onClick={() =>
                setPrompt(
                  "Can you explain the difference between let and const in JavaScript?"
                )
              }
            >
              Explanation
            </Button>
            <Button
              fullWidth
              startIcon={<TranslateIcon />}
              variant="outlined"
              color="secondary"
              style={{ marginBottom: 8 }}
              onClick={() =>
                setPrompt("Translate this English text to French: ...")
              }
            >
              Translation
            </Button>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}
