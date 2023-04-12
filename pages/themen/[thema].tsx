import { firestore } from "@/lib/firebase";
import { doc } from "firebase/firestore";
import { useRouter } from "next/router";
import React from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight/lib";
import remarkGfm from "remark-gfm";

export default function Thema() {
  const router = useRouter();

  const { thema } = router.query;

  const docRef = doc(firestore, `themen/${thema}`);
  const [data] = useDocument(docRef);

  return (
    <div className="">
      {data?.data()?.name}
      <ReactMarkdown
        rehypePlugins={[rehypeHighlight]}
        remarkPlugins={[remarkGfm]}
        className="ml-80 p-32 markdown"
      >
        {data?.data()?.inhalt}
      </ReactMarkdown>
    </div>
  );
}
