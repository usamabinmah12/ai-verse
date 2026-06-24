'use server'
import { revalidatePath } from "next/cache";
import { serverMutation, serverMutationag } from "../core/server";
// import { serverMutation, serverMutation1 } from "../core/server";

export const updateStatus = async (id, data) => {
    const result = serverMutation(`/api/promts/${id}`, data, 'PATCH');
    revalidatePath('/dashboard/admin/promts');
    return result;
}
export const updateCopy = async(id) => {
    const result = await serverMutationag(`/api/promt/${id}` ,{}, "PATCH") ;
    revalidatePath(`/promts/${id}`);
    return result; 
}