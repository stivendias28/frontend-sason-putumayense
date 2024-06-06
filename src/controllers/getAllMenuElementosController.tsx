export async function GetAllMenuElementosController(menuId: number) {
    try{
        const querySearch = new URLSearchParams({
            menuId: menuId.toString()
        })
        const response = await fetch(`http://localhost:8080/api/v1/menu-elementos?${querySearch}`);
        const data = await response.json();
        return data.data;

    }catch (e) {
        console.log(e)
        return [];
    }
}
