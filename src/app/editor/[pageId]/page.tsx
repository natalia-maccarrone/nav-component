import React from "react";

interface PageProps {
  params: Promise<{ formId: string; pageId: string }>;
}

export default async function FormPage({ params }: PageProps) {
  const { pageId } = await params;

  return (
    <div className="mt-8">
      <h1 className="text-2xl text-gray-900 mb-4 font-bl-melody">{`Page id: ${pageId}`}</h1>
    </div>
  );
}
