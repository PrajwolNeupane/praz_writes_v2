"use client";

import React from "react";
import { useSearchStore } from "@/store";

export default function ShortCutKeyProvider({ children }: { children: any }) {
  const { setOpen, isOpen } = useSearchStore();

  const setModal = (event: KeyboardEvent) => {
    if (event.key === "k" && event.ctrlKey) {
      event.preventDefault();
      setOpen(!isOpen);
    }
  };

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      document.addEventListener("keydown", setModal);
    }

    return () => {
      if (typeof window !== "undefined") {
        document.removeEventListener("keydown", setModal);
      }
    };
  }, [setModal]);

  return <>{children}</>;
}
