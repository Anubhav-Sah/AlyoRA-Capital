"use client";

import { useEffect, useState, useCallback } from "react";
import {
  getSiteContent,
  getPageCards,
  getPageSections,
  getPdfFiles,
  type PageCard,
  type PageSection,
  type PdfFile,
} from "@/lib/content-client";

export function usePageData(pageKey: string) {
  const [content, setContent] = useState<Record<string, string>>({});
  const [cards, setCards] = useState<PageCard[]>([]);
  const [sections, setSections] = useState<PageSection[]>([]);
  const [pdfs, setPdfs] = useState<PdfFile[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const [cnt, crd, sec, pdf] = await Promise.all([
        getSiteContent(pageKey),
        getPageCards(pageKey),
        getPageSections(pageKey),
        getPdfFiles(pageKey),
      ]);

      const map: Record<string, string> = {};
      for (const item of cnt) {
        if (item.value !== null && item.value !== undefined) {
          map[`${item.section}:${item.key}`] = item.value;
        }
      }
      setContent(map);
      setCards(crd);
      setSections(sec);
      setPdfs(pdf);
    } catch {
      // Graceful fallback to initial values
    } finally {
      setLoading(false);
    }
  }, [pageKey]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const getContent = useCallback(
    (section: string, key: string, fallback: string = ""): string => {
      const val = content[`${section}:${key}`];
      return val !== undefined && val !== "" ? val : fallback;
    },
    [content]
  );

  const isSectionVisible = useCallback(
    (sectionId: string, defaultVisible = true): boolean => {
      const sec = sections.find((s) => s.section_id === sectionId);
      return sec ? sec.visible : defaultVisible;
    },
    [sections]
  );

  return {
    content,
    cards,
    sections,
    pdfs,
    loading,
    getContent,
    isSectionVisible,
    refresh,
  };
}
