'use server'

import { serverMutation } from "../core/server";


export const createPromt = async (newPromtData) => {
    return serverMutation('/api/promts', newPromtData);
}

// const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// export const createJob = async (newJobData) => {
//     const res = await fetch(`${baseUrl}/api/jobs`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(newJobData),
//     });

//     return res.json();
// }