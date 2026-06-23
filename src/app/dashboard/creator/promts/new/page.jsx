import React from 'react';
// import CompanyProfile from './CompanyProfile';
import { getUserSession } from '@/lib/core/session';


import AddPromtPage from './AddPromtPage';

const PromtPage = async () => {

    const user = await getUserSession();
    const id = user?.id;
    // const company = await getRecruiterCompany(user?.id);
    console.log("user id is : ", user?.id)
    return (
        <div>
            <AddPromtPage creatorId = {id}></AddPromtPage>
        </div>
    );
};

export default PromtPage;