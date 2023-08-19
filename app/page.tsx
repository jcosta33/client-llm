"use client";
import { Grid, Box, Typography } from "@mui/material";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { Provider } from "./context";
import Tweaker from "./components/tweaker";
import ResponsiveAppBar from "./components/appbar";
import { muiTheme } from "./consts";
import Loader from "./components/loader";
import Wrapper from "./wrapper";

const darkTheme = createTheme(muiTheme);

export default function Home() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Provider>
        <Loader />
        <Wrapper />
      </Provider>
    </ThemeProvider>
  );
}
