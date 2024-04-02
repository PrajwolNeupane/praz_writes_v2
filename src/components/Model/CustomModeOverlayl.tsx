"use client";
import React from "react";
import { useSearchStore } from "@/store";

interface PropsType {
  child: any;
}

export default function CustomModelOverlay({ child }: PropsType) {
  const { setOpen } = useSearchStore();

  return (
    <div
      id="search-model-overlay"
      onClick={(e: any) => {
        if (e.target.id == "search-model-overlay") {
          setOpen(false);
        }
      }}
      className="w-[100vw] h-[100vh] fixed top-0 z-[11] bg-[rgb(0,0,0,0.8)] overflow-hidden"
    >
      {child}
    </div>
  );
}
