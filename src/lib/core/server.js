import { getUserToken } from "./session";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;


export const serverFetch = async (path) => {
    const res = await fetch(`${baseUrl}${path}`);
    // handle 401, 404, 403
    return res.json();
}
export const protectedFetch = async (path) => {
    const res = await fetch(`${baseUrl}${path}`,
        {
            headers: await authHeader()
        }
    );

    // handle 401, 403

    return res.json();
}
export const authHeader = async() => {
    const token = await getUserToken();
    const header = token ?  {
        authorization : `Bearer ${token}`
    } : {};
    return header;
}

export const serverEdit = async (path, editForm) => {
    try {
        const res = await fetch(`${baseUrl}${path}`, {
            method: "PUT", 
            headers: {
                'Content-Type': 'application/json',
                ...await authHeader()
            },
            body: JSON.stringify(editForm),
        });

       
        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
        }

        return await res.json();
    } catch (error) {
        console.error("Error in serverEdit:", error);
        return { success: false, error: error.message };
    }
};
export const serverDelete = async (path) => {
    const res = await fetch(`${baseUrl}${path}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
        }
       
    });

    // handle 401, 404, 403
    return res.json();
}
export const serverMutation = async (path, data , method="POST") => {
    const res = await fetch(`${baseUrl}${path}`, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    // handle 401, 404, 403

    return res.json();
}
export const serverMutationag = async (path, data , method="POST") => {
    const res = await fetch(`${baseUrl}${path}`, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    // handle 401, 404, 403

    return res.json();
}