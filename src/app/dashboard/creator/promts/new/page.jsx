import React from 'react';
// import CompanyProfile from './CompanyProfile';
import { getUserSession } from '@/lib/core/session';


import AddPromtPage from './AddPromtPage';

const PromtPage = async () => {

    const user = await getUserSession();
    // const company = await getRecruiterCompany(user?.id);

    return (
        <div>
            <AddPromtPage></AddPromtPage>
        </div>
    );
};

export default PromtPage;