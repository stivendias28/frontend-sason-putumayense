
export async function getGenderController() {
    try {
        return await fetch(`http://localhost:8080/api/v1/genders`).then(response => response.json());
    }catch (error) {
        console.log(error)
        return [];
    }
}