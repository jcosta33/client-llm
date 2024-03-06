import { ChatOptions } from "@mlc-ai/web-llm";
import { Dispatch, SetStateAction } from "react";

export interface PromptResponse {
  value: string;
  model: string;
}

export interface ContextType {
  setOptionsUpdated: Dispatch<SetStateAction<boolean>>;
  log: string;
  setLog: Dispatch<SetStateAction<string>>;
  progress: string;
  setProgress: Dispatch<SetStateAction<string>>;
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
  messages: { value: string; model: string }[];
  setMessages: Dispatch<SetStateAction<{ value: string; model: string }[]>>;
  chatLoading: boolean;
  setChatLoading: Dispatch<SetStateAction<boolean>>;
  model: string;
  setModel: Dispatch<SetStateAction<string>>;
  setSystem: Dispatch<SetStateAction<string>>;
  system: string;
  setSource: Dispatch<SetStateAction<string>>;
  source: string;
  options: ChatOptions;
  setSingleOption: (key: keyof ChatOptions, value: string | number) => void;
  reset: () => void;
  stop: () => void;
  sendMessage: () => Promise<void>;
}
