import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import { useContext } from "../hooks";
import ReactMarkdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

const Output = () => {
  const { messages, label, language } = useContext();

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const handleDownload = (content: BlobPart) => {
    const blob = new Blob([content], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "code.txt";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <Grid container spacing={2} direction="column">
      
      <Grid item>
        <Alert severity="info">
          <Typography>{label}</Typography>
        </Alert>
      </Grid>
      {messages.map((message, index) => (
        <Grid item key={index} maxWidth="100%!important">
          <Card variant="outlined" sx={{ fontSize: 12 }}>
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
                    const content = String(children).replace(/\n$/, "");

                    return (
                      <>
                        <SyntaxHighlighter
                          language={language}
                          style={{ ...a11yDark }}
                        >
                          {content}
                        </SyntaxHighlighter>
                        <Button onClick={() => handleCopy(content)}>
                          Copy
                        </Button>
                        <Button onClick={() => handleDownload(content)}>
                          Download
                        </Button>
                      </>
                    );
                  },
                }}
              >
                {message}
              </ReactMarkdown>
            </CardContent>
          </Card>
        </Grid>
      ))}

      {messages.length === 0 && (
        <Grid item>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              pt: 10, // Adds space on top
            }}
          >
            <CircularProgress />
          </Box>
        </Grid>
      )}
    </Grid>
  );
};

export default Output;
