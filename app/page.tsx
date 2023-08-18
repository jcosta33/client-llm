"use client";
import { Grid, Container, Typography, Box } from "@mui/material";

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
          <Grid container marginTop={2} spacing={0}>
            <Grid item sm={2}>
              <Box maxHeight="94vh" overflow="auto" padding={2}>
                <Tweaker />
              </Box>
            </Grid>
            <Grid item sm={5}>
              <Box maxHeight="94vh" overflow="auto" padding={2}>
                <Input />
              </Box>
            </Grid>

            <Grid item sm={5}>
              <Box maxHeight="94vh" overflow="auto" padding={2}>
                <Output />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Provider>
    </ThemeProvider>
  );
}
