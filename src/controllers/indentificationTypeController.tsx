
export async function getIdentificationTypeController() {
    try {
        const response = await fetch(`http://localhost:8080/api/v1/identification-types`);
        const data = await response.json();
        return data;
    }catch (error) {
        console.log(error)
        return [];
    }
}