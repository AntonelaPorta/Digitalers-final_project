const express = require('express')
const { faker } = require('@faker-js/faker');



const generatePost = () => {
    const post = {
        title: faker.lorem.words(6),
        body: faker.lorem.sentence(100),
        user: 'Antonela',
        category: randomCategory(),
        image: '1667503059515-fast-food.jpeg',
    }
    return post
}

function randomCategory() {
    const categories = ['Comida extranjera', 'Fast food', 'Gourmet', 'Buffet', 'Take away', 'Parrilla', 'Pizzeria', 'Vegano', "Restaurante", "Resto bar"]
    return categories[Math.floor(Math.random() * categories.length)]
}

module.exports = {
    generatePost
}

