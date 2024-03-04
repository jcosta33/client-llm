"use client";
import { FC, useMemo } from "react";
import { Grid, Box } from "@mui/material";
import Input from "./input";
import Output from "./output";
import { useContext } from "../hooks";
import Prompt from "./prompt";
import Tweaker from "./tweaker";
import { isOnPhone } from "./utils";
import { Context, Provider } from "../context";
import { chatOpts } from "../configs";

const TweakerSection: FC = () => {
  return (
    <Grid item sm={2}>
      <Box
        height="100vh"
        overflow="auto"
        borderRight="1px solid #222"
        padding={2}
      >
        <Tweaker />
      </Box>
    </Grid>
  );
};


interface DefaultLayoutProps {
  fullscreen: boolean;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ fullscreen }) => {
  return (
    <Grid item sm={fullscreen ? 12 : 10}>
      <Grid container spacing={0} justifyContent={"center"}>
        <Grid item sm={8}>
          <Box height="calc(100vh - 350px)" marginBottom={2} marginTop={2}>
            <Output />
          </Box>
          <Prompt />
        </Grid>
      </Grid>
    </Grid>
  );
};

const Wrapper: FC = () => {
  const { fullscreen } = useContext();
  const userIsOnPhone = useMemo(() => isOnPhone(), []);


  return (
    <Context.Provider value={{
      setOptionsUpdated: () => { },
      log: "",
      setLog: () => { },
      progress: "",
      setProgress: () => { },
      messages: [],
      setMessages: () => { },
      message: "",
      setMessage: () => { },
      chatLoading: false,
      setChatLoading: () => { },
      model: "Llama-2-7b-chat-hf-q4f32_1",
      setModel: () => { },
      system: chatOpts.conv_config.system,
      setSystem: () => { },
      context: "",
      setContext: () => { },
      source: "web-llm",
      setSource: () => { },
      code: "",
      setCode: () => { },
      language: "",
      setLanguage: () => { },
      options: chatOpts,
      setSingleOption: () => { },
      reset: async () => { },
      stop: () => { },
      sendMessage: async () => { },
      sendCommand: async () => { },
      fullscreen: false,
      setFullscreen: () => { },
      layout: "chat",
      setLayout: () => { },
    }}>
      <Grid container spacing={0}>
        {!fullscreen && !userIsOnPhone && <TweakerSection />}
        <DefaultLayout fullscreen={fullscreen} />
      </Grid>
    </Context.Provider >
  );
};

export default Wrapper;
