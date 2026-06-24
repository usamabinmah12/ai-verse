'use server'
import { revalidatePath } from "next/cache";
import { serverMutation } from "../core/server";

export const updateStatus = async (id, data) => {
    const result = serverMutation(`/api/promts/${id}`, data, 'PATCH');
    revalidatePath('/dashboard/admin/promts');
    return result;
}