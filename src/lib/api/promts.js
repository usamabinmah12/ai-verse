import { protectedFetch, serverFetch } from "../core/server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getPromt = async () =>{
    return protectedFetch('/api/promts');
}
export const getSubscriptions = async() => {
    return protectedFetch('/api/subscriptions');
}

export const getReviews = async() => {
    return protectedFetch('/api/reviews');
}
export const getPromtSingle = async(id) => {
    return protectedFetch(`/api/promts/${id}`);
}

export const getCompanyJobs = async (companyId, status = 'active') => {
    const res = await fetch(`${baseUrl}/api/jobs?companyId=${companyId}&status=${status}`);
    return res.json();
}