"use client";
import { useState, useEffect, useCallback, useMemo, ChangeEvent } from "react";

import { ChatModule, ChatOptions, InitProgressReport } from "@mlc-ai/web-llm";
import {
  Grid,
  Typography,
  List,
  ListItem,
  TextField,
  Button,
  Container,
  Card,
  CardContent,
  Alert,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import ReactMarkdown from "react-markdown";

import CodeIcon from "@mui/icons-material/Code";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import BugReportIcon from "@mui/icons-material/BugReport";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import HelpIcon from "@mui/icons-material/Help";
import TranslateIcon from "@mui/icons-material/Translate";
import { AppConfig, ChatConfig } from "@mlc-ai/web-llm/lib/config";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const appConfig: AppConfig = {
  model_list: [
    {
      model_url:
        "https://huggingface.co/mlc-ai/mlc-chat-Llama-2-7b-chat-hf-q4f32_1/resolve/main/",
      local_id: "Llama-2-7b-chat-hf-q4f32_1",
    },
    {
      model_url:
        "https://huggingface.co/mlc-ai/mlc-chat-Llama-2-13b-chat-hf-q4f32_1/resolve/main/",
      local_id: "Llama-2-13b-chat-hf-q4f32_1",
    },
    {
      model_url:
        "https://huggingface.co/mlc-ai/mlc-chat-Llama-2-7b-chat-hf-q4f16_1/resolve/main/",
      local_id: "Llama-2-7b-chat-hf-q4f16_1",
      required_features: ["shader-f16"],
    },
    {
      model_url:
        "https://huggingface.co/mlc-ai/mlc-chat-Llama-2-13b-chat-hf-q4f16_1/resolve/main/",
      local_id: "Llama-2-13b-chat-hf-q4f16_1",
      required_features: ["shader-f16"],
    },
    {
      model_url:
        "https://huggingface.co/mlc-ai/mlc-chat-Llama-2-70b-chat-hf-q4f16_1/resolve/main/",
      local_id: "Llama-2-70b-chat-hf-q4f16_1",
      required_features: ["shader-f16"],
    },
    {
      model_url:
        "https://huggingface.co/mlc-ai/mlc-chat-RedPajama-INCITE-Chat-3B-v1-q4f32_0/resolve/main/",
      local_id: "RedPajama-INCITE-Chat-3B-v1-q4f32_0",
    },
    {
      model_url:
        "https://huggingface.co/mlc-ai/mlc-chat-vicuna-v1-7b-q4f32_0/resolve/main/",
      local_id: "vicuna-v1-7b-q4f32_0",
    },
    {
      model_url:
        "https://huggingface.co/mlc-ai/mlc-chat-RedPajama-INCITE-Chat-3B-v1-q4f16_0/resolve/main/",
      local_id: "RedPajama-INCITE-Chat-3B-v1-q4f16_0",
      required_features: ["shader-f16"],
    },
  ],
  model_lib_map: {
    "Llama-2-7b-chat-hf-q4f32_1":
      "https://raw.githubusercontent.com/mlc-ai/binary-mlc-llm-libs/main/Llama-2-7b-chat-hf-q4f32_1-webgpu.wasm",
    "Llama-2-13b-chat-hf-q4f32_1":
      "https://raw.githubusercontent.com/mlc-ai/binary-mlc-llm-libs/main/Llama-2-13b-chat-hf-q4f32_1-webgpu.wasm",
    "Llama-2-7b-chat-hf-q4f16_1":
      "https://raw.githubusercontent.com/mlc-ai/binary-mlc-llm-libs/main/Llama-2-7b-chat-hf-q4f16_1-webgpu.wasm",
    "Llama-2-13b-chat-hf-q4f16_1":
      "https://raw.githubusercontent.com/mlc-ai/binary-mlc-llm-libs/main/Llama-2-13b-chat-hf-q4f16_1-webgpu.wasm",
    "Llama-2-70b-chat-hf-q4f16_1":
      "https://raw.githubusercontent.com/mlc-ai/binary-mlc-llm-libs/main/Llama-2-70b-chat-hf-q4f16_1-webgpu.wasm",
    "vicuna-v1-7b-q4f32_0":
      "https://raw.githubusercontent.com/mlc-ai/binary-mlc-llm-libs/main/vicuna-v1-7b-q4f32_0-webgpu-v1.wasm",
    "RedPajama-INCITE-Chat-3B-v1-q4f32_0":
      "https://raw.githubusercontent.com/mlc-ai/binary-mlc-llm-libs/main/RedPajama-INCITE-Chat-3B-v1-q4f32_0-webgpu-v1.wasm",
    "RedPajama-INCITE-Chat-3B-v1-q4f16_0":
      "https://raw.githubusercontent.com/mlc-ai/binary-mlc-llm-libs/main/RedPajama-INCITE-Chat-3B-v1-q4f16_0-webgpu-v1.wasm",
  },
};
// override default
const chatOpts: ChatOptions = {
  repetition_penalty: 1.05,
  top_p: 1,
  temperature: 0.7,
  mean_gen_len: 1000,
  conv_config: {
    stop_str: "</s>",
    roles: ["USER", "ASSISTANT"],
    add_bos: true,
    seps: [" ", "</s>"],
    offset: 0,
  },
};

export default function Home() {
  const [label, setLabel] = useState("");
  const [messages, setMessages] = useState([] as string[]);
  const [prompt, setPrompt] = useState("");
  const [chatLoaded, setChatLoaded] = useState(false);
  const chat = useMemo(() => new ChatModule(), []);

  const reset = useCallback(() => {
    chat.resetChat();
  }, []);

  const reload = useCallback(async () => {
    // This callback allows us to report initialization progress
    try {
      await chat.reload("Llama-2-70b-chat-hf-q4f16_1", chatOpts, appConfig);
    } catch (err: unknown) {
      setLabel("Init error, " + (err?.toString() ?? ""));
      console.log(err);
      await chat.unload();
    }
  }, [chat]);

  const sendMessage = useCallback(async () => {
    const localMessages = messages;
    await chat.generate(prompt, (_step, message) => {
      setMessages([...[message], ...localMessages]);
    });

    setPrompt("");

    console.log(await chat.runtimeStatsText());
  }, [chat, messages, prompt]);

  if (!chatLoaded) {
    chat.setInitProgressCallback((report: InitProgressReport) => {
      setLabel(report.text);
    });
    reload();
    setChatLoaded(true);
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container>
        <Grid container spacing={3} padding={2} direction="column">
          <Grid item>
            <Button
              startIcon={<CodeIcon />}
              onClick={() =>
                setPrompt(
                  "Please refactor this TypeScript code using SOLID principles: ..."
                )
              }
            >
              Refactor Code
            </Button>
            <Button
              startIcon={<SentimentVerySatisfiedIcon />}
              onClick={() => setPrompt("Tell me a joke")}
            >
              Joke
            </Button>
            <Button
              startIcon={<BugReportIcon />}
              onClick={() =>
                setPrompt(
                  "I have this error when running my JavaScript code: ... . Any idea what could be causing it?"
                )
              }
            >
              Debug Help
            </Button>
            <Button
              startIcon={<LibraryBooksIcon />}
              onClick={() =>
                setPrompt(
                  "Can you generate documentation for this function? ..."
                )
              }
            >
              Generate Documentation
            </Button>
            <Button
              startIcon={<HelpIcon />}
              onClick={() =>
                setPrompt(
                  "Can you explain the difference between let and const in JavaScript?"
                )
              }
            >
              Explanation
            </Button>
            <Button
              startIcon={<TranslateIcon />}
              onClick={() =>
                setPrompt("Translate this English text to French: ...")
              }
            >
              Translation
            </Button>
          </Grid>
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
                maxLength: 5000, // limiting message length to 1000 characters, can adjust as needed
              }}
            />
          </Grid>
          {messages.map((message, index) => (
            <Grid item key={index}>
              <Card
                variant="outlined"
                style={{
                  overflowY: "auto",
                  maxHeight: "500px",
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
          <Grid item>
            <Alert severity="warning">
              <Typography>{label}</Typography>
            </Alert>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}
