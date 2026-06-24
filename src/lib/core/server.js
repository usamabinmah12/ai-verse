const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;


export const serverFetch = async (path) => {
    const res = await fetch(`${baseUrl}${path}`);
    // handle 401, 404, 403
    return res.json();
}


export const serverEdit = async (path, editForm) => {
    try {
        const res = await fetch(`${baseUrl}${path}`, {
            method: "PUT", // আপনি চাইলে এখানে "PATCH" মেথডও ব্যবহার করতে পারেন
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editForm),
        });

        // যদি রেসপন্স ঠিকঠাক না আসে (যেমন: 400, 401, 404, 500)
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
        // ডিলিট রিকোয়েস্টে সাধারণত বডি বা ডাটা দরকার হয় না
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