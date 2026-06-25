
import { getPromt } from "@/lib/api/promts";
import { Sparkles } from "@gravity-ui/icons";
import PromptGrid from "./PromptGrid";
import { Pagination } from "@heroui/react";

const AllPromtsPage = async () => {
    // const [page, setPage] =  1;
  let promts = (await getPromt()) || [];
  promts = promts.filter((promt) => promt.status === "Approved");
    const startItem = 1;
    const endItem = promts.length;
    const totalItems = endItem;
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Ambient Background Mesh */}
      <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-violet-600/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-indigo-500/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-800/80 pb-8 mb-10 gap-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black flex items-center gap-3 tracking-tight">
              <Sparkles className="text-violet-400 size-8 animate-pulse" />
              <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                AI Prompt Marketplace
              </span>
            </h1>
            <p className="text-slate-400 mt-2 text-sm sm:text-base max-w-2xl font-light">
              Discover, copy, and deploy the world's best engineering-grade AI
              prompts for your daily developer workflows.
            </p>
          </div>

          {/* Stats Badge */}
          <div className="self-start md:self-center bg-slate-900 border border-slate-800 text-slate-300 font-semibold px-4 py-2.5 rounded-xl text-sm tracking-wide shadow-lg">
            Total Available:{" "}
            <span className="text-violet-400 font-bold">{promts.length}</span>{" "}
            Prompts
          </div>
        </div>

        {/* Prompts Layout */}
        {promts.length === 0 ? (
          <div className="text-center py-24 border border-dashed border-slate-800 rounded-2xl bg-slate-900/20 backdrop-blur-sm">
            <p className="text-slate-500 font-medium">
              No prompts found. Be the first to add one!
            </p>
          </div>
        ) : (
          <>
            <PromptGrid promts={promts} />
            {/* <Pagination className="w-full"> */}
      {/* <Pagination.Summary>
        Showing {startItem}-{endItem} of {totalItems} results
      </Pagination.Summary>
      <Pagination.Content>
        <Pagination.Item>
          <Pagination.Previous isDisabled={1} onPress={() => setPage((p) => p - 1)}>
            <Pagination.PreviousIcon />
            <span>Previous</span>
          </Pagination.Previous>
        </Pagination.Item>
        {getPageNumbers().map((p, i) =>
          p === "ellipsis" ? (
            <Pagination.Item key={`ellipsis-${i}`}>
              <Pagination.Ellipsis />
            </Pagination.Item>
          ) : (
            <Pagination.Item key={p}>
              <Pagination.Link isActive={p === page} onPress={() => setPage(p)}>
                {p}
              </Pagination.Link>
            </Pagination.Item>
          ),
        )}
        <Pagination.Item>
          <Pagination.Next isDisabled={page === totalPages} onPress={() => setPage((p) => p + 1)}>
            <span>Next</span>
            <Pagination.NextIcon />
          </Pagination.Next>
        </Pagination.Item>
      </Pagination.Content>
    </Pagination> */}
          </>
        )}
      </div>
    </div>
  );
};

export default AllPromtsPage;
