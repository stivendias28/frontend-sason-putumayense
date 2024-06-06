export async function getCategoriesController() {
    try {
        const response = await fetch(`http://localhost:8080/api/v1/categorias-elementos`);
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.log(error);
        return [];
    }
}

export async function saveCategoriesController(data: any, jwt: string) {
    if(status === "loading") return null
    try {
        const response = await fetch(`http://localhost:8080/api/v1/categorias-elementos`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            }
        });
        const res = await response.json();
        return res;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function deleteCategoriesController(id: number, jwt: string) {
    try {
        const response = await fetch(`http://localhost:8080/api/v1/categorias-elementos/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            }
        });
        const res = await response.json();
        return res;
    } catch (error) {
        console.log(error);
        return null;
    }
}