import Navmenu, { Navbar } from "@/components/Navmenu";
import { firestore } from "@/lib/firebase";
import { doc } from "firebase/firestore";
import { useRouter } from "next/router";
import React from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { Toaster } from "react-hot-toast";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight/lib";
import remarkGfm from "remark-gfm";

export default function Thema() {
  const router = useRouter();

  const { thema } = router.query;

  const docRef = doc(firestore, `themen/${thema}`);
  const [data] = useDocument(docRef);

  return (
    <div className="flex h-screen flex-col w-full font-poppins bg-content text-white">
      <Navbar />
      <Toaster />
      <main className="flex h-full flex-auto w-full">
        <Navmenu />
        <div className="p-12">
          <h1>{data?.data()?.name}</h1>
          <ReactMarkdown
            rehypePlugins={[rehypeHighlight]}
            remarkPlugins={[remarkGfm]}
            className="markdown font-semibold"
          >
            {data?.data()?.inhalt}
          </ReactMarkdown>
        </div>
      </main>
    </div>
  );
}
