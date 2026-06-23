import { getPromt } from '@/lib/api/promts';
import { getUserSession } from '@/lib/core/session';
import React from 'react';
import PromtTable from './PromtTable';

const MyPromt = async () => {
    let promts = await getPromt();
    const user = await getUserSession();
    const id = user?.id;

    console.log('id is:', id);

    // শুধুমাত্র বর্তমান user's prompts রাখবে
    promts = promts.filter(promt => promt.promtId === id);

    return (
        <div>
            {
                promts.length > 0 ? (
                    promts.map((promt) => (
                        <PromtTable
                            key={promt._id}
                            promt={promt}
                        />
                    ))
                ) : (
                    <div>You have no Prompt Available</div>
                )
            }
        </div>
    );
};

export default MyPromt;