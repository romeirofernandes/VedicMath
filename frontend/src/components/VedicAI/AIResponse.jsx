import React from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const AIResponse = ({ content }) => {
  // Custom renderers for markdown components
  const renderers = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || "");
      return !inline && match ? (
        <SyntaxHighlighter
          style={atomDark}
          language={match[1]}
          PreTag="div"
          className="rounded-md my-2 text-sm"
          {...props}
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      ) : (
        <code className="bg-[#3a3a45] px-1 rounded text-[#e0c9b1]" {...props}>
          {children}
        </code>
      );
    },
    h1: ({ children }) => (
      <h1 className="text-xl font-bold my-3 text-[#d4b595] font-bricolage">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-lg font-bold my-2 text-[#d4b595] font-bricolage">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-md font-bold my-2 text-[#e0c9b1] font-bricolage">
        {children}
      </h3>
    ),
    ul: ({ children }) => (
      <ul className="list-disc ml-5 my-2 space-y-1">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal ml-5 my-2 space-y-1">{children}</ol>
    ),
    li: ({ children }) => <li className="text-[#e0c9b1]/90">{children}</li>,
    p: ({ children }) => <p className="my-2 text-[#e0c9b1]/90">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-[#d4b595] pl-3 my-2 italic text-[#e0c9b1]/80">
        {children}
      </blockquote>
    ),
    table: ({ children }) => (
      <div className="overflow-x-auto my-3">
        <table className="min-w-full border-collapse border border-[#2a2a35]">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }) => <thead className="bg-[#2a2a35]">{children}</thead>,
    tbody: ({ children }) => <tbody>{children}</tbody>,
    tr: ({ children }) => (
      <tr className="border-t border-[#2a2a35]">{children}</tr>
    ),
    th: ({ children }) => (
      <th className="py-2 px-4 text-left text-[#d4b595] font-semibold">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="py-2 px-4 border-r last:border-r-0 border-[#2a2a35]">
        {children}
      </td>
    ),
  };

  return (
    <div className="vedic-ai-response">
      <ReactMarkdown components={renderers}>{content}</ReactMarkdown>
    </div>
  );
};

export default AIResponse;
