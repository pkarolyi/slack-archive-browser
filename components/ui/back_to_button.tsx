"use client";

import { useRouter } from "next/navigation";
import ArrowLeftIcon from "../icons/arrow_left";

export default function BackToButton() {
  const router = useRouter();

  return (
    <button
      onClick={router.back}
      className="text-stone-700 hover:text-stone-900"
    >
      <ArrowLeftIcon className="size-6" />
    </button>
  );
}
