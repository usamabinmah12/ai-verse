'use server'
// import { revalidatePath } from "next/cache";
import { protectedFetch, serverFetch } from "../core/server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getPromt = async (page) =>{
    if(!page) {
        page = 1;
    }
    const result = await serverFetch( `/api/promts?page=${page}`);
    // / const result = await serverFetch('/api/promts');
    // revalidatePath('/promts');
   
    return result;
}
export const GetAllPromt = async () =>{
    // if(!page) {
    //     page = 1;
    // }
    // const result = await serverFetch( `/api/promts?page=${page}`);
    const result = await serverFetch('/api/promtsall');
    // revalidatePath('/promts');
   
    return result;
}
export const getSubscriptions = async() => {
    return protectedFetch('/api/subscriptions');
}
export const getUsers = async() => {
    return protectedFetch('/api/users');
}

export const getReviews = async() => {
    return serverFetch('/api/reviews');
}
export const getPromtSingle = async(id) => {
    return protectedFetch(`/api/promts/${id}`);
}

export const getCompanyJobs = async (companyId, status = 'active') => {
    const res = await fetch(`${baseUrl}/api/jobs?companyId=${companyId}&status=${status}`);
    return res.json();
}