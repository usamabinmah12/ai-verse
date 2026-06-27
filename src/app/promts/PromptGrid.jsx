"use client";

import React, { useState, useMemo } from "react";
import { Table, Card, Button, Chip, Input, Pagination, Spinner } from "@heroui/react"; // 💡 Spinner ইম্পোর্ট করা হয়েছে
import { Copy, Check, Layers, ArrowRight, Magnifier } from "@gravity-ui/icons";
import Link from "next/link";

export default function PromptGrid({ promtsData, totalPages, page , user, isLoading = false }) {
  const [copiedId, setCopiedId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTool, setSelectedTool] = useState("All");
  const promts = promtsData;
  console.log("Promts : ", promts);
  
  const pages = [];
  console.log("totalPages : ", totalPages);
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }
 
  const handleCopy = async (id, text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1500);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  const filteredPrompts = useMemo(() => {
    return promts.filter((item) => {
      const matchesSearch =
        item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTool =
        selectedTool === "All" || item.aiTool === selectedTool;

      return matchesSearch && matchesTool;
    });
  }, [promts, searchQuery, selectedTool]);

  const aiToolsList = useMemo(() => {
    const tools = promts.map((p) => p.aiTool).filter(Boolean);
    return ["All", ...new Set(tools)];
  }, [promts]);

  return (
    <div className="w-full space-y-6 p-1">
      {/* 🔍 Search and Filter Controls Area */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-slate-900/20 p-4 rounded-2xl border border-slate-900 backdrop-blur-sm">
        <div className="w-full sm:max-w-md">
          <Input
            type="text"
            placeholder="Search prompts by title, tags, or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            startContent={
              <Magnifier className="size-4 text-slate-400 shrink-0" />
            }
            className="w-full"
            classNames={{
              inputWrapper:
                "bg-slate-950/60 border border-slate-800 rounded-xl hover:border-slate-700/80 focus-within:!border-violet-500/50 transition-all text-slate-200",
            }}
          />
        </div>

        {/* AI Tool Pills Selection */}
        <div className="flex flex-wrap gap-2 w-full sm:w-auto justify-start sm:justify-end">
          {aiToolsList.map((tool) => (
            <button
              key={tool}
              onClick={() => setSelectedTool(tool)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border cursor-pointer capitalize ${
                selectedTool === tool
                  ? "bg-violet-600 border-violet-500 text-white shadow-lg shadow-violet-600/20"
                  : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700"
              }`}
            >
              {tool}
            </button>
          ))}
        </div>
      </div>

      {/* 🌀 4. Loading Spinner Component */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-24 space-y-4">
          {/* 💡 HeroUI Spinner দিয়ে আগের কাস্টম ডিফ-টি রিপ্লেস করা হয়েছে */}
          <Spinner size="lg" color="secondary" labelColor="secondary" />
          <p className="text-xs text-slate-400 font-mono tracking-wider animate-pulse">
            Loading AI Prompts...
          </p>
        </div>
      ) : filteredPrompts.length === 0 ? (
        /* ❌ Empty State (No Search Results Found) */
        <div className="text-center py-20 border border-dashed border-slate-850 rounded-2xl bg-slate-900/10">
          <div className="text-2xl mb-2">🔍</div>
          <h3 className="text-sm font-bold text-slate-300">No prompts found</h3>
          <p className="text-xs text-slate-500 mt-1">
            Try adjusting your keywords or switching filters.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPrompts.map((item) => {
              const isCopied = copiedId === item._id;

              return (
                <Card
                  key={item._id}
                  className="rounded-2xl border border-slate-800/80 bg-slate-900/40 hover:bg-slate-900/80 backdrop-blur-sm shadow-xl hover:shadow-violet-600/5 hover:border-violet-500/30 transition-all duration-300 overflow-hidden flex flex-col h-full group"
                >
                  {/* Thumbnail */}
                  <div className="relative h-48 w-full overflow-hidden bg-slate-950 flex items-center justify-center border-b border-slate-900/60">
                    {item.thumbnail ? (
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs font-mono font-bold uppercase tracking-widest text-slate-500 bg-gradient-to-br from-slate-950 to-slate-900">
                        {item.aiTool || "AI Prompt"}
                      </div>
                    )}

                    {/* Difficulty Badge */}
                    <div className="absolute top-3 right-3 z-10">
                      <Chip
                        size="sm"
                        color={
                          item.difficulty === "Pro"
                            ? "danger"
                            : item.difficulty === "Intermediate"
                              ? "warning"
                              : "success"
                        }
                        variant="flat"
                        className="font-semibold backdrop-blur-md bg-slate-950/80 border border-slate-800/60 text-slate-200"
                      >
                        {item.difficulty || "Beginner"}
                      </Chip>
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="p-5 flex flex-col gap-3 flex-grow">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-violet-400 bg-violet-500/10 px-2.5 py-1 rounded-md w-fit border border-violet-500/20">
                      {item.aiTool || "General"}
                    </span>

                    <h3 className="text-lg font-bold text-slate-100 group-hover:text-violet-400 transition-colors duration-200 line-clamp-1 tracking-tight">
                      {item.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-400 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Preview container */}
                    <div className="relative mt-2 group/preview">
                      <div className="bg-slate-950 border border-slate-900 rounded-xl p-3 pr-10 font-mono text-[11px] text-slate-400 line-clamp-2 leading-normal select-all">
                        {item.content || "No prompt content provided."}
                      </div>
                      <button
                        onClick={() => handleCopy(item._id, item.content)}
                        className="absolute right-2 top-2 p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-all opacity-0 group-hover/preview:opacity-100 cursor-pointer"
                        title="Copy Prompt"
                      >
                        {isCopied ? (
                          <Check className="size-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="size-3.5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="p-4 bg-slate-950/40 border-t border-slate-900/60 flex items-center justify-between gap-2 mt-auto">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 max-w-[45%] truncate">
                      <Layers className="size-3.5 text-slate-500 shrink-0" />
                      <span className="truncate">
                        {item.category || "Uncategorized"}
                      </span>
                    </div>
                      {
                        user? <Link
                      href={`/promts/${item._id || "details"}`}
                     
                    >
                      <Button
                        as="a"
                        size="sm"
                        variant="solid"
                        className="rounded-xl h-8 px-4 text-xs font-bold tracking-wide shadow-md bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white flex items-center gap-1.5 transition-all cursor-pointer"
                      >
                        See Details <ArrowRight className="size-3" />
                      </Button>
                    </Link> : <>
                    
                        <Link
                      href={`/auth/signin`}
                     
                    >
                      <Button
                        as="a"
                        size="sm"
                        variant="solid"
                        className="rounded-xl h-8 px-4 text-xs font-bold tracking-wide shadow-md bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white flex items-center gap-1.5 transition-all cursor-pointer"
                      >
                        See Details <ArrowRight className="size-3" />
                      </Button>
                    </Link> 
                    </>
                      }
                    
                  </div>
                </Card>
              );
            })}
          </div>

          <Table.Footer>
            <Pagination size="sm">
              <Pagination.Content>
                
                {/* ─── PREVIOUS BUTTON ─── */}
                <Pagination.Item>
                  <Pagination.Previous isDisabled={page === 1}>
                    {page === 1 ? (
                      <span className="flex gap-2 text-slate-600 cursor-not-allowed">
                        <Pagination.PreviousIcon /> Prev
                      </span>
                    ) : (
                      <Link
                        className="flex gap-2"
                        href={`/promts?page=${page - 1}`}
                      >
                        <Pagination.PreviousIcon /> Prev
                      </Link>
                    )}
                  </Pagination.Previous>
                </Pagination.Item>

                {/* ─── NUMBERED PAGES ─── */}
                {pages.map((p) => (
                  <Pagination.Item key={p}>
                    <Link href={`/promts?page=${p}`}>
                      <Pagination.Link isActive={p === page}>
                        {p}
                      </Pagination.Link>
                    </Link>
                  </Pagination.Item>
                ))}

                {/* ─── NEXT BUTTON (FIXED LINK & DISABLED STATE) ─── */}
                <Pagination.Item>
                  <Pagination.Next isDisabled={page === totalPages}>
                    {page === totalPages ? (
                      <span className="flex gap-2 text-slate-600 cursor-not-allowed">
                        Next <Pagination.NextIcon />
                      </span>
                    ) : (
                      <Link
                        className="flex gap-2"
                        href={`/promts?page=${page + 1}`} 
                      >
                        Next
                        <Pagination.NextIcon />
                      </Link>
                    )}
                  </Pagination.Next>
                </Pagination.Item>

              </Pagination.Content>
            </Pagination>
          </Table.Footer>
        </>
      )}
    </div>
  );
}