export async function getUserController(jwt: string) {
    try{
        const response = await fetch(`http://localhost:8080/api/v1/users`, {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${jwt}`
            }
        });
        const data = await response.json();
        if(!data) return [];
        return data.data
    }catch (e) {
        console.log(e)
        return [];
    }
}
