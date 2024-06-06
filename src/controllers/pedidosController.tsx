export async function getPedidosController() {
    try {
        const response = await fetch(`http://localhost:8080/api/v1/pedidos`)
        const data = await response.json()
        if(!data) return []
        return data.data
    } catch (error) {
        console.log(error)
        return []
    }
}

export async function savePedidosController(data: any, jwt: string, menusPedidos: any) {
    try {
        const valortotal = await calculateTotal(menusPedidos)
        const dataPedido = new FormData()
        dataPedido.append("estadoPedidoId", "1")
        dataPedido.append("userId", data.user)
        dataPedido.append("total", valortotal.toString())

        const response = await fetch(`http://localhost:8080/api/v1/pedidos`, {
            method: "POST",
            body: dataPedido,
            headers: {
                Authorization: `Bearer ${jwt}`,
            }
        })
        const res = await response.json()
        const pedido = res.data


        for (const menu of menusPedidos) {
            const dataElemento = new FormData()
            dataElemento.append("menusId", menu.menuId.toString())
            dataElemento.append("pedidosId", pedido.id.toString())
            dataElemento.append("quantity", menu.quantity.toString())
            dataElemento.append("opcionesPerzonalidas", menu.optionPerzonalized)

            const responseElemento = await fetch(`http://localhost:8080/api/v1/detalles-pedidos`, {
                method: "POST",
                body: dataElemento,
                headers: {
                    Authorization: `Bearer ${jwt}`,
                }
            })
            const resElemento = await responseElemento.json()
            console.log(resElemento)
        }


        
    } catch (error) {
        console.log(error)
        return null
    }
}

export async function calculateTotal(menusPedidos: any) {
    let total = 0;
    for (const menu of menusPedidos) {
        const response = await fetch(`http://localhost:8080/api/v1/menu-elementos?menuId=${(menu.id) ? menu.id : menu.menuId}`);
        const data = await response.json();
        data.data.forEach((elemento: any) => {
            total += (elemento.elementosMenu.price * menu.quantity);
        });
    }
    return total;
}