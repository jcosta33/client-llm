"use client";
import { Grid, Box } from "@mui/material";

import Input from "./components/input";
import Output from "./components/output";
import { useContext } from "./hooks";
import Prompt from "./components/prompt";
import ResponsiveAppBar from "./components/appbar";
import Tweaker from "./components/tweaker";
import { useMemo } from "react";
import { isOnPhone } from "./components/utils";

export default function Wrapper() {
  const { layout, fullscreen } = useContext();
  const userIsOnPhone = useMemo(() => isOnPhone(), []);
  return layout === "code" && !userIsOnPhone ? (
    <Grid container spacing={0}>
      {!fullscreen && (
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
      )}
      <Grid item sm={fullscreen ? 12 : 10}>
        <ResponsiveAppBar />
        <Grid container spacing={0}>
          <Grid item sm={6}>
            <Box maxHeight="90vh" overflow="auto" padding={2}>
              <Input />
            </Box>
          </Grid>

          <Grid item sm={6}>
            <Box maxHeight="90vh" overflow="auto" padding={2}>
              <Output />
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  ) : (
    <Grid container spacing={0}>
      {!fullscreen && !userIsOnPhone && (
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
      )}
      <Grid item sm={fullscreen ? 12 : 10}>
        <ResponsiveAppBar />
        <Grid container spacing={0} justifyContent={"center"}>
          <Grid item sm={8}>
            <Box
              height="calc(100vh - 390px)"
              overflow="auto"
              marginBottom={2}
              marginTop={2}
            >
              <Output />
            </Box>
            <Prompt />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
