"use client";

import React, { useState } from "react";
import { Card, Button, Chip } from "@heroui/react";
import { Copy, Check, Layers, ArrowRight } from "@gravity-ui/icons";
import Link from "next/link";

export default function PromptGrid({ promts = [] }) {
    const [copiedId, setCopiedId] = useState(null);

    const handleCopy = async (id, text) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedId(id);
            setTimeout(() => setCopiedId(null), 1500);
        } catch (err) {
            console.error("Copy failed", err);
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-1">
            {promts.map((item) => {
                const isCopied = copiedId === item._id;

                return (
                    <Card
                        key={item._id}
                        className="rounded-2xl border border-slate-800/80 bg-slate-900/40 hover:bg-slate-900/80 backdrop-blur-sm shadow-xl hover:shadow-violet-600/5 hover:border-violet-500/30 transition-all duration-300 overflow-hidden flex flex-col h-full group"
                    >
                        {/* 1. Image / Thumbnail Section */}
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

                        {/* 2. Text Content Section */}
                        <div className="p-5 flex flex-col gap-3 flex-grow">
                            {/* AI Tool Name */}
                            <span className="text-[10px] font-extrabold uppercase tracking-widest text-violet-400 bg-violet-500/10 px-2.5 py-1 rounded-md w-fit border border-violet-500/20">
                                {item.aiTool || "General"}
                            </span>

                            {/* Title */}
                            <h3 className="text-lg font-bold text-slate-100 group-hover:text-violet-400 transition-colors duration-200 line-clamp-1 tracking-tight">
                                {item.title}
                            </h3>

                            {/* Description */}
                            <p className="text-xs sm:text-sm text-slate-400 line-clamp-2 leading-relaxed">
                                {item.description}
                            </p>

                            {/* 3. Prompt Preview container with hover-triggered copy button */}
                            <div className="relative mt-2 group/preview">
                                <div className="bg-slate-950 border border-slate-900 rounded-xl p-3 pr-10 font-mono text-[11px] text-slate-400 line-clamp-2 leading-normal select-all">
                                    {item.content || "No prompt content provided."}
                                </div>
                                <button
                                    onClick={() => handleCopy(item._id, item.content)}
                                    className="absolute right-2 top-2 p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-all opacity-0 group-hover/preview:opacity-100 cursor-pointer"
                                    title="Copy Prompt"
                                >
                                    {isCopied ? <Check className="size-3.5 text-emerald-400" /> : <Copy className="size-3.5" />}
                                </button>
                            </div>
                        </div>

                        {/* 4. Footer Section */}
                        <div className="p-4 bg-slate-950/40 border-t border-slate-900/60 flex items-center justify-between gap-2 mt-auto">
                            {/* Category */}
                            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 max-w-[45%] truncate">
                                <Layers className="size-3.5 text-slate-500 shrink-0" />
                                <span className="truncate">{item.category || "Uncategorized"}</span>
                            </div>

                            {/* See Details Button */}
                            <Link href={`/promts/${item._id || 'details'}`} passHref legacyBehavior>
                                <Button
                                    as="a"
                                    size="sm"
                                    variant="solid"
                                    className="rounded-xl h-8 px-4 text-xs font-bold tracking-wide shadow-md bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white flex items-center gap-1.5 transition-all cursor-pointer"
                                >
                                    See Details <ArrowRight className="size-3" />
                                </Button>
                            </Link>
                        </div>
                    </Card>
                );
            })}
        </div>
    );
}