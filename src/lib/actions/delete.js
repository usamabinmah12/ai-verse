'use server'
import { revalidatePath } from "next/cache";
import { serverDelete } from "../core/server"

export async function deletePromt(id) {
    const res =  serverDelete(`/api/deletePromt/${id}`);
    revalidatePath("/dashboard/creator/my-promts");
    return res;
}