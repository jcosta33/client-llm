import { ButtonGroup, Button } from "@mui/material";
import { useContext } from "../hooks";
import CodeIcon from "@mui/icons-material/Code";
import BugReportIcon from "@mui/icons-material/BugReport";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import HelpIcon from "@mui/icons-material/Help";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const Presets = () => {
  const { setPrompt } = useContext();

  return (
    <ButtonGroup size="small" >
      <Button
        startIcon={<CodeIcon />}
        color="secondary"
        onClick={() =>
          setPrompt(
            "Please refactor this TypeScript code using SOLID principles."
          )
        }
      >
        Refactor
      </Button>

      <Button
        startIcon={<BugReportIcon />}
        color="secondary"
        onClick={() =>
          setPrompt(
            "I have this error when running my  code. Any idea what could be causing it?"
          )
        }
      >
        Debug
      </Button>
      <Button
        startIcon={<LibraryBooksIcon />}
        color="secondary"
        onClick={() =>
          setPrompt("Can you generate documentation for this function? ")
        }
      >
        Document
      </Button>
      <Button
        startIcon={<HelpIcon />}
        color="secondary"
        onClick={() => setPrompt("Can you explain this code?")}
      >
        Explain
      </Button>
      <Button
        startIcon={<CheckBoxIcon />}
        color="secondary"
        onClick={() => setPrompt("Can you write a test for this code?")}
      >
        Write test
      </Button>
    </ButtonGroup>
  );
};

export default Presets;
