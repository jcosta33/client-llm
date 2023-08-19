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
        <Grid container spacing={0}>
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
          <Grid item sm={10}>
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
      </Provider>
    </ThemeProvider>
  );
}
