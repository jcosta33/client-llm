"use client";
import { Grid, Box, Typography } from "@mui/material";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { Provider } from "./context";
import Tweaker from "./components/tweaker";
import Input from "./components/input";
import Output from "./components/output";
import ResponsiveAppBar from "./components/appbar";
import { muiTheme } from "./consts";
import Loader from "./components/loader";

const darkTheme = createTheme(muiTheme);

export default function Home() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Provider>
        <Loader />
        <ResponsiveAppBar />
        <Grid container marginTop={1} spacing={0}>
          <Grid item sm={2}>
            <Box maxHeight="90vh" overflow="auto" padding={2}>
              <Tweaker />
            </Box>
          </Grid>
          <Grid item sm={5}>
            <Box maxHeight="90vh" overflow="auto" padding={2}>
              <Input />
            </Box>
          </Grid>

          <Grid item sm={5}>
            <Box maxHeight="90vh" overflow="auto" padding={2}>
              <Output />
            </Box>
          </Grid>
        </Grid>
      </Provider>
    </ThemeProvider>
  );
}
