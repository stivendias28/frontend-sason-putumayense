export async function saveMenusController(data: any, jwt: string) {
    try {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("photo", data.photo[0]);

        const response = await fetch(`http://localhost:8080/api/v1/menus`, {
            method: "POST",
            body: formData,
            headers: {
                Authorization: `Bearer ${jwt}`,
            }
        })
        console.log(response)
        const res = await response.json();

        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                if (key.startsWith('menuElementoId-')) {
                    const value = data[key];

                    const formDataElemento = new FormData();
                    formDataElemento.append("elementoMenuId", value);
                    formDataElemento.append("menuId", res.data.id);


                    const responseElemento = await fetch(`http://localhost:8080/api/v1/menu-elementos`, {
                        method: "POST",
                        body: formDataElemento,
                        headers: {
                            Authorization: `Bearer ${jwt}`,
                        },
                    });

                    const resElemento = await responseElemento.json();
                }
            }
        }
    } catch (error) {
        console.log("Error:", error);
        return {
            success: false,
            message: "Error al registrar el menu, por favor revise la informacion e intente nuevamente.",
            data: {},
        };
    }
}



