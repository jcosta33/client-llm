"use client";
import {
  Grid,
  Container,
  Box,
  Typography,
  CardContent,
  Card,
} from "@mui/material";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { Provider } from "./context";
import Tweaker from "./components/tweaker";
import Input from "./components/input";
import Output from "./components/output";
import ResponsiveAppBar from "./components/appbar";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#000", // Dark background for dark mode
      paper: "#000", // Dark background for dark mode
    },

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
        <ResponsiveAppBar />
        <Grid container marginTop={4} spacing={0}>
          <Grid item sm={2}>
            <Box maxHeight="94vh" overflow="auto" padding={2}>
              <Tweaker />
            </Box>
          </Grid>
          <Grid item sm={5}>
            <Box maxHeight="94vh" overflow="auto" padding={2}>
              <Typography variant="h6" sx={{ color: "#777" }}>
                Input
              </Typography>
              <Input />
            </Box>
          </Grid>

          <Grid item sm={5}>
            <Box maxHeight="94vh" overflow="auto" padding={2}>
              <Typography variant="h6" sx={{ color: "#777" }}>
                Output
              </Typography>
              <Output />
            </Box>
          </Grid>
        </Grid>
      </Provider>
    </ThemeProvider>
  );
}
