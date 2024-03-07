
import ReactMarkdown from "react-markdown";
import Highlight from "react-highlight";
import "highlight.js/styles/github-dark.css";
import { Button } from "@/components/ui/button";
import { CopyIcon } from "@radix-ui/react-icons";
import { Context } from "../context";
import { useCallback, useContext } from "react";
import Loader from "./loader";

const Output = () => {
  const { messages, model } = useContext(Context);

  const handleCopy = useCallback((content: string) => {
    debugger
    navigator.clipboard.writeText(content);
  }, []);

  return (
    <section className="flex flex-grow flex-col-reverse h-full p-4">
      <Loader />

      {messages.map((message, index) => (
        <article key={index} className="relative max-w-full border-solid border-2 p-4 border-gray-900 mb-2">
          <header className="absolute top-1 right-0 left-4 text-gray-400 border-b border-gray-800 text-xs uppercase opacity-40">
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
                <code className="bg-gray-700 text-yellow-300 px-1 py-0.5 rounded" {...props} >
                  {children}
                </code>
              ) : (<>
                <Highlight className="relative">{children}
                  <Button
                    className="absolute top-0 right-0"
                    size="icon"
                    variant="ghost"
                    onClick={() => handleCopy(String(children))}
                  >
                    <CopyIcon />
                  </Button>
                </Highlight>
              </>)
            }}>
              {message.value}
            </ReactMarkdown>
          </div>
        </article>
      ))}
      <header className="mb-6">
        <h5 className={`text-center text-2xl text-gray-800 mb-6 ${messages.length === 0 ? 'mt-80' : 'mt-0'}`}>
          {model}
        </h5>
      </header>
    </section>
  );
};

export default Output;
