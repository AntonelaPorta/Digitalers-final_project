//Cambiar el formato de la fecha guardada en db
const formatDate = (date) => {
    const newFormatDate = new Date(date) // Thu Jul 21 2022 12:35:31 GMT+0300
    const day = newFormatDate.getDate()
    const month = newFormatDate.getMonth()
    const year = newFormatDate.getFullYear()

    return `${day}/${month}/${year}`
}

module.exports = {
    formatDate
}