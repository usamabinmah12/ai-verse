import { serverEdit } from "../core/server";

export async function editPromt(id, editForm) {
    const result = serverEdit(`/api/editpromt/${id}`, editForm);
    return result;
}