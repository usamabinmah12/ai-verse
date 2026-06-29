import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import React from 'react';

const DashBoardLayout = ({children}) => {
    return (
        <div className="flex flex-col lg:flex-row container mx-auto ">
      
      {/* লেআউটের বামে সাইডবার বসবে */}
      <DashboardSidebar />
      
      {/* লেআউটের ডানে মেইন কন্টেন্ট বসবে যা স্বাধীনভাবে স্ক্রোল হবে */}
      <main className=" ">
        {children}
      </main>

    </div>
    );
};

export default DashBoardLayout;