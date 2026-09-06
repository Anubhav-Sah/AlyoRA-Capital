"use client";

import React, { useState } from "react";
import {
  DndContext, closestCenter, PointerSensor, KeyboardSensor,
  useSensor, useSensors, DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext, sortableKeyboardCoordinates, useSortable,
  arrayMove, verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  GripVertical, Plus, Trash2, Eye, EyeOff, ChevronDown, ChevronUp,
  Image as ImageIcon, Link, Type, Save, X,
} from "lucide-react";
import type { PageCard } from "@/lib/content-client";

interface CardEditorProps {
  cards: PageCard[];
  onSave: (card: Partial<PageCard>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onReorder: (cards: PageCard[]) => Promise<void>;
  onToggleVisible: (id: string, visible: boolean) => Promise<void>;
  page: string;
  section: string;
}

function SortableCard({
  card,
  onDelete,
  onToggle,
  onEdit,
}: {
  card: PageCard;
  onDelete: (id: string) => void;
  onToggle: (id: string, v: boolean) => void;
  onEdit: (card: PageCard) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: card.id });
  const style = { transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.5 : 1 };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-white border rounded-xl p-4 group transition-all ${
        card.visible ? "border-gray-200" : "border-gray-100 bg-gray-50 opacity-60"
      }`}
    >
      <div className="flex items-start gap-3">
        <button {...attributes} {...listeners} className="cursor-grab text-gray-300 hover:text-gray-500 mt-1 touch-none flex-shrink-0">
          <GripVertical className="w-4 h-4" />
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="text-sm font-semibold text-gray-800 truncate">{card.title || "(no title)"}</h4>
            {card.badge && (
              <span className="bg-amber-100 text-amber-700 text-[9px] font-bold px-1.5 py-0.5 rounded uppercase">
                {card.badge}
              </span>
            )}
          </div>
          {card.subtitle && <p className="text-xs text-gray-500 truncate">{card.subtitle}</p>}
          {card.description && (
            <p className="text-[11px] text-gray-400 mt-1 line-clamp-2">{card.description}</p>
          )}
          {card.image_url && (
            <div className="flex items-center gap-1 mt-1 text-[10px] text-blue-500">
              <ImageIcon className="w-3 h-3" />
              <span className="truncate max-w-xs">Has image</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-1.5 flex-shrink-0">
          <button
            onClick={() => onToggle(card.id, !card.visible)}
            className={`p-1.5 rounded cursor-pointer transition-colors ${
              card.visible ? "text-[#1E7A3A] hover:bg-green-50" : "text-gray-300 hover:bg-gray-100"
            }`}
          >
            {card.visible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={() => onEdit(card)}
            className="p-1.5 rounded text-gray-400 hover:text-blue-600 hover:bg-blue-50 cursor-pointer transition-colors"
          >
            <Type className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onDelete(card.id)}
            className="p-1.5 rounded text-gray-300 hover:text-red-500 hover:bg-red-50 cursor-pointer opacity-0 group-hover:opacity-100 transition-all"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

const emptyCard = (page: string, section: string, position: number): Partial<PageCard> => ({
  page, section, position, title: "", subtitle: "", description: "",
  image_url: "", button_label: "", button_url: "", badge: "", visible: true,
  extra_data: {},
});

export default function CardEditor({
  cards: initialCards, onSave, onDelete, onReorder, onToggleVisible, page, section,
}: CardEditorProps) {
  const [cards, setCards] = useState<PageCard[]>(initialCards);
  const [editingCard, setEditingCard] = useState<Partial<PageCard> | null>(null);
  const [saving, setSaving] = useState(false);

  React.useEffect(() => { setCards(initialCards); }, [initialCards]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIdx = cards.findIndex((c) => c.id === active.id);
    const newIdx = cards.findIndex((c) => c.id === over.id);
    const reordered = arrayMove(cards, oldIdx, newIdx).map((c, i) => ({ ...c, position: i }));
    setCards(reordered);
    await onReorder(reordered);
  };

  const handleSave = async () => {
    if (!editingCard) return;
    setSaving(true);
    await onSave(editingCard);
    setSaving(false);
    setEditingCard(null);
  };

  const Field = ({
    label, field, multiline = false,
  }: { label: string; field: keyof PageCard; multiline?: boolean }) => (
    <div>
      <label className="block text-xs font-semibold text-gray-600 mb-1">{label}</label>
      {multiline ? (
        <textarea
          value={(editingCard?.[field] as string) || ""}
          onChange={(e) => setEditingCard({ ...editingCard!, [field]: e.target.value })}
          rows={3}
          className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-[#1E7A3A] resize-none"
        />
      ) : (
        <input
          type="text"
          value={(editingCard?.[field] as string) || ""}
          onChange={(e) => setEditingCard({ ...editingCard!, [field]: e.target.value })}
          className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-[#1E7A3A]"
        />
      )}
    </div>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
          Cards ({cards.length})
        </p>
        <button
          onClick={() => setEditingCard(emptyCard(page, section, cards.length))}
          className="flex items-center gap-1.5 text-xs text-white bg-[#1E7A3A] hover:bg-[#27A84E] px-3 py-1.5 rounded-lg font-semibold cursor-pointer transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Card
        </button>
      </div>

      {/* Sortable cards */}
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={cards.map((c) => c.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-3">
            {cards.map((card) => (
              <SortableCard
                key={card.id}
                card={card}
                onDelete={async (id) => {
                  await onDelete(id);
                  setCards(cards.filter((c) => c.id !== id));
                }}
                onToggle={async (id, v) => {
                  await onToggleVisible(id, v);
                  setCards(cards.map((c) => c.id === id ? { ...c, visible: v } : c));
                }}
                onEdit={setEditingCard}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {cards.length === 0 && !editingCard && (
        <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center text-gray-400 text-sm">
          No cards yet. Click <strong>Add Card</strong> to create one.
        </div>
      )}

      {/* Edit / Create Modal */}
      {editingCard && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h3 className="text-base font-bold text-gray-900">
                {editingCard.id ? "Edit Card" : "New Card"}
              </h3>
              <button onClick={() => setEditingCard(null)} className="text-gray-400 hover:text-gray-700 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <Field label="Title *" field="title" />
              <Field label="Subtitle" field="subtitle" />
              <Field label="Description" field="description" multiline />
              <Field label="Image URL" field="image_url" />
              <Field label="Button Label" field="button_label" />
              <Field label="Button URL" field="button_url" />
              <Field label="Badge Text" field="badge" />
              <div className="flex items-center gap-2">
                <input
                  id="card-visible"
                  type="checkbox"
                  checked={editingCard.visible ?? true}
                  onChange={(e) => setEditingCard({ ...editingCard, visible: e.target.checked })}
                  className="rounded"
                />
                <label htmlFor="card-visible" className="text-sm text-gray-600 cursor-pointer">
                  Visible on site
                </label>
              </div>
            </div>
            <div className="p-5 border-t border-gray-100 flex gap-3">
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex-1 bg-[#1E7A3A] hover:bg-[#27A84E] text-white text-sm font-semibold py-2.5 rounded-lg cursor-pointer flex items-center justify-center gap-2 transition-colors"
              >
                {saving ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                {saving ? "Saving..." : "Save Card"}
              </button>
              <button
                onClick={() => setEditingCard(null)}
                className="px-4 py-2.5 text-sm text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
