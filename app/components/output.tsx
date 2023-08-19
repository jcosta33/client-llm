"use-client";

import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { useContext } from "../hooks";
import ReactMarkdown from "react-markdown";
import Highlight from "react-highlight";
import "highlight.js/styles/github-dark.css";
import CopyIcon from "@mui/icons-material/CopyAll";

const Output = () => {
  const { messages, selectedModel } = useContext();

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  return (
    <Grid container spacing={2} direction="column">
      {messages.map((message, index) => {
        return (
          <Grid item key={index} maxWidth="100%!important">
            <Card variant="outlined" sx={{ fontSize: 12, background: "#111" }}>
              <CardContent>
                <ReactMarkdown
                  components={{
                    code({ node, inline, className, children, ...props }) {
                      // If inline, retain the default behavior
                      if (inline) {
                        return (
                          <code className={className} {...props}>
                            {children}
                          </code>
                        );
                      }

                      return (
                        <Box position="relative">
                          <Highlight>
                            <div contentEditable>{children}</div>
                          </Highlight>
                          <Button
                            onClick={() => handleCopy(String(children))}
                            variant="text"
                            size="small"
                            sx={{
                              position: "absolute",
                              top: 5,
                              right: 5,
                              minWidth: 0,
                              color: "#999",
                            }}
                          >
                            <CopyIcon />
                          </Button>
                        </Box>
                      );
                    },
                  }}
                >
                  {message}
                </ReactMarkdown>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
      <Grid item>
        <Typography
          variant="h4"
          color={"#444"}
          textAlign={"center"}
          marginBottom={4}
          marginTop={messages.length === 0 ? 20 : 2}
        >
          {selectedModel}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Output;
