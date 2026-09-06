"use client";

import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Eye, EyeOff, Plus, Trash2 } from "lucide-react";

import type { PageSection as Section } from "@/lib/content-client";


interface SectionManagerProps {
  sections: Section[];
  onReorder: (sections: Section[]) => void;
  onToggleVisibility: (id: string, visible: boolean) => void;
  onAddSection?: () => void;
}

function SortableSectionItem({
  section,
  onToggle,
  onDelete,
}: {
  section: Section;
  onToggle: (id: string, v: boolean) => void;
  onDelete?: (id: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: section.id });
  const style = { transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.5 : 1 };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-3 bg-white border rounded-lg px-3 py-2.5 group transition-all ${
        section.visible ? "border-gray-200" : "border-gray-100 bg-gray-50 opacity-70"
      }`}
    >
      <button {...attributes} {...listeners} className="cursor-grab text-gray-300 hover:text-gray-500 touch-none">
        <GripVertical className="w-4 h-4" />
      </button>
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium truncate ${section.visible ? "text-gray-800" : "text-gray-400"}`}>
          {section.title}
        </p>
        <p className="text-[10px] text-gray-400 font-mono">{section.section_id}</p>
      </div>
      <button
        onClick={() => onToggle(section.id, !section.visible)}
        className={`p-1 rounded cursor-pointer transition-colors ${
          section.visible ? "text-[#1E7A3A] hover:bg-green-50" : "text-gray-400 hover:bg-gray-100"
        }`}
        title={section.visible ? "Hide section" : "Show section"}
      >
        {section.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
      </button>
      {onDelete && (
        <button
          onClick={() => onDelete(section.id)}
          className="p-1 rounded text-gray-300 hover:text-red-500 hover:bg-red-50 cursor-pointer opacity-0 group-hover:opacity-100 transition-all"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}

export default function SectionManager({ sections, onReorder, onToggleVisibility, onAddSection }: SectionManagerProps) {
  const [items, setItems] = useState<Section[]>(sections);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  React.useEffect(() => { setItems(sections); }, [sections]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIdx = items.findIndex((i) => i.id === active.id);
    const newIdx = items.findIndex((i) => i.id === over.id);
    const reordered = arrayMove(items, oldIdx, newIdx).map((item, index) => ({
      ...item,
      position: index,
    }));
    setItems(reordered);
    onReorder(reordered);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Section Visibility & Order</p>
        {onAddSection && (
          <button
            onClick={onAddSection}
            className="flex items-center gap-1 text-xs text-[#1E7A3A] font-semibold hover:underline cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Section
          </button>
        )}
      </div>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
          {items.map((section) => (
            <SortableSectionItem
              key={section.id}
              section={section}
              onToggle={onToggleVisibility}
            />
          ))}
        </SortableContext>
      </DndContext>
      {items.length === 0 && (
        <div className="text-center py-6 text-gray-400 text-sm border-2 border-dashed border-gray-200 rounded-lg">
          No sections configured yet
        </div>
      )}
    </div>
  );
}
