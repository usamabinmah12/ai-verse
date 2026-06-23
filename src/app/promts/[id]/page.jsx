import React from 'react';
import { getUserSession } from '@/lib/core/session';
import { Card, Button, Chip } from "@heroui/react";
import { 
    FileText, Layers, Sliders, Eye, Copy, Check, 
    Sparkles, Lock, Star, Bookmark, Person, ChevronLeft 
} from "@gravity-ui/icons";
import Link from 'next/link';
import DetailActionArea from '@/components/DetailActionArea';

async function getSinglePrompt(id) {
    try {
        const res = await fetch(`http://localhost:5000/api/promts/${id}`, { cache: 'no-store' });
        if (!res.ok) return null;
        return res.json();
    } catch (err) {
        console.error("Error fetching prompt details:", err);
        return null;
    }
}

const DetailsPage = async ({ params }) => {
    const { id } = await params;
    const prompt = await getSinglePrompt(id);
    const user = await getUserSession();

    const isPremiumUser = user?.plan === "premium" || user?.isPremium === true; 
    
    if (!prompt) {
        return (
            <div className="max-w-4xl mx-auto p-10 text-center">
                <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-200">Prompt not found!</h2>
                <Link href="/promts" className="text-blue-500 hover:underline mt-4 inline-block">Back to Marketplace</Link>
            </div>
        );
    }

    const isLocked = prompt.visibility?.toLowerCase() === "private" && !isPremiumUser;

    return (
        <div className="max-w-5xl mx-auto px-4 py-12 sm:px-6 lg:px-8 bg-slate-950 min-h-screen text-slate-100 relative">
            {/* Ambient Background Mesh */}
            <div className="absolute top-[20%] right-[-10%] w-[350px] h-[350px] rounded-full bg-violet-600/5 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[20%] left-[-10%] w-[350px] h-[350px] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none" />

            {/* Back Button */}
            <Link href="/promts" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-violet-400 mb-8 font-medium transition-colors group">
                <ChevronLeft className="size-4 group-hover:-translate-x-0.5 transition-transform" /> Back to Marketplace
            </Link>

            {/* Top Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
               
                {/* Main Details Area */}
                <div className="lg:col-span-2 space-y-6 relative z-10">
                    <Card className="p-6 bg-slate-900/40 border border-slate-800/80 rounded-2xl shadow-xl backdrop-blur-sm">
                        {/* Meta Tags */}
                        {prompt.thumbnail && (
                            <div className="mb-6 rounded-xl overflow-hidden border border-slate-800/80 max-h-72 w-full flex items-center justify-center bg-slate-950">
                                <img src={prompt.thumbnail} alt={prompt.title} className="w-full h-full object-cover" />
                            </div>
                        )}
                        <div className="flex flex-wrap items-center gap-2 mb-4">
                            <Chip size="sm" variant="flat" className="font-extrabold uppercase tracking-wider bg-violet-500/10 text-violet-400 border border-violet-500/20">{prompt.aiTool}</Chip>
                            <Chip size="sm" variant="flat" color={prompt.difficulty === 'Pro' ? 'danger' : prompt.difficulty === 'Intermediate' ? 'warning' : 'success'} className="font-bold capitalize">{prompt.difficulty || "Beginner"}</Chip>
                            <Chip size="sm" variant="bordered" className="font-semibold border-slate-800 text-slate-300">{prompt.visibility}</Chip>
                        </div>

                        {/* Title */}
                        <h1 className="text-2xl sm:text-3xl font-black text-slate-100 tracking-tight mb-4">
                            {prompt.title}
                        </h1>

                        {/* Description */}
                        <p className="text-slate-350 text-sm sm:text-base leading-relaxed mb-6">
                            {prompt.description}
                        </p>

                        <hr className="border-slate-800/85 my-6" />

                        {/* Content Box */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                                <FileText className="size-4 text-violet-400" /> Prompt Code / Content
                            </h3>

                            {isLocked ? (
                                <div className="relative border border-slate-850 rounded-2xl overflow-hidden p-6 bg-slate-950/80 text-center flex flex-col items-center justify-center min-h-[220px]">
                                    {/* Blurred Content */}
                                    <div className="absolute inset-0 p-4 font-mono text-xs text-slate-700 blur-[6px] select-none pointer-events-none text-left">
                                        Act as an expert software architect... [LOCKED CONTENT] <br />
                                        Generate a microservice structure based on NestJS and Docker. <br />
                                        Include comprehensive error handling and centralized logging system.
                                    </div>
                                    <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px]" />
                                    
                                    {/* Premium Block */}
                                    <div className="relative z-10 flex flex-col items-center max-w-sm px-4">
                                        <div className="p-3 bg-amber-500/10 text-amber-400 rounded-full border border-amber-500/20 mb-3">
                                            <Lock className="size-6" />
                                        </div>
                                        <h4 className="text-base font-bold text-slate-200">Premium Prompt Content Locked</h4>
                                        <p className="text-xs text-slate-400 mt-1 mb-4">
                                            This high-tier prompt is exclusive to premium subscribers. Upgrade to get instant copy access.
                                        </p>
                                        <Link href="/payment" passHref legacyBehavior>
                                            <Button 
                                                as="a" 
                                                className="w-full font-bold text-xs rounded-xl shadow-md bg-amber-500 hover:bg-amber-600 text-slate-950 transition-all duration-200"
                                            >
                                                Subscribe to Premium
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            ) : (
                                <DetailActionArea promptText={prompt.content} promptId={prompt._id} />
                            )}
                        </div>
                    </Card>

                    {/* Usage Instructions */}
                    <Card className="p-6 bg-slate-900/40 border border-slate-800/80 rounded-2xl shadow-xl backdrop-blur-sm">
                        <h3 className="text-sm font-bold text-slate-200 mb-3">💡 Usage Instructions</h3>
                        <ul className="text-xs sm:text-sm text-slate-400 space-y-2.5 list-disc list-inside">
                            <li>Copy the prompt using the "Copy Prompt" button above.</li>
                            <li>Paste it into your {prompt.aiTool || "AI Tool"} interface.</li>
                            <li>Replace any bracketed placeholders with your specific data.</li>
                        </ul>
                    </Card>

                    {/* Reviews */}
                    <Card className="p-6 bg-slate-900/40 border border-slate-800/80 rounded-2xl shadow-xl backdrop-blur-sm">
                        <h3 className="text-sm font-bold text-slate-200 mb-4 flex items-center justify-between">
                            <span>⭐ Reviews & Ratings</span>
                            <span className="text-xs font-semibold text-slate-500">0 reviews</span>
                        </h3>
                        {isLocked ? (
                            <p className="text-xs text-slate-500 italic">Reviews are hidden for premium non-subscribers.</p>
                        ) : (
                            <div className="py-8 border border-dashed border-slate-800/80 rounded-xl text-center text-xs text-slate-500">
                                No reviews yet. Have you used this prompt? Be the first to leave your feedback!
                            </div>
                        )}
                    </Card>
                </div>

                {/* Sidebar Info Panel */}
                <div className="space-y-6 relative z-10">
                    <Card className="p-5 bg-slate-900/40 border border-slate-800/80 rounded-2xl shadow-xl backdrop-blur-sm space-y-4">
                        {/* Specs Table */}
                        <div className="space-y-3.5 pt-1 text-sm">
                            <div className="flex justify-between items-center py-2 border-b border-slate-800/60">
                                <span className="text-slate-400 text-xs flex items-center gap-1.5"><Layers className="size-3.5" /> Category</span>
                                <span className="font-semibold text-slate-200 text-xs">{prompt.category || "General"}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-slate-800/60">
                                <span className="text-slate-400 text-xs flex items-center gap-1.5"><Sparkles className="size-3.5" /> Copy Count</span>
                                <span className="font-semibold text-slate-200 text-xs">{prompt.copyCount || 0} times</span>
                            </div>
                            <div className="flex justify-between items-center py-2">
                                <span className="text-slate-400 text-xs flex items-center gap-1.5"><Person className="size-3.5" /> Creator</span>
                                <span className="font-semibold text-slate-200 text-xs truncate max-w-[150px]">{prompt.creatorEmail || "Community Member"}</span>
                            </div>
                        </div>
                    </Card>

                    {/* Tags */}
                    <Card className="p-5 bg-slate-900/40 border border-slate-800/80 rounded-2xl shadow-xl backdrop-blur-sm">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Tags</h4>
                        <div className="flex flex-wrap gap-2">
                            {Array.isArray(prompt.tags) ? prompt.tags.map((tag, idx) => (
                                <Chip key={idx} size="sm" variant="flat" className="text-slate-350 bg-slate-950 border border-slate-850 rounded-lg text-[11px] font-semibold">#{tag}</Chip>
                            )) : <span className="text-xs text-slate-500">No tags listed</span>}
                        </div>
                    </Card>
                </div>

            </div>
        </div>
    );
};

export default DetailsPage; 