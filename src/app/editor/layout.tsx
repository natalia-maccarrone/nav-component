"use client";

import React from "react";
import { useParams } from "next/navigation";
import { NavigationBar } from "@/components/NavigationBar";

export default function EditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const pageId = String(params.pageId);

  return (
    <div className="h-screen w-full bg-gray-50 flex flex-col p-4 gap-4">
      <div className="flex-1 bg-gray-100 border border-gray-200 w-full rounded-2xl flex justify-center items-center shadow-sm">
        {children}
      </div>
      <NavigationBar currentPageId={pageId} />
    </div>
  );
}
