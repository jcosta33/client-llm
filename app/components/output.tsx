
import { useContext } from "../hooks";
import ReactMarkdown from "react-markdown";
import Highlight from "react-highlight";
import "highlight.js/styles/github-dark.css";
import { Button } from "@/components/ui/button";
import { CopyIcon } from "@radix-ui/react-icons";

const Output = () => {
  const { messages, model } = useContext();

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  return (
    <section className="flex flex-col-reverse h-full overflow-auto no-wrap">
      <header className="mb-6">
        <h5 className={`text-center text-2xl text-gray-800 mb-6 ${messages.length === 0 ? 'mt-80' : 'mt-0'}`}>
          {model}
        </h5>
      </header>
      {messages.map((message, index) => (
        <article key={index} className="max-w-full">
          <div className="border border-gray-300 bg-gray-900 text-sm p-4">
            <header className="absolute top-2 right-0 left-0 text-center text-gray-600 border-b border-gray-800 text-xs uppercase opacity-40">
              {message.model}
            </header>
            <div className="relative pt-4">
              <ReactMarkdown className="text-gray-400" components={{
                p: ({ node, ...props }) => <p className="mb-2 text-base text-gray-300" {...props} />,
                h1: ({ node, ...props }) => <h1 className="text-3xl font-bold text-white mb-4" {...props} />,
                h2: ({ node, ...props }) => <h2 className="text-2xl font-bold text-white mb-4" {...props} />,
                h3: ({ node, ...props }) => <h3 className="text-xl font-bold text-white mb-3" {...props} />,
                h4: ({ node, ...props }) => <h4 className="text-lg font-bold text-white mb-3" {...props} />,
                h5: ({ node, ...props }) => <h5 className="text-md font-bold text-white mb-2" {...props} />,
                h6: ({ node, ...props }) => <h6 className="text-sm font-bold text-white mb-2" {...props} />,
                code: ({ node, inline, className, children, ...props }) => inline ? (
                  <code className="bg-gray-700 text-yellow-300 px-1 py-0.5 rounded" {...props} />
                ) : (<>
                  <Highlight>{children}</Highlight>
                  <Button
                    size="icon"
                    onClick={() => handleCopy(String(children))}
                  >
                    <CopyIcon />
                  </Button>
                </>)
              }}>
                {message.value}
              </ReactMarkdown>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
};

export default Output;
