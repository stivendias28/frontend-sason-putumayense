export async function GetAllMenusController(search: string) {
    try{
        const response = await fetch(`http://localhost:8080/api/v1/menus`);
        const data = await response.json();
        if(!data) return [];
        const dataSearch = data.data
        return (search != "") ? dataSearch.filter((menu: {name: string}) => menu.name.toLowerCase().includes(search.toLowerCase())) : dataSearch;
    }catch (e) {
        console.log(e)
        return [];
    }
}

export async function deleteMenu(menuId: number, jwt: string) {
    try{
        const querySearch = new URLSearchParams({
            menuId: menuId.toString()
        })

        const menuElementos = await fetch(`http://localhost:8080/api/v1/menu-elementos?${querySearch}`, {
            method: "GET",
            headers: {
                accept: "application/json",
            }
        })
        const data = await menuElementos.json();

        for(const elemento of data.data) {
            const response = await fetch(`http://localhost:8080/api/v1/menu-elementos/${elemento.id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            });
            const data = await response.json();
        }

        const response = await fetch(`http://localhost:8080/api/v1/menus/${menuId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        const res = await response.json();
        return res;
    }catch (e) {
        console.log(e)
        return [];
    }
}
