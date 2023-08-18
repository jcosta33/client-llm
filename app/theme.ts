"use-client";
import { createTheme } from "@mui/material";

const blackTheme = createTheme({
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

export default blackTheme;
