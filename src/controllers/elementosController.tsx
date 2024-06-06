export async function getAllElementosMenuController() {
    try {
        const response = await fetch(`http://localhost:8080/api/v1/elementos-menu`);
        const data = await response.json();
        if (!data || !data.data) return [];
        return data.data;
    } catch (error) {
        console.log(error);
        return [];
    }
} 

export async function saveElementosMenuController(data: any, jwt: string) {
    try {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("categoriasElementosId", data.category);
        formData.append("price", data.price.toString());
        formData.append("photo", data.photo[0]);

        const response = await fetch(`http://localhost:8080/api/v1/elementos-menu`, {
            method: "POST",
            body: formData,
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });
        const res = await response.json();
        console.log(res);
        return res;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function deleteElementosMenuController(id: number, jwt: string) {
    try {
        const response = await fetch(`http://localhost:8080/api/v1/elementos-menu/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
        });
        const res = await response.json();
        return res;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function getElementosMenusWithMenuId(id: number) {
    try {
        const response = await fetch(`http://localhost:8080/api/v1/menu-elementos?menuId=${id}`);
        const data = await response.json();
        if (!data || !data.data) return [];
        return data.data;
    } catch (error) {
        console.log(error);
        return [];
    }
}