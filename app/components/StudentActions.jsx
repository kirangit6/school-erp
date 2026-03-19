"use client";

import { useRouter } from "next/navigation";
import { Trash2, Pencil } from "lucide-react";

export default function StudentActions({ id }) {
  const router = useRouter();

  const handleDelete = async () => {
    const confirmDelete = confirm("Delete this student?");
    if (!confirmDelete) return;

    await fetch(`/api/students/${id}`, {
      method: "DELETE",
    });

    window.location.reload();
  };

  return (
    <div className="flex gap-2">
      {/* Edit */}
      <button
        onClick={() => router.push(`/add-student?id=${id}`)}
        className="flex items-center gap-1 bg-blue-100 text-blue-600 px-2 py-1 rounded hover:bg-blue-200 transition"
      >
        <Pencil size={16} />
      </button>

      {/* Delete */}
      <button
        onClick={handleDelete}
        className="flex items-center gap-1 bg-red-100 text-red-600 px-2 py-1 rounded hover:bg-red-200 transition"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}