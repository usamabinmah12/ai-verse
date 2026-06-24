import { serverDelete } from "../core/server"

export async function deletePromt(id) {
    return serverDelete(`/api/deletePromt/${id}`);
}