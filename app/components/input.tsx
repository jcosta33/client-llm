
import { useContext } from "../hooks";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { githubDark } from "@uiw/codemirror-theme-github";
import { codeString } from "../constants";

const Input = () => {
  const { setCode, } = useContext();
  return (
    <CodeMirror
      extensions={[javascript({ jsx: true })]}
      onChange={(value) => setCode(value)}
      theme={githubDark}
      placeholder={codeString}
      maxHeight="60vh"
      style={{ margin: "0 0 16px 0", fontSize: "12px" }}
    />
  );
};

export default Input;
