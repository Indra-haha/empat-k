import React from "react";

type HeaderProps = {
  title: string;
  addUrl: string;
};

export function AdminHeader({ title, addUrl }: HeaderProps) {
  return (
    <div className="flex flex-row w-full items-center justify-between mb-6 border-2 border-gray-200 h-16 px-8">
      <h1 className="text-2xl font-bold capitalize">{title}</h1>

      <a
        href={`${addUrl}/create`}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        + Add
      </a>
    </div>
  );
}