import CompanyTable from '@/components/dashboard/CompanyTable';

import { getPromt } from '@/lib/api/promts';
import React from 'react';

// Next.js re koia deya holo je eita dynamically render oibo, cache thaki purana data dekaito na
export const dynamic = 'force-dynamic'; 

const AdminCompaniesPage = async () => {
    let companies = [];
    
    try {
        companies = await getPromt();
    } catch (error) {
        console.error("Failed to fetch companies:", error);
        // Error handling interface deya bettor
        return (
            <div className="min-h-screen bg-[#0d0d0f] p-8 text-red-400 flex items-center justify-center">
                <p>Failed to load companies. Please try again later.</p>
            </div>
        );
    }
    
    return (
        <div className="min-h-screen bg-[#0d0d0f] p-8 text-neutral-100">
            <div className="max-w-7xl mx-auto space-y-6">
                <div>
                    <h2 className="text-xl font-semibold tracking-tight text-neutral-200">
                        Companies for review
                    </h2>
                    <p className="text-sm text-neutral-500 mt-1">
                        Total items submitted: {companies.length}
                    </p>
                </div>
                
                <CompanyTable companies={companies} />
            </div>
        </div>
    );
};

export default AdminCompaniesPage;