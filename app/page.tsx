"use client";
import { Grid, Container, Typography } from "@mui/material";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { Provider } from "./context";
import Tweaker from "./components/tweaker";
import Input from "./components/input";
import Output from "./components/output";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    text: {
      primary: "#ffffff", // White text for dark mode
      secondary: "#bbbbbb", // Slightly dimmed text for secondary text in dark mode
    },
  },

  typography: {
    h6: {
      color: "#ffffff",
      marginBottom: 16,
    },
  },
});

export default function Home() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Provider>
        <Container maxWidth={false}>
          <Grid container marginTop={1} spacing={4}>
            <Grid item sm={2}>
              <Tweaker />
            </Grid>
            <Grid item sm={5}>
              <Input />
            </Grid>

            <Grid item sm={5}>
              <Output />
            </Grid>
          </Grid>
        </Container>
      </Provider>
    </ThemeProvider>
  );
}
