export async function getQuestionController() {
    try {
        const response = await fetch(`http://localhost:8080/api/v1/questions`);
        const data = await response.json();
        return data;
    }catch (e) {
        console.log(e)
        return [];
    }
}