"use client";
import { dracula, CopyBlock } from "react-code-blocks";

export default function CustomCodeSnippets({
  text,
  lang,
}: {
  text: string;
  lang: string;
}) {
  return (
    <CopyBlock
      customStyle={{ width: "100%", fontSize: "16px" }}
      text={text}
      language={lang}
      showLineNumbers={true}
      theme={dracula}
      wrapLongLines
    />
  );
}
