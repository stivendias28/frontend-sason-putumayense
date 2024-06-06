import { signIn } from "next-auth/react";

export async function loginUserController(data: any) {
    try {
        return await signIn("credentials", {
            email: data.username,
            password: data.password,
            redirect: false
        })
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: "Error al iniciar sesión, por favor revise la informacion e intente nuevamente.",
            data: {}
        }
    }
}