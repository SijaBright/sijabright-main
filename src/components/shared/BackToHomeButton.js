"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function BackToHomeButton() {
  const handleClick = () => {
    const lastSection = sessionStorage.getItem("lastVisitedSection");
    if (lastSection && lastSection !== "home") {
      const state = { sectionId: lastSection };
      window.history.pushState(state, "", "/");
    }
  };

  return (
    <Link
      href="/"
      onClick={handleClick}
      className="inline-flex items-center gap-2 bg-[#00c7fe] hover:bg-[#00a7dc] text-black font-medium py-3 px-8 rounded-full transition-colors duration-300 text-lg"
    >
      <ArrowLeft className="w-5 h-5" />
      Back to Homepage
    </Link>
  );
}
