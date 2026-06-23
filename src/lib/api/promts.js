import { serverFetch } from "../core/server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getPromt = async () =>{
    return serverFetch('/api/promts');
}

export const getJobById = async (jobId) => {
    return  serverFetch(`/api/jobs/${jobId}`);
}

export const getCompanyJobs = async (companyId, status = 'active') => {
    const res = await fetch(`${baseUrl}/api/jobs?companyId=${companyId}&status=${status}`);
    return res.json();
}