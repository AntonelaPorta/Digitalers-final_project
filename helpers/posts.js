const express = require('express')
const { faker } = require('@faker-js/faker');



const generatePost = () => {
    const post = {
        title: faker.lorem.words(6),
        body: faker.lorem.sentence(100),
        //user: faker.internet.userName(),
        user: 'anto',
        category: randomCategory(),
        image: faker.image.food(640, 480, true),
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

