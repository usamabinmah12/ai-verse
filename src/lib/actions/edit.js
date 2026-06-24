'use server'
import { revalidatePath } from "next/cache";
import { serverEdit } from "../core/server";

export async function editPromt(id, editForm) {
    const result = serverEdit(`/api/editpromt/${id}`, editForm);
    revalidatePath('/dashboard/creator/my-promts');
    return result;
}