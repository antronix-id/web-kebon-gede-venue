"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Search,
  X,
  Loader2,
  Building2,
  Calendar,
  FileText,
  MessageSquare,
  HelpCircle,
  Compass,
  ArrowRight,
} from "lucide-react";
import { searchAdminAction } from "@/actions/search";
import { QUICK_SHORTCUTS, type SearchResultItem } from "@/lib/admin-search-data";

export default function AdminSearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut: Ctrl+K or Cmd+K to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      } else if (e.key === "Escape") {
        setIsOpen(false);
        inputRef.current?.blur();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounced search
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const timeoutId = setTimeout(async () => {
      try {
        const res = await searchAdminAction(query);
        setResults(res);
      } catch (err) {
        console.error("Search error:", err);
      } finally {
        setIsLoading(false);
      }
    }, 250);

    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleSelect = (href: string) => {
    setIsOpen(false);
    setQuery("");
    router.push(href);
  };

  const getCategoryIcon = (cat: SearchResultItem["category"]) => {
    switch (cat) {
      case "venue":
        return <Building2 className="w-3.5 h-3.5 text-blue-600" />;
      case "event":
        return <Calendar className="w-3.5 h-3.5 text-purple-600" />;
      case "blog":
        return <FileText className="w-3.5 h-3.5 text-amber-600" />;
      case "message":
        return <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />;
      case "faq":
        return <HelpCircle className="w-3.5 h-3.5 text-indigo-600" />;
      default:
        return <Compass className="w-3.5 h-3.5 text-forest" />;
    }
  };

  const getCategoryBadge = (cat: SearchResultItem["category"]) => {
    switch (cat) {
      case "venue":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "event":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "blog":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "message":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "faq":
        return "bg-indigo-50 text-indigo-700 border-indigo-200";
      default:
        return "bg-forest/10 text-forest border-forest/20";
    }
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Search Input Container */}
      <div className="relative flex items-center">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 flex items-center">
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin text-forest" />
          ) : (
            <Search className="w-4 h-4" />
          )}
        </div>

        <input
          ref={inputRef}
          type="text"
          value={query}
          onFocus={() => setIsOpen(true)}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          placeholder="Cari di CMS..."
          className="pl-9 pr-14 py-1.5 text-xs rounded-full border border-gray-200 bg-gray-50/50 hover:bg-white focus:bg-white focus:outline-none focus:border-forest focus:ring-2 focus:ring-forest/15 w-44 sm:w-60 focus:w-72 sm:focus:w-80 transition-all duration-300 shadow-xs"
        />

        {/* Clear or Shortcut Hint */}
        <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {query ? (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setResults([]);
                inputRef.current?.focus();
              }}
              className="p-1 rounded-full text-gray-400 hover:text-charcoal hover:bg-gray-100 transition-colors"
              title="Bersihkan pencarian"
            >
              <X className="w-3 h-3" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-medium text-gray-400 bg-white border border-gray-200 rounded shadow-2xs pointer-events-none">
              Ctrl K
            </kbd>
          )}
        </div>
      </div>

      {/* Results Dropdown Popover */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150">
          {/* Header */}
          <div className="px-4 py-2.5 bg-gray-50/80 border-b border-gray-100 flex items-center justify-between text-xs text-gray-500">
            <span className="font-semibold text-charcoal">
              {query.trim() ? "Hasil Pencarian" : "Pintasan Menu Cepat"}
            </span>
            {query.trim() && (
              <span className="text-[11px] text-gray-400">
                {results.length} ditemukan
              </span>
            )}
          </div>

          <div className="max-h-80 overflow-y-auto divide-y divide-gray-50 p-1.5">
            {/* Empty Query: Show Quick Shortcuts */}
            {!query.trim() && (
              <div className="py-1">
                <p className="px-3 py-1.5 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                  Menu Populer
                </p>
                {QUICK_SHORTCUTS.slice(0, 6).map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelect(item.href)}
                    className="w-full px-3 py-2 rounded-xl text-left hover:bg-gray-50 flex items-center justify-between gap-3 group transition-colors"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="p-1.5 rounded-lg bg-gray-100 text-gray-600 group-hover:bg-forest/10 group-hover:text-forest transition-colors shrink-0">
                        {getCategoryIcon(item.category)}
                      </div>
                      <div className="truncate">
                        <p className="text-xs font-semibold text-charcoal group-hover:text-forest transition-colors truncate">
                          {item.title}
                        </p>
                        <p className="text-[11px] text-gray-400 truncate">
                          {item.subtitle}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-forest transition-colors shrink-0" />
                  </button>
                ))}
              </div>
            )}

            {/* Active Search Results */}
            {query.trim() && (
              <>
                {results.length > 0 ? (
                  results.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleSelect(item.href)}
                      className="w-full px-3 py-2.5 rounded-xl text-left hover:bg-gray-50 flex items-center justify-between gap-3 group transition-colors"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="p-1.5 rounded-lg bg-gray-100 shrink-0">
                          {getCategoryIcon(item.category)}
                        </div>
                        <div className="truncate">
                          <p className="text-xs font-semibold text-charcoal group-hover:text-forest transition-colors truncate">
                            {item.title}
                          </p>
                          <p className="text-[11px] text-gray-400 truncate">
                            {item.subtitle}
                          </p>
                        </div>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider border shrink-0 ${getCategoryBadge(item.category)}`}>
                        {item.category}
                      </span>
                    </button>
                  ))
                ) : !isLoading ? (
                  <div className="py-8 px-4 text-center">
                    <p className="text-xs font-semibold text-charcoal mb-1">
                      Tidak ada hasil untuk &ldquo;{query}&rdquo;
                    </p>
                    <p className="text-[11px] text-gray-400 max-w-xs mx-auto">
                      Coba kata kunci lain seperti nama venue, judul acara, email, atau menu CMS.
                    </p>
                  </div>
                ) : null}
              </>
            )}
          </div>

          {/* Footer hint */}
          <div className="px-3.5 py-2 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400">
            <span>Tekan <kbd className="px-1 py-0.5 bg-white border rounded text-[10px]">ESC</kbd> untuk menutup</span>
            <span>Navigasi langsung</span>
          </div>
        </div>
      )}
    </div>
  );
}
