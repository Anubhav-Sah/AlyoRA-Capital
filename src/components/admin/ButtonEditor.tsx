"use client";

import React, { useState } from "react";
import { Plus, Trash2, ExternalLink, GripVertical, Type, Link } from "lucide-react";
import {
  DndContext, closestCenter, PointerSensor, useSensor, useSensors, DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext, useSortable, arrayMove, verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export interface ButtonItem {
  id: string;
  label: string;
  url: string;
  style: "primary" | "secondary" | "outline" | "link";
  openInNewTab: boolean;
}

interface ButtonEditorProps {
  buttons: ButtonItem[];
  onChange: (buttons: ButtonItem[]) => void;
}

const styleOptions: ButtonItem["style"][] = ["primary", "secondary", "outline", "link"];

const stylePreview: Record<ButtonItem["style"], string> = {
  primary: "bg-[#1E7A3A] text-white",
  secondary: "bg-[#0D1F3C] text-white",
  outline: "border border-[#1E7A3A] text-[#1E7A3A]",
  link: "text-[#1E7A3A] underline",
};

function SortableButton({
  btn,
  onChange,
  onDelete,
}: {
  btn: ButtonItem;
  onChange: (updated: ButtonItem) => void;
  onDelete: (id: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: btn.id });
  const style = { transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.4 : 1 };
  const [open, setOpen] = useState(false);

  return (
    <div ref={setNodeRef} style={style} className="border border-gray-200 rounded-lg bg-white overflow-hidden">
      <div className="flex items-center gap-2 px-3 py-2">
        <button {...attributes} {...listeners} className="cursor-grab text-gray-300 touch-none">
          <GripVertical className="w-3.5 h-3.5" />
        </button>
        {/* Preview */}
        <div className={`text-xs font-semibold px-2.5 py-1 rounded-md ${stylePreview[btn.style]}`}>
          {btn.label || "(no label)"}
        </div>
        <span className="text-[10px] text-gray-400 flex-1 truncate">{btn.url || "(no url)"}</span>
        <button onClick={() => setOpen(!open)} className="text-gray-400 hover:text-gray-700 cursor-pointer text-[10px] underline">
          {open ? "Close" : "Edit"}
        </button>
        <button onClick={() => onDelete(btn.id)} className="text-gray-300 hover:text-red-500 cursor-pointer">
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {open && (
        <div className="px-3 pb-3 space-y-2 bg-gray-50 border-t border-gray-100">
          <div className="grid grid-cols-2 gap-2 pt-2">
            <div>
              <label className="text-[10px] text-gray-500 font-semibold block mb-0.5">Label</label>
              <input
                type="text"
                value={btn.label}
                onChange={(e) => onChange({ ...btn, label: e.target.value })}
                className="w-full text-xs border border-gray-200 rounded px-2 py-1.5 focus:outline-none focus:border-[#1E7A3A]"
              />
            </div>
            <div>
              <label className="text-[10px] text-gray-500 font-semibold block mb-0.5">URL</label>
              <input
                type="text"
                value={btn.url}
                onChange={(e) => onChange({ ...btn, url: e.target.value })}
                className="w-full text-xs border border-gray-200 rounded px-2 py-1.5 focus:outline-none focus:border-[#1E7A3A]"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div>
              <label className="text-[10px] text-gray-500 font-semibold block mb-0.5">Style</label>
              <select
                value={btn.style}
                onChange={(e) => onChange({ ...btn, style: e.target.value as ButtonItem["style"] })}
                className="text-xs border border-gray-200 rounded px-2 py-1.5 focus:outline-none"
              >
                {styleOptions.map((s) => (
                  <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                ))}
              </select>
            </div>
            <label className="flex items-center gap-1.5 text-xs text-gray-600 cursor-pointer mt-4">
              <input
                type="checkbox"
                checked={btn.openInNewTab}
                onChange={(e) => onChange({ ...btn, openInNewTab: e.target.checked })}
                className="rounded"
              />
              Open in new tab
            </label>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ButtonEditor({ buttons, onChange }: ButtonEditorProps) {
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIdx = buttons.findIndex((b) => b.id === active.id);
    const newIdx = buttons.findIndex((b) => b.id === over.id);
    onChange(arrayMove(buttons, oldIdx, newIdx));
  };

  const addButton = () => {
    onChange([
      ...buttons,
      {
        id: `btn-${Date.now()}`,
        label: "New Button",
        url: "/",
        style: "primary",
        openInNewTab: false,
      },
    ]);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Buttons</p>
        <button
          onClick={addButton}
          className="flex items-center gap-1 text-xs text-[#1E7A3A] font-semibold hover:underline cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Button
        </button>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={buttons.map((b) => b.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-2">
            {buttons.map((btn) => (
              <SortableButton
                key={btn.id}
                btn={btn}
                onChange={(updated) => onChange(buttons.map((b) => b.id === updated.id ? updated : b))}
                onDelete={(id) => onChange(buttons.filter((b) => b.id !== id))}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {buttons.length === 0 && (
        <div className="text-center py-4 text-gray-400 text-xs border-2 border-dashed border-gray-200 rounded-lg">
          No buttons configured
        </div>
      )}
    </div>
  );
}
