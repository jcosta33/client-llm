import { ChatModule, ChatOptions, InitProgressReport } from "@mlc-ai/web-llm";
import React, {
  useState,
  useCallback,
  createContext,
  ReactNode,
  useMemo,
} from "react";
import { chatOpts, appConfig } from "./configs";
import { OpenAI } from "openai";

const chat = new ChatModule();

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPEN_AI_API_KEY,
  dangerouslyAllowBrowser: true,
});

interface ContextType {
  setOptionsUpdated: React.Dispatch<React.SetStateAction<boolean>>;
  label: string;
  setLabel: React.Dispatch<React.SetStateAction<string>>;
  messages: string[];
  setMessages: React.Dispatch<React.SetStateAction<string[]>>;
  prompt: string;
  setPrompt: React.Dispatch<React.SetStateAction<string>>;
  context: string;
  setContext: React.Dispatch<React.SetStateAction<string>>;
  source: string;
  setSource: React.Dispatch<React.SetStateAction<string>>;
  chatLoading: boolean;
  setChatLoading: React.Dispatch<React.SetStateAction<boolean>>;
  selectedModel: string;
  setSelectedModel: React.Dispatch<React.SetStateAction<string>>;
  setSystem: React.Dispatch<React.SetStateAction<string>>;
  system: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
  language: string;
  setRuntime: React.Dispatch<React.SetStateAction<string>>;
  runtime: string;
  options: ChatOptions;
  setSingleOption: (key: keyof ChatOptions, value: string | number) => void;
  layout: string;
  setLayout: React.Dispatch<React.SetStateAction<string>>;
  fullscreen: boolean;
  setFullscreen: React.Dispatch<React.SetStateAction<boolean>>;
  reset: () => void;
  stop: () => void;
  sendMessage: () => Promise<void>;
  sendCommand: (command: string) => Promise<void>;
}

const Context = createContext<ContextType | undefined>(undefined);

const Provider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [label, setLabel] = useState("");
  const [messages, setMessages] = useState([] as string[]);

  const [runtime, setRuntime] = useState("open-ai");
  const [prompt, setPrompt] = useState("");
  const [source, setSource] = useState("");
  const [context, setContext] = useState("");

  const [system, setSystem] = useState(chatOpts.conv_config.system);

  const [language, setLanguage] = useState("typescript");

  const [selectedModel, setSelectedModel] = useState("gpt-3.5-turbo-16k");

  const [options, setOptions] = useState<ChatOptions>(chatOpts);
  const [optionsUpdated, setOptionsUpdated] = useState(false);

  const [chatLoading, setChatLoading] = useState(false);

  const [fullscreen, setFullscreen] = useState(false);

  const [layout, setLayout] = useState("chat");

  const setSingleOption = useCallback(
    (key: keyof ChatOptions, value: string | number) => {
      setOptions((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const reset = useCallback(async () => {
    setMessages([]);
    chat.resetChat();
    setOptions(chatOpts);
    reload();
  }, []);

  const stop = useCallback(() => chat.interruptGenerate(), []);

  const reload = useCallback(async () => {
    setChatLoading(true);
    chat.setInitProgressCallback((report: InitProgressReport) => {
      setLabel(report.text);
    });
    const opts = {
      ...chatOpts,
      ...options,
      conv_config: {
        system,
      },
    };

    // This callback allows us to report initialization progress
    try {
      await chat.unload();
      await chat.resetChat();
      await chat.reload(selectedModel, opts, appConfig);
      setOptionsUpdated(false);
      setChatLoading(false);
    } catch (err: unknown) {
      await chat.unload();
      setLabel("Init error, " + (err?.toString() ?? ""));
      setChatLoading(false);
    }
  }, [chat, options, system, selectedModel]);

  const sendMessage = useCallback(async () => {
    const localMessages = messages;
    let message = "";

    if (language !== "") {
      message += `\nProgramming language: ${language};\n`;
    }

    if (context !== "") {
      message += ` \nTools: ${context};\n`;
    }

    if (prompt !== "") {
      message += ` \n Request: ${prompt}; \n`;
    }
    if (source !== "") {
      message += `\n Code: ${source}\n `;
    }

    if (runtime === "open-ai") {
      const stream = await openai.chat.completions.create({
        model: selectedModel,
        messages: [
          { role: "system", content: system },
          { role: "user", content: message },
        ],
        stream: true,
        temperature: options.temperature,
        top_p: options.top_p,
        max_tokens: 10000,
        frequency_penalty: options.repetition_penalty,
      });
      let response = "";
      for await (const part of stream) {
        response += part.choices[0]?.delta?.content || "";
        setMessages([...[response], ...localMessages]);
      }
    } else {
      if (!optionsUpdated) {
        await chat.generate(message, (_step, message) => {
          setMessages([...[message], ...localMessages]);
        });
      } else {
        await reload();
        await chat.generate(message, (_step, message) => {
          setMessages([...[message], ...localMessages]);
        });
        setLabel(await chat.runtimeStatsText());
      }
    }
  }, [
    chat,
    context,
    language,
    messages,
    optionsUpdated,
    prompt,
    reload,
    runtime,
    selectedModel,
    source,
  ]);

  const sendCommand = useCallback(
    async (command: string) => {
      const localMessages = messages;

      await chat.generate(command, (_step, message) => {
        setMessages([...[message], ...localMessages]);
      });

      setLabel(await chat.runtimeStatsText());
    },
    [chat, messages]
  );

  const value = {
    setOptionsUpdated,
    label,
    setLabel,
    messages,
    setMessages,
    prompt,
    setPrompt,
    chatLoading,
    setChatLoading,
    selectedModel,
    setSelectedModel,
    system,
    setSystem,
    context,
    setContext,
    runtime,
    setRuntime,
    source,

    language,
    options,
    setSingleOption,
    setLanguage,
    setSource,
    reset,
    stop,
    sendMessage,
    sendCommand,
    fullscreen,
    setFullscreen,
    layout,
    setLayout,
  };
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export { Context, Provider };
