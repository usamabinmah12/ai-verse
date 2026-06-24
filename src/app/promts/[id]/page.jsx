import React from "react";
import { getUserSession } from "@/lib/core/session";
import { Card, Button, Chip } from "@heroui/react";
import {
  FileText,
  Layers,
  ChevronLeft,
  Sparkles,
  Lock,
  Person,
} from "@gravity-ui/icons";
import Link from "next/link";
import DetailActionArea from "@/components/DetailActionArea";
import ReviewForm from "@/components/ReviewForm"; // নিচে তৈরি করা নতুন ক্লায়েন্ট কম্পোনেন্ট
import { getReviews } from "@/lib/api/promts";

async function getSinglePrompt(id) {
  try {
    const res = await fetch(`http://localhost:5000/api/promts/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return res.json();
  } catch (err) {
    console.error("Error fetching prompt details:", err);
    return null;
  }
}

// 🚀 এটি এখন একটি পিওর সার্ভার কম্পোনেন্ট, তাই কোনো এরর আসবে না
const DetailsPage = async ({ params }) => {
  const { id } = await params;
  let prompt = await getSinglePrompt(id);
  const user = await getUserSession();
//   console.log("User", user);
 console.log("User id is  : ", prompt);
  let reviews = await getReviews();
  reviews = reviews.filter((review) => review.promptId === id);
  //   console.log("Review : ", reviews.length);
  //   console.log("User id ios")
  let isPremiumUser =  user?.plan === "user_pro" || user?.plan === "creator_pro" || user?.role =="admin" || prompt?.visibility == "Public";
//   let visibility = prompt?.visibility != "Public";
  console.log("Mode is : " , isPremiumUser);

  if (!prompt) {
    return (
      <div className="max-w-4xl mx-auto p-10 text-center">
        <h2 className="text-xl font-bold text-zinc-200">Prompt not found!</h2>
        <Link
          href="/promts"
          className="text-blue-500 hover:underline mt-4 inline-block"
        >
          Back to Marketplace
        </Link>
      </div>
    );
  }

  const isLocked =
    prompt.visibility?.toLowerCase() === "private" && !isPremiumUser;

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 sm:px-6 lg:px-8 bg-slate-950 min-h-screen text-slate-100 relative">
      <div className="absolute top-[20%] right-[-10%] w-[350px] h-[350px] rounded-full bg-violet-600/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[350px] h-[350px] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none" />

      {/* Back Button */}
      <Link
        href="/promts"
        className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-violet-400 mb-8 font-medium transition-colors group"
      >
        <ChevronLeft className="size-4 group-hover:-translate-x-0.5 transition-transform" />{" "}
        Back to Marketplace
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6 relative z-10">
          <Card className="p-6 bg-slate-900/40 border border-slate-800/80 rounded-2xl shadow-xl backdrop-blur-sm">
            {prompt.thumbnail && (
              <div className="mb-6 rounded-xl overflow-hidden border border-slate-800/80 max-h-72 w-full flex items-center justify-center bg-slate-950">
                <img
                  src={prompt.thumbnail}
                  alt={prompt.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <Chip
                size="sm"
                variant="flat"
                className="font-extrabold uppercase tracking-wider bg-violet-500/10 text-violet-400 border border-violet-500/20"
              >
                {prompt.aiTool}
              </Chip>
              <Chip
                size="sm"
                variant="flat"
                color={
                  prompt.difficulty === "Pro"
                    ? "danger"
                    : prompt.difficulty === "Intermediate"
                      ? "warning"
                      : "success"
                }
                className="font-bold capitalize"
              >
                {prompt.difficulty || "Beginner"}
              </Chip>
              <Chip
                size="sm"
                variant="bordered"
                className="font-semibold border-slate-800 text-slate-300"
              >
                {prompt.visibility}
              </Chip>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-100 tracking-tight mb-4">
              {prompt.title}
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
              {prompt.description}
            </p>
            <hr className="border-slate-800/85 my-6" />

            {/* Content Box */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                <FileText className="size-4 text-violet-400" /> Prompt Code /
                Content
              </h3>

              {isLocked ? (
                <div className="relative border border-slate-850 rounded-2xl overflow-hidden p-6 bg-slate-950/80 text-center flex flex-col items-center justify-center min-h-[220px]">
                  <div className="absolute inset-0 p-4 font-mono text-xs text-slate-700 blur-[6px] select-none pointer-events-none text-left">
                    Act as an expert software architect... [LOCKED CONTENT]{" "}
                    <br />
                    Generate a microservice structure based on NestJS and
                    Docker.
                  </div>
                  <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px]" />
                  <div className="relative z-10 flex flex-col items-center max-w-sm px-4">
                    <div className="p-3 bg-amber-500/10 text-amber-400 rounded-full border border-amber-500/20 mb-3">
                      <Lock className="size-6" />
                    </div>
                    <h4 className="text-base font-bold text-slate-200">
                      Premium Prompt Content Locked
                    </h4>
                    <p className="text-xs text-slate-400 mt-1 mb-4">
                      This high-tier prompt is exclusive to premium subscribers.
                    </p>
                    <Link href="/plans" >
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
                <DetailActionArea
                    isPremiumUser = {isPremiumUser}
                  
                  promptText={prompt.content}
                  promptId={prompt._id}
                />
              )}
            </div>
          </Card>

          {/* Usage Instructions */}
          <Card className="p-6 bg-slate-900/40 border border-slate-800/80 rounded-2xl shadow-xl backdrop-blur-sm">
            <h3 className="text-sm font-bold text-slate-200 mb-3">
              💡 Usage Instructions
            </h3>
            <ul className="text-xs sm:text-sm text-slate-400 space-y-2.5 list-disc list-inside">
              <li>Copy the prompt using the "Copy Prompt" button above.</li>
              <li>
                Paste it into your {prompt.aiTool || "AI Tool"} interface.
              </li>
              <li>
                Replace any bracketed placeholders with your specific data.
              </li>
            </ul>
          </Card>

          {/* Reviews Section */}
          <Card className="p-6 bg-slate-900/40 border border-slate-800/80 rounded-2xl shadow-xl backdrop-blur-sm">
            <h3 className="text-sm font-bold text-slate-200 mb-4 flex items-center justify-between">
              <span>⭐ Reviews & Ratings</span>
              <span className="text-xs font-semibold text-slate-500">
               {reviews.length}
              </span>
            </h3>
            {isLocked ? (
              <p className="text-xs text-slate-500 italic">
                Reviews are hidden for premium non-subscribers.
              </p>
            ) : (
              // 💡 ইভেন্ট হ্যান্ডলার বিশিষ্ট ফর্মটিকে ক্লায়েন্ট কম্পোনেন্ট হিসেবে এখানে কল করা হয়েছে
              <ReviewForm userId={user?.id} promptId={prompt._id} />
            )}
          </Card>
        </div>

        {/* Sidebar Info Panel */}
        <div className="space-y-6 relative z-10">
          <Card className="p-5 bg-slate-900/40 border border-slate-800/80 rounded-2xl shadow-xl backdrop-blur-sm space-y-4">
            <div className="space-y-3.5 pt-1 text-sm">
              <div className="flex justify-between items-center py-2 border-b border-slate-800/60">
                <span className="text-slate-400 text-xs flex items-center gap-1.5">
                  <Layers className="size-3.5" /> Category
                </span>
                <span className="font-semibold text-slate-200 text-xs capitalize">
                  {prompt.category || "General"}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-800/60">
                <span className="text-slate-400 text-xs flex items-center gap-1.5">
                  <Sparkles className="size-3.5" /> Copy Count
                </span>
                <span className="font-semibold text-slate-200 text-xs">
                  {prompt.copyCount || 0} times
                </span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-slate-400 text-xs flex items-center gap-1.5">
                  <Person className="size-3.5" /> Creator
                </span>
                <span className="font-semibold text-slate-200 text-xs truncate max-w-[150px]">
                  {prompt.creatorEmail || "Community Member"}
                </span>
              </div>
            </div>
          </Card>

          {/* Tags */}
          <Card className="p-5 bg-slate-900/40 border border-slate-800/80 rounded-2xl shadow-xl backdrop-blur-sm">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Tags
            </h4>
            <div className="flex flex-wrap gap-2">
              {Array.isArray(prompt.tags) ? (
                prompt.tags.map((tag, idx) => (
                  <Chip
                    key={idx}
                    size="sm"
                    variant="flat"
                    className="text-slate-350 bg-slate-950 border border-slate-850 rounded-lg text-[11px] font-semibold"
                  >
                    #{tag}
                  </Chip>
                ))
              ) : (
                <span className="text-xs text-slate-500">No tags listed</span>
              )}
            </div>
          </Card>
          <div className="space-y-6">
            {/* 📊 Review Header & Counter Card */}
            <div className="flex items-center justify-between px-5 py-4 bg-slate-900/40 border border-slate-800/80 rounded-2xl shadow-xl backdrop-blur-sm">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-violet-500/10 text-violet-400 rounded-xl border border-violet-500/20">
                  {/* ⭐ Star Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="size-4 text-amber-400 animate-pulse"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.6 3.102-1.196 4.622c-.21.81.67 1.448 1.394 1.006L10 14.301l4.264 2.242c.724.442 1.604-.196 1.394-1.006l-1.196-4.622 3.6-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.83-4.401Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-200 tracking-wide">
                    Community Feedback
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    What users think about this prompt
                  </p>
                </div>
              </div>

              {/* 🏷️ Dynamic Review Badge */}
              <span className="px-3 py-1 text-xs font-bold bg-slate-950 text-violet-400 border border-slate-800 rounded-lg shadow-inner">
                Reviews:{" "}
                <span className="text-slate-200 ml-1 font-mono">
                  {reviews.length}
                </span>
              </span>
            </div>

            {/* 💬 Reviews List Display */}
            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {reviews.length === 0 ? (
                /* Empty State */
                <div className="py-8 text-center border border-dashed border-slate-800/60 rounded-2xl bg-slate-900/10">
                  <p className="text-xs text-slate-500 italic">
                    No reviews yet. Be the first to share your thoughts!
                  </p>
                </div>
              ) : (
                /* Mapping the reviews */
                reviews.map((rev, index) => (
                  <div
                    key={rev._id || index}
                    className="p-4 bg-slate-950/40 border border-slate-900 rounded-xl hover:border-slate-800/80 transition-all duration-200 group"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        {/* User Avatar Placeholder */}
                        <div className="size-6 rounded-full bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center text-[10px] font-bold text-white uppercase">
                          {rev.userName ? rev.userName.substring(0, 2) : "AI"}
                        </div>
                        <span className="text-xs font-semibold text-slate-300">
                          {rev.userName || "Anonymous User"}
                        </span>
                      </div>
                      {/* Timestamp */}
                      <span className="text-[10px] text-slate-500 font-mono">
                        {rev.createdAt
                          ? new Date(rev.createdAt).toLocaleDateString()
                          : "Just now"}
                      </span>
                    </div>

                    {/* Review Text Area */}
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed pl-8 group-hover:text-slate-300 transition-colors">
                      {rev.review}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
