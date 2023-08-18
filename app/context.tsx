import { ChatOptions, InitProgressReport } from "@mlc-ai/web-llm";
import React, { useState, useCallback, createContext, ReactNode } from "react";
import { chatOpts, chat, appConfig } from "./consts";

interface ContextType {
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
  chatLoaded: boolean;
  setChatLoaded: React.Dispatch<React.SetStateAction<boolean>>;
  chatInit: boolean;
  setChatInit: React.Dispatch<React.SetStateAction<boolean>>;
  repetition_penalty: number;
  setRepetitionPenalty: React.Dispatch<React.SetStateAction<number>>;
  top_p: number;
  setTopP: React.Dispatch<React.SetStateAction<number>>;
  temperature: number;
  setTemperature: React.Dispatch<React.SetStateAction<number>>;
  mean_gen_len: number;
  setMeanGenLen: React.Dispatch<React.SetStateAction<number>>;
  shift_fill_factor: number;
  setShiftFillFactor: React.Dispatch<React.SetStateAction<number>>;
  selectedModel: string;
  setSelectedModel: React.Dispatch<React.SetStateAction<string>>;
  setSystem: React.Dispatch<React.SetStateAction<string>>;
  system: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
  language: string;
  updateConfig: () => void;
  reset: () => void;
  stop: () => void;
  sendMessage: () => Promise<void>;
  sendCommand: (command: string) => Promise<void>;
}

const Context = createContext<ContextType | undefined>(undefined);

const Provider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [label, setLabel] = useState("");
  const [messages, setMessages] = useState([] as string[]);
  const [prompt, setPrompt] = useState("");
  const [source, setSource] = useState("");
  const [context, setContext] = useState("");
  const [chatLoaded, setChatLoaded] = useState(false);
  const [chatInit, setChatInit] = useState(false);

  const [repetition_penalty, setRepetitionPenalty] = useState(
    chatOpts.repetition_penalty
  );
  const [top_p, setTopP] = useState(chatOpts.top_p);
  const [system, setSystem] = useState(chatOpts.conv_config.system);
  const [temperature, setTemperature] = useState(chatOpts.temperature);
  const [mean_gen_len, setMeanGenLen] = useState(chatOpts.mean_gen_len);
  const [shift_fill_factor, setShiftFillFactor] = useState(
    chatOpts.shift_fill_factor
  );
  const [language, setLanguage] = useState("typescript");

  const [selectedModel, setSelectedModel] = useState(
    "RedPajama-INCITE-Chat-3B-v1-q4f32_0"
  );

  const updateConfig = useCallback(() => {
    const config = {
      ...chatOpts,
      repetition_penalty,
      top_p,
      temperature,
      mean_gen_len,
      shift_fill_factor,
      conv_config: {
        system,
      },
    };
    reload(selectedModel, config);
  }, []);

  const reset = useCallback(async () => {
    setMessages([]);
    setSelectedModel("RedPajama-INCITE-Chat-3B-v1-q4f32_0");
    chat.resetChat();
    setTopP(chatOpts.top_p);
    setRepetitionPenalty(chatOpts.repetition_penalty);
    setTemperature(chatOpts.temperature);
    setMeanGenLen(chatOpts.mean_gen_len);
    setShiftFillFactor(chatOpts.shift_fill_factor);
    setSystem(chatOpts.conv_config.system);

    setLabel(await chat.runtimeStatsText());

    reload("RedPajama-INCITE-Chat-3B-v1-q4f32_0", chatOpts);
  }, []);

  const stop = useCallback(() => chat.interruptGenerate(), []);

  const reload = useCallback(
    async (model: string, chatOpts: ChatOptions) => {
      setChatLoaded(false);
      // This callback allows us to report initialization progress
      try {
        await chat.reload(model, chatOpts, appConfig);

        await chat.generate("Hello!", (_step, message) => {
          setMessages([message]);
        });
        setLabel(await chat.runtimeStatsText());
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
    const message = `
      Language: ${language}
      Tools, frameworks and libraries:  ${context}
      Source: ${source}
      Request: ${prompt}
    `;
    await chat.generate(message, (_step, message) => {
      setMessages([...[message], ...localMessages]);
    });

    setLabel(await chat.runtimeStatsText());
  }, [chat, messages, prompt]);

  const sendCommand = useCallback(
    async (command: string) => {
      const localMessages = messages;

      await chat.generate(command, (_step, message) => {
        setMessages([...[message], ...localMessages]);
      });

      setLabel(await chat.runtimeStatsText());
    },
    [chat, messages, prompt]
  );

  if (!chatInit) {
    setChatInit(true);

    chat.setInitProgressCallback((report: InitProgressReport) => {
      if (report.progress === 1 && !chatLoaded) setChatLoaded(true);
      setLabel(report.text);
    });
    reload(selectedModel, chatOpts);
  }

  const value = {
    label,
    setLabel,
    messages,
    setMessages,
    prompt,
    setPrompt,
    chatLoaded,
    setChatLoaded,
    chatInit,
    setChatInit,
    repetition_penalty,
    setRepetitionPenalty,
    top_p,
    setTopP,
    temperature,
    setTemperature,
    mean_gen_len,
    setMeanGenLen,
    shift_fill_factor,
    setShiftFillFactor,
    selectedModel,
    setSelectedModel,
    system,
    setSystem,
    context,
    setContext,
    source,
    language,
    setLanguage,
    setSource,
    updateConfig,
    reset,
    stop,
    sendMessage,
    sendCommand,
  };
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export { Context, Provider };
