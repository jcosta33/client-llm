import { useContext } from "../hooks";

const Presets = () => {
  const { setMessage } = useContext();

  return (
    <div className="flex space-x-2">
      <button
        className="bg-red-600 text-white px-4 py-2 flex items-center space-x-2 rounded text-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        onClick={() =>
          setMessage("I have this error when running my code. Any idea what could be causing it?")
        }
      >
        <svg /* SVG for BugReportIcon */ className="w-4 h-4" />
        <span>Debug</span>
      </button>

      <button
        className="bg-red-600 text-white px-4 py-2 flex items-center space-x-2 rounded text-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        onClick={() =>
          setMessage("Can you generate documentation for this code?")
        }
      >
        <svg /* SVG for LibraryBooksIcon */ className="w-4 h-4" />
        <span>Document</span>
      </button>

      <button
        className="bg-red-600 text-white px-4 py-2 flex items-center space-x-2 rounded text-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        onClick={() => setMessage("Can you explain this code?")}
      >
        <svg /* SVG for HelpIcon */ className="w-4 h-4" />
        <span>Explain</span>
      </button>

      <button
        className="bg-red-600 text-white px-4 py-2 flex items-center space-x-2 rounded text-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        onClick={() => setMessage("Can you write a test for this code?")}
      >
        <svg /* SVG for CheckBoxIcon */ className="w-4 h-4" />
        <span>Write test</span>
      </button>

      <button
        className="bg-red-600 text-white px-4 py-2 flex items-center space-x-2 rounded text-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        onClick={() => setMessage("Can you write a test for this code?")}
      >
        <svg /* SVG for CommentIcon */ className="w-4 h-4" />
        <span>Comments</span>
      </button>
    </div>

  );
};

export default Presets;
