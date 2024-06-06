import { getSession } from "next-auth/react";

export async function validateSession() {
    const session = await getSession();
    if (!session) {
        return {
            redirect: {
                destination: "/auth/login",
                permanent: false,
            },
        };
    } else {
        return;
    }
}