import { signIn } from "next-auth/react";
import { ResponseData } from "../interfaces/response";

export async function createUserAccountController(data: any) {
    try {
        let defaultPhoto = new File(["defaultUser.jpg"], "defaultUser.jpg", { type: "image/jpeg" });
        const formData = new FormData();

        formData.append("name", data.firstName);
        formData.append("secondName", data.secondName);
        formData.append("lastName", data.firstLastName);
        formData.append("secondLastName", data.secondLastName);
        formData.append("identificationTypeId", data.identificationType);
        formData.append("identificationNumber", data.identificationNumber);
        formData.append("email", data.email);
        formData.append("phone", data.phone);
        formData.append("genderId", data.gender);
        formData.append("username", data.username);
        formData.append("password", data.password);
        formData.append("photo", (data.photo)? data.photo[0] : defaultPhoto);
        formData.append("firstQuestion", data.firstQuestion);
        formData.append("firstAnswer", data.firstResponse);
        formData.append("secondQuestion", data.secondQuestion);
        formData.append("secondAnswer", data.secondResponse);

        const response = await fetch(`http://localhost:8080/auth/register`, {
            method: 'POST',
            body: formData
        });
        const res = await response.json();

        return await signIn("credentials", {
            email: data.username,
            password: data.password,
            redirect: false
        })

    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: "Error al registrar usuario, por favor revise la informacion e intente nuevamente.",
            data: {}
        }
    }
}