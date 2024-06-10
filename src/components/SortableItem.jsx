import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { LuGripVertical } from "react-icons/lu";

export function SortableItem(props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex bg-slate-600 rounded border text-white"
    >
      <button
        className="border-r p-1 hover:bg-slate-500"
        {...attributes}
        {...listeners}
      >
        <LuGripVertical size={22} />
      </button>
      {props.children}
    </div>
  );
}
