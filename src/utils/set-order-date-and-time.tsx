export const setDateAndTime = (orderCreatedAt: string) => {

    function splitString(stringToSplit: string, separator: string) {
        return stringToSplit.split(separator)
     }

    const orderDateAndTime = splitString(orderCreatedAt, 'T')
    const orderDate = orderDateAndTime[0].replace(/-/gi, '/')
    const date = new Date()
    const today = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    const actualDate = `${year}/${month > 9 ? month : `0${month}`}/${today > 9 ? today : `0${today}`}`

    

    const orderTime = orderDateAndTime[1].split('.')[0].slice(0, -3)
    
    if (Number(actualDate.slice(-2)) - Number(orderDate.slice(-2)) === 0 && Number(actualDate.slice(-5, -3)) - Number(orderDate.slice(-5, -3)) === 0) {
        return `Сегодня, ${orderTime} i-UTM`
    }

    if (Number(actualDate.slice(-2)) - Number(orderDate.slice(-2)) === 1 && Number(actualDate.slice(-5, -3)) - Number(orderDate.slice(-5, -3)) === 0) {
        return `Вчера, ${orderTime} i-UTM`
    }

    if (1 < Number(actualDate.slice(-2)) - Number(orderDate.slice(-2)) &&  Number(actualDate.slice(-2)) - Number(orderDate.slice(-2)) < 4 && Number(actualDate.slice(-5, -3)) - Number(orderDate.slice(-5, -3)) === 0) {
        return `${Number(actualDate.slice(-2)) - Number(orderDate.slice(-2))} дня назад, ${orderTime} i-UTM`
    }

    if (4 < Number(actualDate.slice(-2)) - Number(orderDate.slice(-2)) &&  Number(actualDate.slice(-2)) - Number(orderDate.slice(-2)) < 30 && Number(actualDate.slice(-5, -3)) - Number(orderDate.slice(-5, -3)) === 0) {
        return `${Number(actualDate.slice(-2)) - Number(orderDate.slice(-2))} дней назад, ${orderTime} i-UTM`
    }

    if (0 < Number(actualDate.slice(-5, -3)) - Number(orderDate.slice(-5, -3))) {
        return `Больше месяца назад`
    }
}