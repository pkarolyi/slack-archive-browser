"use client";

import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackToButton() {
  const router = useRouter();

  return (
    <button
      onClick={router.back}
      className="text-stone-700 hover:text-stone-900"
    >
      <ArrowLeftIcon strokeWidth={2.5} />
    </button>
  );
}
