'use server';

import { revalidatePath } from "next/cache";
import { serverMutation } from "../core/server";

export const createReview = async (subInfo , id) => {
    const result =  serverMutation('/api/reviews', subInfo);
    revalidatePath(`promts/${id}`);
    return result;
}