// проверяем ответ сервера
export const checkResponse = (res: any) => {
    if (!res.ok) {
        return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
}