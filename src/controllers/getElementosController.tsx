export async function GetAllElementosController() {
    try{
        const response = await fetch(`http://localhost:8080/api/v1/elementos-menu`);
        const data = await response.json();
        if(!data) return [];
        return data.data
    }catch (e) {
        console.log(e)
        return [];
    }
}
