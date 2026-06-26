import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import React from 'react';

const DashBoardLayout = ({children}) => {
    return (
        <div className='flex container mx-auto'>
            <DashboardSidebar></DashboardSidebar>
            <div>{children}</div>
        </div>
    );
};

export default DashBoardLayout;