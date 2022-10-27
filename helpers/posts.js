const express = require('express')
const { faker } = require('@faker-js/faker');


const generatePost = () => {
    const post = {
        title: faker.lorem.words(6),
        body: faker.lorem.sentence(100),
        userName: faker.internet.userName(),
        category: randomCategory(),
        image: faker.image.food(640, 480, true)

    }
    return post
}

function randomCategory() {
    const tags = ['Comida mexica', 'Fast Food', 'Gourmet', 'Buffet', 'Take Away', 'Parrilla', 'Pizzeria', 'Vegetariano', 'Vegano']
    return tags[Math.floor(Math.random() * tags.length)]
}

module.exports = {
    generatePost
}

