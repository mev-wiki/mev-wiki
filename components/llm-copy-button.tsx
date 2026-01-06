"use client";

import { Clipboard, ExternalLink, FileText, ChevronDown, Bot, Sparkles } from "lucide-react";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import { withBasePath } from "@/lib/env";

type CopyState = "idle" | "copying" | "success" | "error";

type Placement = "toc" | "article";

export default function LLMCopyButton({
  href,
  placement = "article",
}: {
  href?: string;
  placement?: Placement;
}) {
  const [slot, setSlot] = useState<HTMLElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();
  const target = useMemo(() => (href ?? pathname ?? "").replace(/\\/g, "/"), [href, pathname]);
  const [state, setState] = useState<CopyState>("idle");
  const [open, setOpen] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");
  const [markdownMap, setMarkdownMap] = useState<Record<string, string> | null>(null);
  const [loadingMap, setLoadingMap] = useState(false);

  // Create/attach a slot inside the TOC so the button sits with the page actions.
  useEffect(() => {
    if (placement !== "toc") return;

    let node: HTMLElement | null = null;
    let attempts = 0;

    const attach = () => {
      const tocInner = document.querySelector("#nd-toc > div");
      const toc = (tocInner || document.getElementById("nd-toc")) as HTMLElement | null;
      if (!toc) return false;

      // Reuse existing slot if present
      const existing = toc.querySelector(".llm-copy-button-wrapper");
      if (existing) {
        setSlot(existing as HTMLElement);
        return true;
      }

      node = document.createElement("div");
      node.className = "llm-copy-button-wrapper";
      node.style.marginBottom = "0.75rem";
      toc.insertBefore(node, toc.firstChild);
      setSlot(node);
      return true;
    };

    if (!attach()) {
      const interval = setInterval(() => {
        attempts += 1;
        if (attach() || attempts > 10) {
          clearInterval(interval);
        }
      }, 50);
      return () => {
        clearInterval(interval);
        if (node?.parentElement) node.parentElement.removeChild(node);
      };
    }

    return () => {
      if (node?.parentElement) node.parentElement.removeChild(node);
    };
  }, [pathname, placement]);

  useEffect(() => {
    setCurrentUrl(typeof window !== "undefined" ? window.location.href : "");
  }, []);

  useEffect(() => {
    function onClickOutside(event: MouseEvent) {
      if (
        open &&
        dropdownRef.current &&
        event.target instanceof Node &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [open]);

  const labelMap: Record<CopyState, string> = {
    idle: "Copy page",
    copying: "Copying…",
    success: "Copied",
    error: "Retry",
  };

  const markdownEndpoint = useMemo(() => withBasePath("/api/markdown"), []);

  const chatHref = useMemo(() => {
    if (!currentUrl) return "#";
    return `https://chat.openai.com/?q=${encodeURIComponent(`Read this page: ${currentUrl}`)}`;
  }, [currentUrl]);

  const claudeHref = useMemo(() => {
    if (!currentUrl) return "#";
    return `https://claude.ai/new?q=${encodeURIComponent(`Read this page: ${currentUrl}`)}`;
  }, [currentUrl]);

  const normalizePath = useMemo(() => {
    try {
      const url = new URL(target || "/", currentUrl || window.location.origin);
      const path = (url.pathname || "/").replace(/\/+$/, "") || "/";
      return path;
    } catch {
      return (target || "/").replace(/\/+$/, "") || "/";
    }
  }, [currentUrl, target]);

  const loadMarkdownMap = async () => {
    if (markdownMap) return markdownMap;

    setLoadingMap(true);
    try {
      const res = await fetch(markdownEndpoint, { cache: "force-cache" });
      if (!res.ok) throw new Error(`Failed to load markdown index: ${res.status}`);
      const data = (await res.json()) as { pages?: { path: string; markdown: string }[] };
      const map: Record<string, string> = {};
      for (const entry of data.pages ?? []) {
        const key = (entry.path || "/").replace(/\/+$/, "") || "/";
        map[key] = entry.markdown;
      }
      setMarkdownMap(map);
      return map;
    } finally {
      setLoadingMap(false);
    }
  };

  const handleCopy = async () => {
    if (!target) return;

    setState("copying");
    try {
      const map = await loadMarkdownMap();
      const text = map?.[normalizePath];
      if (!text) {
        throw new Error(`Markdown not found for ${normalizePath}`);
      }
      await navigator.clipboard.writeText(text);
      setState("success");
      setTimeout(() => setState("idle"), 1200);
    } catch (error) {
      console.error("LLMCopyButton copy failed", error);
      setState("error");
    }
  };

  const handleOpenMarkdown = async () => {
    try {
      const map = await loadMarkdownMap();
      const text = map?.[normalizePath];
      if (!text) {
        throw new Error(`Markdown not found for ${normalizePath}`);
      }
      const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank", "noopener,noreferrer");
      setTimeout(() => URL.revokeObjectURL(url), 10000);
    } catch (error) {
      console.error("LLMCopyButton view failed", error);
      setState("error");
    }
  };

  const content = (
    <div className="relative ml-auto w-1/3 max-w-xs sm:ml-0 sm:w-full sm:max-w-none" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex w-full items-center justify-between gap-2 rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm font-medium text-neutral-900 shadow-sm transition hover:shadow-md dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-50"
      >
        <div className="inline-flex items-center gap-2">
          <Clipboard className="h-4 w-4" />
          Copy
        </div>
        <ChevronDown className="h-4 w-4" />
      </button>

      {open ? (
        <div className="absolute right-0 z-20 mt-2 w-80 overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-xl ring-1 ring-black/5 dark:border-neutral-700 dark:bg-neutral-900">
          <div className="flex flex-col divide-y divide-neutral-200 dark:divide-neutral-800">
            <button
              type="button"
              onClick={handleCopy}
              disabled={state === "copying" || loadingMap}
              className="flex w-full items-start gap-3 px-4 py-3 text-left transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-60 dark:hover:bg-neutral-800/60"
            >
              <Clipboard className="mt-0.5 h-5 w-5 text-neutral-500 dark:text-neutral-400" />
              <div>
                <div className="text-sm font-semibold text-neutral-900 dark:text-neutral-50">
                  {labelMap[state]}
                </div>
                <div className="text-xs text-neutral-500 dark:text-neutral-400">
                  Copy page as Markdown for LLMs
                </div>
              </div>
            </button>

            <button
              type="button"
              onClick={handleOpenMarkdown}
              disabled={loadingMap}
              className="flex w-full items-start gap-3 px-4 py-3 text-left transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-60 dark:hover:bg-neutral-800/60"
            >
              <FileText className="mt-0.5 h-5 w-5 text-neutral-500 dark:text-neutral-400" />
              <div className="flex w-full items-start justify-between gap-2">
                <div>
                  <div className="text-sm font-semibold text-neutral-900 dark:text-neutral-50">
                    View as Markdown
                  </div>
                  <div className="text-xs text-neutral-500 dark:text-neutral-400">
                    View this page as plain text
                  </div>
                </div>
                <ExternalLink className="h-4 w-4 text-neutral-400" />
              </div>
            </button>

            <a
              href={chatHref}
              target="_blank"
              rel="noreferrer"
              className="flex items-start gap-3 px-4 py-3 transition hover:bg-neutral-50 dark:hover:bg-neutral-800/60"
            >
              <Bot className="mt-0.5 h-5 w-5 text-neutral-500 dark:text-neutral-400" />
              <div className="flex w-full items-start justify-between gap-2">
                <div>
                  <div className="text-sm font-semibold text-neutral-900 dark:text-neutral-50">
                    Open in ChatGPT
                  </div>
                  <div className="text-xs text-neutral-500 dark:text-neutral-400">
                    Ask ChatGPT about this page
                  </div>
                </div>
                <ExternalLink className="h-4 w-4 text-neutral-400" />
              </div>
            </a>

            <a
              href={claudeHref}
              target="_blank"
              rel="noreferrer"
              className="flex items-start gap-3 px-4 py-3 transition hover:bg-neutral-50 dark:hover:bg-neutral-800/60"
            >
              <Sparkles className="mt-0.5 h-5 w-5 text-neutral-500 dark:text-neutral-400" />
              <div className="flex w-full items-start justify-between gap-2">
                <div>
                  <div className="text-sm font-semibold text-neutral-900 dark:text-neutral-50">
                    Open in Claude
                  </div>
                  <div className="text-xs text-neutral-500 dark:text-neutral-400">
                    Ask Claude about this page
                  </div>
                </div>
                <ExternalLink className="h-4 w-4 text-neutral-400" />
              </div>
            </a>
          </div>
        </div>
      ) : null}
    </div>
  );

  if (placement === "toc") {
    if (!slot) return null;
    return createPortal(content, slot);
  }

  return content;
}
