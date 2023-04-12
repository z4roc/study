import React from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import "../styles/index.css";

export default function PostContent(post: any) {
  return (
    <div>
      <h1>{post?.title}</h1>
      <span>
        <ReactMarkdown className="markdown">{post?.content}</ReactMarkdown>
      </span>
    </div>
  );
}
