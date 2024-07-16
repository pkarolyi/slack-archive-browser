"use client";
import { MessageWithUserAndThread } from "@/types/prisma";
import { useEffect, useRef } from "react";
import Message from "./message";

export function HighlightedMessage({
  message,
}: Readonly<{ message: MessageWithUserAndThread }>) {
  const highlightedRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (highlightedRef.current) {
      highlightedRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [highlightedRef]);

  return (
    <div ref={highlightedRef}>
      <Message message={message} highlighted />
    </div>
  );
}
