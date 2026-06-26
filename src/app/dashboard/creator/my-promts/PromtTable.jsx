"use client";
import React, { useState } from "react";
import { Pencil, TrashBin, Xmark } from "@gravity-ui/icons"; // Xmark আইকনটি ক্লোজ করার জন্য যোগ করা হয়েছে
import { deletePromt } from "@/lib/actions/delete";
import { editPromt } from "@/lib/actions/edit";
import { ToastBar } from "react-hot-toast";
import { toast } from "react-toastify";
// import { revalidatePath } from "next/cache";

const PromtTable = ({ promt }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // এডিট ফর্মের স্টেট (যেখানে ডিফল্ট ভ্যালু হিসেবে বর্তমান প্রম্পটের ডেটা সেট করা)
  const [editForm, setEditForm] = useState({
    title: promt.title || "",
    description: promt.description || "",
    content: promt.content || "",
    aiTool: promt.aiTool || "",
    category: promt.category || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting updated prompt for ID:", promt._id, editForm);
    // এখানে আপনার আপডেট করার সার্ভার অ্যাকশনটি কল করবেন (যেমন: await updatePromt(promt._id, editForm))
    await editPromt(promt._id, editForm);
    toast("Edited successfully");
    setIsModalOpen(false); // সাবমিট শেষে মোডাল ক্লোজ হবে
  };

  const handleDelete = (id) => {
  // react-toastify এর কাস্টম কনফার্মেশন টোস্ট
  toast(
    ({ closeToast }) => (
      <div className="p-1">
        <p className="text-sm font-medium text-slate-200 mb-3">
          Are you sure you want to delete this prompt?
        </p>
        <div className="flex justify-end gap-2">
          {/* Cancel Button */}
          <button
            onClick={closeToast}
            className="px-3 py-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Cancel
          </button>
          
          {/* Confirm Delete Button */}
          <button
            onClick={async () => {
              console.log("Delete clicked for ID:", id);
              closeToast(); // প্রথমে কনফার্মেশন টোস্টটি বন্ধ করবে
              
              try {
                await deletePromt(id); // আপনার আসল ডিলিট API কল
                toast.success("Deleted Successfully!!", { theme: "dark" });
                // revalidatePath("dashboard/creator/my-promts");
              } catch (error) {
                toast.error("Failed to delete!", { theme: "dark" });
              }
            }}
            className="px-3 py-1.5 text-xs bg-rose-600 hover:bg-rose-500 text-white font-semibold rounded-lg transition-colors cursor-pointer shadow-lg shadow-rose-600/10"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    ),
    {
      position: "top-center",
      autoClose: false,   // ইউজার ক্লিক না করা পর্যন্ত থাকবে
      closeOnClick: false, // বাইরে ক্লিক করলে বন্ধ হবে না
      draggable: false,
      theme: "dark",
      className: "border border-slate-800 bg-slate-900 rounded-xl shadow-2xl",
    }
  );
};

  const statusStyles = {
    approved: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    pending: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    rejected: "bg-rose-500/10 text-rose-400 border-rose-500/20",
  };

  return (
    <>
      <tr className="hover:bg-slate-800/20 transition-all duration-150 group">
        {/* Title & Thumbnail image */}
        <td className="p-4 pl-6">
          <div className="flex items-center gap-3">
            {promt.thumbnail ? (
              <img
                src={promt.thumbnail}
                alt={promt.title}
                className="size-10 rounded-lg object-cover border border-slate-800 bg-slate-950"
              />
            ) : (
              <div className="size-10 rounded-lg bg-violet-600/10 border border-violet-500/20 flex items-center justify-center text-xs font-bold text-violet-400">
                AI
              </div>
            )}
            <div className="max-w-[200px] sm:max-w-[280px]">
              <p className="font-semibold text-slate-200 truncate group-hover:text-violet-400 transition-colors">
                {promt.title}
              </p>
              <p className="text-xs text-slate-400 truncate mt-0.5">
                {promt.description}
              </p>
            </div>
          </div>
        </td>

        {/* AI Tool Name */}
        <td className="p-4">
          <span className="text-xs font-medium bg-slate-800 text-slate-300 px-2 py-1 rounded-md border border-slate-700/60">
            {promt.aiTool}
          </span>
        </td>

        {/* Category */}
        <td className="p-4 text-slate-300 capitalize text-xs sm:text-sm">
          {promt.category}
        </td>

        {/* Status Batch */}
        <td className="p-4">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusStyles[promt.status] || statusStyles.pending}`}
          >
            {promt.status || "pending"}
          </span>
        </td>

        {/* Copy Count */}
        <td className="p-4 text-center font-mono text-xs text-slate-300">
          {promt.copyCount || 0}
        </td>

        {/* Action Buttons */}
        <td className="p-4 pr-6 text-right">
          <div className="flex items-center justify-end gap-2">
            {/* EDIT BUTTON */}
            <button
              onClick={() => setIsModalOpen(true)}
              title="Edit Prompt"
              className="p-2 bg-slate-800/60 hover:bg-violet-600/20 border border-slate-700/50 hover:border-violet-500/30 text-slate-400 hover:text-violet-400 rounded-lg transition-all duration-200 cursor-pointer"
            >
              <Pencil className="size-4" />
            </button>

            {/* DELETE BUTTON */}
            <button
              onClick={() => handleDelete(promt._id)}
              title="Delete Prompt"
              className="p-2 bg-slate-800/60 hover:bg-rose-600/20 border border-slate-700/50 hover:border-rose-500/30 text-slate-400 hover:text-rose-400 rounded-lg transition-all duration-200 cursor-pointer"
            >
              <TrashBin className="size-4" />
            </button>
          </div>
        </td>
      </tr>

      {/* DYNAMIC EDIT MODAL */}
      {/* DYNAMIC EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop Overlay */}
          <div
            className="absolute inset-0 bg-slate-950/65 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          />

          {/* Modal Content Box */}
          <div className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl text-slate-100 max-h-[85vh] flex flex-col z-10 overflow-hidden">
            {/* Modal Header */}
            <div className="p-6 pb-4 border-b border-slate-800/60 relative">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-5 right-5 p-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700/50 rounded-lg text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
              >
                <Xmark className="size-4" />
              </button>
              <h2 className="text-xl font-bold text-violet-400">
                Edit AI Prompt
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Modify the details and default values of your structured prompt.
              </p>
            </div>

            {/* Modal Scrollable Body (ফর্ম ইনপুটগুলো এখানে স্ক্রোল হবে) */}
            <form
              onSubmit={handleEditSubmit}
              className="flex flex-col flex-1 overflow-hidden"
            >
              <div className="p-6 space-y-4 overflow-y-auto flex-1 max-h-[50vh] custom-scrollbar">
                {/* Title */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Prompt Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    required
                    value={editForm.title}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-sm text-slate-200 focus:border-violet-500/50 focus:outline-none focus:ring-1 focus:ring-violet-500/50"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Description
                  </label>
                  <textarea
                    name="description"
                    required
                    rows="2"
                    value={editForm.description}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-sm text-slate-200 focus:border-violet-500/50 focus:outline-none focus:ring-1 focus:ring-violet-500/50 resize-none"
                  />
                </div>

                {/* AI Tool & Category Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                      AI Tool Name
                    </label>
                    <input
                      type="text"
                      name="aiTool"
                      required
                      value={editForm.aiTool}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-sm text-slate-200 focus:border-violet-500/50 focus:outline-none focus:ring-1 focus:ring-violet-500/50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                      Category
                    </label>
                    <input
                      type="text"
                      name="category"
                      required
                      value={editForm.category}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-sm text-slate-200 focus:border-violet-500/50 focus:outline-none focus:ring-1 focus:ring-violet-500/50"
                    />
                  </div>
                </div>

                {/* Prompt Content */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Prompt Content
                  </label>
                  <textarea
                    name="content"
                    required
                    rows="5"
                    value={editForm.content}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-800 bg-slate-950 font-mono text-sm text-slate-200 focus:border-violet-500/50 focus:outline-none focus:ring-1 focus:ring-violet-500/50"
                  />
                </div>
              </div>

              {/* Modal Fixed Footer (বাটনগুলো এখানে সবসময় ফিক্সড থাকবে) */}
              <div className="p-4 px-6 bg-slate-950/40 border-t border-slate-800/80 flex justify-end gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-xs shadow-md shadow-violet-600/15 cursor-pointer transition-all"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default PromtTable;
