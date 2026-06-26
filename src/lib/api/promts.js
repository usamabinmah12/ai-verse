import { revalidatePath } from "next/cache";
import { protectedFetch, serverFetch } from "../core/server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getPromt = async () =>{
    const result = await serverFetch('/api/promts');
    // revalidatePath('/api/promts');
    return result;
}
export const getSubscriptions = async() => {
    return serverFetch('/api/subscriptions');
}
export const getUsers = async() => {
    return serverFetch('/api/users');
}

export const getReviews = async() => {
    return serverFetch('/api/reviews');
}
export const getPromtSingle = async(id) => {
    return serverFetch(`/api/promts/${id}`);
}

export const getCompanyJobs = async (companyId, status = 'active') => {
    const res = await fetch(`${baseUrl}/api/jobs?companyId=${companyId}&status=${status}`);
    return res.json();
}