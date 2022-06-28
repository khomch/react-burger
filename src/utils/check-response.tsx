// проверяем ответ сервера
export const checkResponse = (res: Response) => {
    if (!res.ok) {
        return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
}