import { AppConfig, ChatOptions } from "@mlc-ai/web-llm";
import { ThemeOptions } from "@mui/material";


export const programmingLanguages: { label: string; name: string }[] = [
  { label: "Python", name: "python" },
  { label: "JavaScript", name: "javascript" },
  { label: "Java", name: "java" },
  { label: "C++", name: "cpp" },
  { label: "C#", name: "csharp" },
  { label: "PHP", name: "php" },
  { label: "Swift", name: "swift" },
  { label: "Go", name: "go" },
  { label: "Ruby", name: "ruby" },
  { label: "TypeScript", name: "typescript" },
  { label: "Kotlin", name: "kotlin" },
  { label: "Rust", name: "rust" },
  { label: "R", name: "r" },
  { label: "Scala", name: "scala" },
  { label: "Perl", name: "perl" },
  { label: "Lua", name: "lua" },
  { label: "Haskell", name: "haskell" },
  { label: "Objective-C", name: "objective-c" },
  { label: "Dart", name: "dart" },
  { label: "MATLAB", name: "matlab" },
];

export const webLLMModels = [
  {
    label: "Llama 2 7b f32",
    name: "Llama-2-7b-chat-hf-q4f32_1",
  },
  {
    label: "Llama 2 7b f16",
    name: "Llama-2-7b-chat-hf-q4f16_1",
  },
  {
    label: "Llama 2 13b f32",
    name: "Llama-2-13b-chat-hf-q4f32_1",
  },
  {
    label: "Llama 2 13b f16",
    name: "Llama-2-13b-chat-hf-q4f16_1",
  },
  {
    label: "Llama 2 70b f32",
    name: "Llama-2-70b-chat-hf-q4f16_1",
  },
  {
    label: "RedPajama 3B f32",
    name: "RedPajama-INCITE-Chat-3B-v1-q4f32_0",
  },
  {
    label: "RedPajama 3B f16",
    name: "RedPajama-INCITE-Chat-3B-v1-q4f16_0",
  },
  {
    label: "Vicuna 7B f32",
    name: "vicuna-v1-7b-q4f32_0",
  },
];

export const openAIModels = [
  {
    label: "GPT 3.5 turbo",
    name: "gpt-3.5-turbo",
  },
  {
    label: "GPT 3.5 turbo 16k",
    name: "gpt-3.5-turbo-16k",
  },
];

export const muiTheme: ThemeOptions = {
  palette: {
    mode: "dark",
    background: {
      default: "#000",
    },
    primary: {
      light: "#E5E5FF", // Lighter super washed-out pastel blue/purple
      main: "#D3D3FF", // Super washed-out pastel blue/purple
      dark: "#C0C0FF", // Darker super washed-out pastel blue/purple
      contrastText: "#000",
    },
    secondary: {
      light: "#FFFBE5", // Light super super washed-out yellow
      main: "#FFF9D3", // Super super washed-out yellow
      dark: "#FFF7C0", // Darker super super washed-out yellow
      contrastText: "#000",
    },
    error: {
      light: "#FFE5E5",
      main: "#FFD0D0", // Super washed-out pastel red
      dark: "#FFBBBB",
      contrastText: "#000",
    },
    warning: {
      light: "#FFF0E5",
      main: "#FFE0D0", // Super washed-out pastel orange
      dark: "#FFD0BA",
      contrastText: "#000",
    },
    info: {
      light: "#E5EFFF",
      main: "#D0DEFF", // Super washed-out pastel blue
      dark: "#B0CFFF",
      contrastText: "#000",
    },
    success: {
      light: "#E5FFE5",
      main: "#D0FFD0", // Super washed-out pastel green
      dark: "#B0FFB0",
      contrastText: "#000",
    },
    grey: {
      50: "#F3F3F3",
      100: "#E0E0E0",
      200: "#C7C7C7",
      300: "#B0B0B0",
      400: "#999999",
      500: "#808080",
      600: "#666666",
      700: "#4D4D4D",
      800: "#333333",
      900: "#1A1A1A",
    },
  },
};
