export async function getCategoriasController() {
    try {
        const response = await fetch(`http://localhost:8080/api/v1/categorias-elementos`);
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.log(error);
        return [];
    }
}