import Navmenu, { Navbar } from "@/components/Navmenu";
import { firestore } from "@/lib/firebase";
import { useDarkMode, useLocalStorage } from "@/lib/hooks";
import { doc } from "firebase/firestore";
import { useRouter } from "next/router";
import React from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { Toaster } from "react-hot-toast";
import ReactMarkdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import {
  atomOneDark,
  atomOneLight,
  docco,
} from "react-syntax-highlighter/dist/esm/styles/hljs";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import rehypeHighlight from "rehype-highlight/lib";
import remarkGfm from "remark-gfm";

export default function Thema() {
  const router = useRouter();

  const { thema } = router.query;

  const docRef = doc(firestore, `themen/${thema}`);
  const [data] = useDocument(docRef);

  return (
    <div className="flex h-full md:h-screen flex-col w-full font-poppins dark:bg-content dark:text-white">
      <Navbar />
      <Toaster />
      <main className="flex h-full flex-auto flex-col md:flex-row w-full">
        <Navmenu />
        <div className="flex w-full">
          <div className="h-min overflow-y-auto w-full">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              className="flex flex-col p-20 max-h-9/10 markdown font-semibold"
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || "");
                  return !inline && match ? (
                    <SyntaxHighlighter
                      {...props}
                      style={atomOneDark}
                      language={match[1]}
                      PreTag="div"
                      showLineNumbers={true}
                    >
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  ) : (
                    <code {...props} className={className}>
                      {children}
                    </code>
                  );
                },
              }}
            >
              {data?.data()?.inhalt}
            </ReactMarkdown>
          </div>
        </div>
      </main>
    </div>
  );
}
